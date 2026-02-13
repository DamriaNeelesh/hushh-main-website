"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Container,
  Heading,
  Text,
  Stack,
  Tag,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Code,
  SimpleGrid,
  Flex,
  Divider,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import Script from "next/script";
import ContentWrapper from "../_components/layout/ContentWrapper";

const PLAID_ENDPOINTS = {
  production: {
    exchangePublicToken:
      "https://production.plaid.com/item/public_token/exchange",
    createLinkToken: "https://production.plaid.com/link/token/create",
    createSandboxPublicToken: null,
  },
  sandbox: {
    exchangePublicToken: "https://sandbox.plaid.com/item/public_token/exchange",
    createLinkToken: "https://sandbox.plaid.com/link/token/create",
    createSandboxPublicToken:
      "https://sandbox.plaid.com/sandbox/public_token/create",
  },
};

const ENDPOINTS = {
  getUserFinancialData:
    "https://hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io/userFinancialData",
  pushUserFinancialData:
    "https://hushh-plaid-api-app-bubqpu.5sc6y6-1.usa-e2.cloudhub.io/userFinancialData",
  createProfileAgent:
    "https://hushh-plaid-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/plaid-agent",
};

const PLAID_ACCOUNTS_PATH = "/api/plaid/accounts";
const LINK_PRODUCT_OPTIONS = {
  production: ["auth", "identity", "signal"],
  sandbox: ["auth", "identity", "transactions"],
};

const DEFAULT_LINK_PRODUCTS_BY_ENV = {
  production: ["auth", "identity", "signal"],
  sandbox: ["auth", "transactions"],
};

const SANDBOX_INSTITUTION_ID = "ins_109508";

const defaultPayload = {
  access_token: "",
  public_token: "",
  user_id: "test_user_001",
};

const toNumberOrNull = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const pickFirst = (...values) =>
  values.find((value) => value !== undefined && value !== null && value !== "");

const asArray = (value) => (Array.isArray(value) ? value : []);

const formatAddress = (address) => {
  if (!address) return null;
  if (typeof address === "string") return address;
  return [
    pickFirst(address.street, address.street_1, address.address),
    address.city,
    pickFirst(address.region, address.state),
    pickFirst(address.postal_code, address.zip, address.zip_code),
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
};

const buildAgentProfilePayloads = (plaidData, userId) => {
  const accounts = Array.isArray(plaidData?.accounts) ? plaidData.accounts : [];
  const item = plaidData?.item || {};
  const totalUserAssets = accounts.reduce((sum, account) => {
    const current = toNumberOrNull(account?.balances?.current);
    return sum + (current || 0);
  }, 0);

  const identityByAccount = new Map();
  const identityAccounts = asArray(plaidData?.identity?.accounts);
  identityAccounts.forEach((identityAccount) => {
    const owner = asArray(identityAccount?.owners)[0];
    if (!owner || !identityAccount?.account_id) return;
    identityByAccount.set(identityAccount.account_id, {
      name: pickFirst(owner?.names?.[0], owner?.name),
      email: pickFirst(owner?.emails?.[0]?.data, owner?.email),
      phone: pickFirst(owner?.phone_numbers?.[0]?.data, owner?.phone),
      address: formatAddress(
        pickFirst(owner?.addresses?.[0]?.data, owner?.address),
      ),
    });
  });

  const fallbackOwner =
    asArray(plaidData?.identity?.accounts)?.[0]?.owners?.[0] || null;

  const accountNumbersByAccount = new Map();
  const authNumbers = plaidData?.auth?.numbers || {};
  [authNumbers.ach, authNumbers.eft, authNumbers.international, authNumbers.bacs]
    .filter(Array.isArray)
    .forEach((numberList) => {
      numberList.forEach((entry) => {
        if (!entry?.account_id || !entry?.account) return;
        if (!accountNumbersByAccount.has(entry.account_id)) {
          accountNumbersByAccount.set(entry.account_id, entry.account);
        }
      });
    });

  const rawTransactions = Array.isArray(plaidData?.transactions)
    ? plaidData.transactions
    : Array.isArray(plaidData?.transactions?.transactions)
      ? plaidData.transactions.transactions
      : [];
  const transactionsByAccount = new Map();
  rawTransactions.forEach((transaction) => {
    if (!transaction?.account_id) return;
    const current = transactionsByAccount.get(transaction.account_id) || [];
    if (current.length < 25) {
      current.push(transaction);
      transactionsByAccount.set(transaction.account_id, current);
    }
  });

  const liabilitiesRoot =
    plaidData?.liabilities?.liabilities ||
    plaidData?.liabilities?.data?.liabilities ||
    plaidData?.liabilities ||
    {};
  const liabilityBuckets = {
    student: asArray(liabilitiesRoot?.student),
    mortgage: asArray(liabilitiesRoot?.mortgage),
    credit: asArray(liabilitiesRoot?.credit),
  };
  const liabilityAmount = (entry) =>
    toNumberOrNull(
      pickFirst(
        entry?.current_balance,
        entry?.outstanding_principal_balance,
        entry?.last_statement_balance,
        entry?.origination_principal_amount,
      ),
    );

  const accountLiabilities = new Map();
  const accountLiabilityTypes = new Map();
  const liabilityTotals = { student: 0, mortgage: 0, credit: 0 };

  Object.entries(liabilityBuckets).forEach(([type, entries]) => {
    entries.forEach((entry) => {
      const amount = liabilityAmount(entry);
      if (amount !== null) {
        liabilityTotals[type] += amount;
      }

      if (!entry?.account_id) return;

      const existing = accountLiabilities.get(entry.account_id) || 0;
      accountLiabilities.set(entry.account_id, existing + (amount || 0));

      const typeSet = accountLiabilityTypes.get(entry.account_id) || new Set();
      typeSet.add(type);
      accountLiabilityTypes.set(entry.account_id, typeSet);
    });
  });

  const totalUserLiabilities = Object.values(liabilityTotals).reduce(
    (sum, amount) => sum + amount,
    0,
  );

  const statementId = pickFirst(
    plaidData?.statement_id,
    asArray(plaidData?.statements)?.[0]?.statement_id,
    asArray(plaidData?.statements?.data)?.[0]?.statement_id,
  );

  const assetReportId = pickFirst(
    plaidData?.asset_report_id,
    plaidData?.assets?.asset_report_id,
    plaidData?.assets?.data?.asset_report_id,
  );

  const investments =
    plaidData?.investments ??
    plaidData?.holdings ??
    asArray(plaidData?.investments?.holdings) ??
    [];

  return accounts
    .filter((account) => Boolean(account?.account_id))
    .map((account) => {
      const accountId = account?.account_id;
      const accountAssets = toNumberOrNull(account?.balances?.current);
      const accountLiability = toNumberOrNull(accountLiabilities.get(accountId));
      const netWorth =
        accountAssets !== null || accountLiability !== null
          ? (accountAssets || 0) - (accountLiability || 0)
          : null;
      const identity =
        identityByAccount.get(accountId) ||
        (fallbackOwner
          ? {
              name: pickFirst(fallbackOwner?.names?.[0], fallbackOwner?.name),
              email: pickFirst(
                fallbackOwner?.emails?.[0]?.data,
                fallbackOwner?.email,
              ),
              phone: pickFirst(
                fallbackOwner?.phone_numbers?.[0]?.data,
                fallbackOwner?.phone,
              ),
              address: formatAddress(
                pickFirst(
                  fallbackOwner?.addresses?.[0]?.data,
                  fallbackOwner?.address,
                ),
              ),
            }
          : {});
      const liabilityTypeSet = accountLiabilityTypes.get(accountId);

      return {
        plaid_item_id: item?.item_id || null,
        user_id: userId,
        account_id: accountId,
        account_name: account?.name || null,
        account_subtype: account?.subtype || null,
        official_name: account?.official_name || null,
        institution_id: item?.institution_id || null,
        institution_name: item?.institution_name || null,
        balance_available: toNumberOrNull(account?.balances?.available),
        balance_current: accountAssets,
        iso_currency_code: account?.balances?.iso_currency_code || null,
        identity_name: identity?.name || null,
        identity_email: identity?.email || null,
        identity_phone: identity?.phone || null,
        identity_address: identity?.address || null,
        account_number: accountNumbersByAccount.get(accountId) || null,
        statement_id: statementId || null,
        asset_report_id: assetReportId || null,
        total_user_assets: totalUserAssets,
        net_worth: netWorth,
        investments,
        liability_type: liabilityTypeSet ? [...liabilityTypeSet] : [],
        total_user_liabilities: String(totalUserLiabilities || 0),
        transactions: transactionsByAccount.get(accountId) || [],
        student_liabilities_total: String(liabilityTotals.student || 0),
        mortgage_liabilities_total: String(liabilityTotals.mortgage || 0),
        credit_liabilities_total: String(liabilityTotals.credit || 0),
        student_liabilities: liabilityBuckets.student,
        mortgage_liabilities: liabilityBuckets.mortgage,
        credit_liabilities: liabilityBuckets.credit,
        holder_category: account?.holder_category || null,
        net_worth_score:
          netWorth === null ? null : netWorth >= 0 ? "positive" : "negative",
        account_assets: accountAssets,
        account_liabilities: accountLiability || 0,
      };
    });
};

export default function PlaidIntegrationPage() {
  const [environment, setEnvironment] = useState("production");
  const [credentials, setCredentials] = useState(defaultPayload);
  const [credentialsStatus, setCredentialsStatus] = useState({
    configured: null,
    clientIdLast4: null,
    availableEnvironments: { production: false, sandbox: false },
  });
  const [linkToken, setLinkToken] = useState("");
  const [linkProducts, setLinkProducts] = useState(
    DEFAULT_LINK_PRODUCTS_BY_ENV.production,
  );
  const [responseLog, setResponseLog] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);
  const [isPlaidReady, setIsPlaidReady] = useState(false);
  const [isLinkOpening, setIsLinkOpening] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let isMounted = true;

    const loadCredentialStatus = async () => {
      try {
        const res = await fetch(`/api/plaid/credentials?env=${environment}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Unable to load Plaid credential status");
        }
        const data = await res.json();
        if (isMounted) {
          setCredentialsStatus({
            configured: Boolean(data?.configured),
            clientIdLast4: data?.client_id_last4 || null,
            availableEnvironments: {
              production: Boolean(data?.available_environments?.production),
              sandbox: Boolean(data?.available_environments?.sandbox),
            },
          });
          pushLog(`${environment.toUpperCase()} credentials status`, {
            environment: data?.environment || environment,
            configured: Boolean(data?.configured),
            client_id_last4: data?.client_id_last4 || null,
            available_environments: data?.available_environments || null,
          });
        }
      } catch (error) {
        if (isMounted) {
          toast({
            title: "Credentials unavailable",
            description:
              "Set PLAID_CLIENT_ID_PRODUCTION/PLAID_SECRET_PRODUCTION and PLAID_CLIENT_ID_SANDBOX/PLAID_SECRET_SANDBOX in .env.local.",
            status: "warning",
            duration: 3000,
          });
        }
      }
    };

    loadCredentialStatus();
    return () => {
      isMounted = false;
    };
  }, [environment, toast]);

  useEffect(() => {
    setLinkProducts(DEFAULT_LINK_PRODUCTS_BY_ENV[environment]);
    setLinkToken("");
    setCredentials((prev) => ({
      ...prev,
      public_token: "",
      access_token: "",
    }));
  }, [environment]);

  const updateField = (key, value) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const pushLog = (title, payload) => {
    setResponseLog((prev) => [
      { title, timestamp: new Date().toISOString(), payload },
      ...prev,
    ]);
  };

  const unwrapPlaidResponse = (payload) =>
    payload?.data !== undefined ? payload.data : payload;
  const activePlaidEndpoints = PLAID_ENDPOINTS[environment];
  const getLinkTokenBody = () => {
    return {
      products: linkProducts,
      user: {
        client_user_id: credentials.user_id || `user_${Date.now()}`,
      },
      client_name: "Hushh",
      country_codes: ["US"],
      language: "en",
      // redirect_uri: "https://hushh.ai/plaid-integration", // Required for Production Web unless configured otherwise
    };
  };

  const callPlaidApi = async ({
    title,
    endpoint,
    method = "POST",
    body,
    overrideMethod,
  }) => {
    const payload = body || {};
    const normalizedMethod = method?.toUpperCase() || "POST";

    try {
      const res = await fetch("/api/plaid/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint,
          method: normalizedMethod,
          payload,
          overrideMethod,
          environment,
        }),
      });
      const json = await res.json();
      pushLog(title, json);
      return json;
    } catch (error) {
      pushLog(title, { error: error?.message || "Unknown error" });
      toast({
        title: `${title} failed`,
        status: "error",
        duration: 3000,
      });
      return null;
    }
  };

  const handleExchangePublicToken = async () => {
    if (!credentials.public_token) {
      toast({
        title: "Missing public token",
        description: "Create a public token first.",
        status: "info",
        duration: 3000,
      });
      return;
    }
    const result = await callPlaidApi({
      title: "Exchange Public Token",
      endpoint: activePlaidEndpoints.exchangePublicToken,
      body: { public_token: credentials.public_token },
    });
    const data = unwrapPlaidResponse(result);
    if (data?.access_token) {
      updateField("access_token", data.access_token);
    }
  };

  const handleCreateLinkToken = async () => {
    const result = await callPlaidApi({
      title: "Create Link Token",
      endpoint: activePlaidEndpoints.createLinkToken,
      body: getLinkTokenBody(),
    });
    const data = unwrapPlaidResponse(result);
    if (data?.link_token) {
      setLinkToken(data.link_token);
    }
  };

  const ensureLinkToken = async () => {
    if (linkToken) {
      return linkToken;
    }
    const result = await callPlaidApi({
      title: "Create Link Token",
      endpoint: activePlaidEndpoints.createLinkToken,
      body: getLinkTokenBody(),
    });
    const data = unwrapPlaidResponse(result);
    if (data?.link_token) {
      setLinkToken(data.link_token);
      return data.link_token;
    }
    return null;
  };

  const handleCreateSandboxPublicToken = async () => {
    if (environment !== "sandbox") {
      return;
    }

    if (!activePlaidEndpoints.createSandboxPublicToken) {
      toast({
        title: "Sandbox endpoint unavailable",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const initialProducts = linkProducts?.length
      ? linkProducts
      : DEFAULT_LINK_PRODUCTS_BY_ENV.sandbox;
    const result = await callPlaidApi({
      title: "Create Sandbox Public Token",
      endpoint: activePlaidEndpoints.createSandboxPublicToken,
      body: {
        institution_id: SANDBOX_INSTITUTION_ID,
        initial_products: initialProducts,
      },
    });

    const data = unwrapPlaidResponse(result);
    if (data?.public_token) {
      updateField("public_token", data.public_token);
      toast({
        title: "Sandbox public token generated",
        status: "success",
        duration: 2500,
      });
    }
  };

  const handleLaunchPlaidLink = async () => {
    if (!isPlaidReady || typeof window === "undefined" || !window.Plaid) {
      toast({
        title: "Plaid Link not ready",
        description:
          "Please wait for the Plaid script to load before connecting a bank.",
        status: "info",
        duration: 3000,
      });
      return;
    }

    setIsLinkOpening(true);
    const token = await ensureLinkToken();
    if (!token) {
      setIsLinkOpening(false);
      toast({
        title: "Link token missing",
        description:
          "We couldn't create a link token. Please check your credentials and try again.",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const handler = window.Plaid.create({
      token,
      onSuccess: async (public_token, metadata) => {
        updateField("public_token", public_token);
        pushLog("Plaid Link Success", { public_token, metadata });
        console.log("[Plaid Link] Success", { public_token, metadata });
        console.log("[Plaid Link] Institution", metadata?.institution || null);
        console.log("[Plaid Link] Accounts", metadata?.accounts || []);
        try {
          const exchangeResult = await callPlaidApi({
            title: "Exchange Public Token",
            endpoint: activePlaidEndpoints.exchangePublicToken,
            body: { public_token },
          });
          const exchangeData = unwrapPlaidResponse(exchangeResult);
          console.log("[Plaid Link] Token exchange result", exchangeData);
          if (exchangeData?.access_token) {
            updateField("access_token", exchangeData.access_token);
          }
        } finally {
          setIsLinkOpening(false);
          if (handler?.destroy) {
            handler.destroy();
          }
        }
      },
      onExit: (err, metadata) => {
        if (err) {
          pushLog("Plaid Link Exit", { error: err?.message || err, metadata });
        } else {
          pushLog("Plaid Link Closed", { metadata });
        }
        setIsLinkOpening(false);
        if (handler?.destroy) {
          handler.destroy();
        }
      },
    });

    handler.open();
  };

  const handleFetchFinancialData = async () => {
    if (!credentials.access_token) {
      toast({
        title: "Missing access token",
        description: "Exchange the public token before fetching data.",
        status: "info",
        duration: 3000,
      });
      return;
    }
    try {
      const res = await fetch(PLAID_ACCOUNTS_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: credentials.access_token,
          environment,
        }),
      });
      const json = await res.json();
      pushLog("Fetch Accounts (/accounts/get)", json);
      const data = unwrapPlaidResponse(json);
      if (data) {
        setFetchedData(data);
        console.log("[Plaid] Accounts response", data);
        if (data?.accounts) {
          console.log("[Plaid] Accounts", data.accounts);
        }
      }
    } catch (error) {
      pushLog("Fetch Accounts (/accounts/get)", {
        error: error?.message || "Unknown error",
      });
      toast({
        title: "Fetch accounts failed",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleFetchConsolidatedFinancialData = async () => {
    if (!credentials.access_token) {
      toast({
        title: "Missing access token",
        description: "Exchange the public token before fetching data.",
        status: "info",
        duration: 3000,
      });
      return;
    }
    const result = await callPlaidApi({
      title: "Fetch Consolidated Financial Data (MuleSoft)",
      endpoint: ENDPOINTS.getUserFinancialData,
      method: "POST",
      overrideMethod: "GET",
      body: { access_token: credentials.access_token },
    });
    const data = unwrapPlaidResponse(result);
    if (data) {
      setFetchedData(data);
      console.log("[MuleSoft] Consolidated financial data", data);
    }
  };

  const handlePushToSupabase = async () => {
    if (!fetchedData) {
      toast({
        title: "No financial data",
        description:
          "Fetch financial data first so we can push it to Supabase.",
        status: "info",
        duration: 3000,
      });
      return;
    }

    if (!credentials.user_id?.trim()) {
      toast({
        title: "Missing user_id",
        description: "Enter User ID before pushing data to Supabase.",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const payloads = buildAgentProfilePayloads(
      fetchedData,
      credentials.user_id.trim(),
    );
    if (!payloads.length) {
      toast({
        title: "No accounts to push",
        description: "Fetch account details first, then push to Supabase.",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const runId = Date.now();
    let successCount = 0;

    for (let i = 0; i < payloads.length; i += 1) {
      const profilePayload = payloads[i];
      const buildAgentRequest = (payload, variant = "a") => ({
        jsonrpc: "2.0",
        id: `task-${runId}-${i + 1}-${variant}`,
        method: "tasks/send",
        params: {
          sessionId: `session-${runId}`,
          message: {
            role: "user",
            parts: [
              {
                type: "text",
                text: `Create a user financial profile with the details below.\n${JSON.stringify(payload)}`,
              },
            ],
          },
        },
      });

      const result = await callPlaidApi({
        title: `Push Data to Supabase (Creation Agent) [${i + 1}/${payloads.length}]`,
        endpoint: ENDPOINTS.createProfileAgent,
        method: "POST",
        body: buildAgentRequest(profilePayload, "a"),
      });

      const accepted = result?.status && result.status >= 200 && result.status < 300;
      if (accepted) {
        successCount += 1;
        continue;
      }

      const fallbackPayload = {
        plaid_item_id: profilePayload?.plaid_item_id || null,
        user_id: profilePayload?.user_id || null,
        account_id: profilePayload?.account_id || null,
        account_name: profilePayload?.account_name || null,
        account_subtype: profilePayload?.account_subtype || null,
        official_name: profilePayload?.official_name || null,
        institution_id: profilePayload?.institution_id || null,
        institution_name: profilePayload?.institution_name || null,
        balance_available: profilePayload?.balance_available || null,
        balance_current: profilePayload?.balance_current || null,
        iso_currency_code: profilePayload?.iso_currency_code || null,
        total_user_assets: profilePayload?.total_user_assets || null,
        net_worth: profilePayload?.net_worth || null,
        total_user_liabilities: profilePayload?.total_user_liabilities || "0",
        net_worth_score: profilePayload?.net_worth_score || null,
        account_assets: profilePayload?.account_assets || null,
        account_liabilities: profilePayload?.account_liabilities || 0,
      };

      const retryResult = await callPlaidApi({
        title: `Push Data to Supabase Retry (Creation Agent) [${i + 1}/${payloads.length}]`,
        endpoint: ENDPOINTS.createProfileAgent,
        method: "POST",
        body: buildAgentRequest(fallbackPayload, "b"),
      });

      if (
        retryResult?.status &&
        retryResult.status >= 200 &&
        retryResult.status < 300
      ) {
        successCount += 1;
      }
    }

    toast({
      title: "Push workflow completed",
      description: `${successCount}/${payloads.length} account payload(s) accepted by profile creation API.`,
      status:
        successCount === payloads.length
          ? "success"
          : successCount > 0
            ? "warning"
            : "error",
      duration: 4000,
    });
  };

  return (
    <ContentWrapper bg="#F5F7FE">
      <Script
        src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"
        strategy="afterInteractive"
        onLoad={() => setIsPlaidReady(true)}
      />
      <Box bg="#F5F7FE" minH="100vh" py={{ base: 10, md: 16 }}>
        <Container maxW="6xl">
          <VStack spacing={4} textAlign="center" mb={10}>
            <Tag colorScheme="blue" borderRadius="full" px={4} py={2}>
              Hushh Plaid Integration Console
            </Tag>
            <Heading fontSize={{ base: "3xl", md: "4xl" }}>
              Execute the Full Plaid Workflow
            </Heading>
            <Text color="gray.600" maxW="3xl">
              Use this console to test both Production and Sandbox Plaid
              workflows, then sync data to Supabase through your API layer.
            </Text>
            <Flex gap={3} flexWrap="wrap" justify="center">
              <VStack spacing={4}>
                <Box
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  shadow="sm"
                  borderWidth={1}
                >
                  <Text mb={2} fontWeight="bold" fontSize="sm">
                    Active Environment
                  </Text>
                  <Flex gap={2} wrap="wrap">
                    <Button
                      size="sm"
                      colorScheme={
                        environment === "production" ? "green" : "gray"
                      }
                      onClick={() => setEnvironment("production")}
                    >
                      Production
                    </Button>
                    <Button
                      size="sm"
                      colorScheme={
                        environment === "sandbox" ? "orange" : "gray"
                      }
                      onClick={() => setEnvironment("sandbox")}
                    >
                      Sandbox
                    </Button>
                  </Flex>
                  <Text
                    mt={2}
                    fontSize="xs"
                    color={
                      credentialsStatus.configured ? "green.600" : "red.600"
                    }
                  >
                    Credentials:{" "}
                    {credentialsStatus.configured
                      ? `Configured${credentialsStatus.clientIdLast4 ? ` (ID ****${credentialsStatus.clientIdLast4})` : ""}`
                      : "Missing"}
                  </Text>
                  <Text mt={1} fontSize="xs" color="gray.600">
                    Prod:{" "}
                    {credentialsStatus.availableEnvironments?.production
                      ? "ready"
                      : "missing"}{" "}
                    | Sandbox:{" "}
                    {credentialsStatus.availableEnvironments?.sandbox
                      ? "ready"
                      : "missing"}
                  </Text>
                </Box>
                <Flex gap={3}>
                  <Button
                    as={Link}
                    href="/plaid-financial-profile-agent"
                    colorScheme="blue"
                    variant="solid"
                  >
                    Profile Creation Agent
                  </Button>
                  <Button
                    as={Link}
                    href="/plaid-financial-profile-update-agent"
                    variant="outline"
                    colorScheme="blue"
                  >
                    Profile Update Agent
                  </Button>
                </Flex>
              </VStack>
            </Flex>
          </VStack>

          <Stack spacing={10}>
            <Box
              bg="white"
              borderRadius="2xl"
              p={{ base: 6, md: 8 }}
              shadow="xl"
            >
              <Heading size="md" mb={2}>
                Step 0 - Connect a Bank Account
              </Heading>
              <Text color="gray.600" mb={6}>
                {environment === "sandbox"
                  ? "For Sandbox testing, you can generate a test public token without a real bank account, or run Plaid Link with sandbox credentials."
                  : "Launch Plaid Link to connect a bank account. On success we capture the public token and automatically exchange it for an access token."}
              </Text>
              <Box mb={5}>
                <Text fontSize="sm" fontWeight="600" color="gray.700" mb={2}>
                  Products requested in Link
                </Text>
                <CheckboxGroup
                  value={linkProducts}
                  onChange={setLinkProducts}
                  colorScheme="blue"
                >
                  <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                    {LINK_PRODUCT_OPTIONS[environment].map((product) => (
                      <Checkbox key={product} value={product}>
                        {product.charAt(0).toUpperCase() + product.slice(1)}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
                <Text fontSize="xs" color="gray.500" mt={2}>
                  These should match the MuleSoft flow. Missing products can
                  cause 400 errors downstream.
                </Text>
              </Box>
              <Flex gap={4} flexWrap="wrap">
                <Button
                  bgGradient="linear(135deg, #0C8CE9 0%, #5E5CE6 100%)"
                  color="white"
                  _hover={{ opacity: 0.9 }}
                  onClick={handleLaunchPlaidLink}
                  isLoading={isLinkOpening}
                  isDisabled={!isPlaidReady}
                >
                  Connect bank account
                </Button>
                <Button
                  variant="outline"
                  borderColor="#0C8CE9"
                  color="#0C8CE9"
                  _hover={{ bg: "rgba(12,140,233,0.08)" }}
                  onClick={handleCreateLinkToken}
                >
                  Create link token only
                </Button>
                {environment === "sandbox" && (
                  <Button
                    variant="outline"
                    borderColor="#DD6B20"
                    color="#DD6B20"
                    _hover={{ bg: "rgba(221,107,32,0.08)" }}
                    onClick={handleCreateSandboxPublicToken}
                  >
                    Generate sandbox public token
                  </Button>
                )}
              </Flex>
              {linkToken && (
                <Box mt={4}>
                  <Text fontSize="sm" color="gray.600">
                    Current Link Token
                  </Text>
                  <Code display="block" whiteSpace="pre-wrap" mt={2}>
                    {linkToken}
                  </Code>
                </Box>
              )}
            </Box>

            <Box
              bg="white"
              borderRadius="2xl"
              p={{ base: 6, md: 8 }}
              shadow="xl"
            >
              <Heading size="md" mb={4}>
                Functional Workflow
              </Heading>
              <Stack spacing={4}>
                {[
                  {
                    step: "1",
                    title: "User Initiation",
                    description:
                      "Hushh or a partner app calls the MuleSoft CloudHub REST interface to request Plaid data.",
                  },
                  {
                    step: "2",
                    title: "Token Generation",
                    description:
                      "Public, access, and link tokens are created so the user can connect accounts securely.",
                  },
                  {
                    step: "3",
                    title: "Data Retrieval",
                    description:
                      "With the access token, the API fetches accounts, transactions, and asset data from Plaid.",
                  },
                  {
                    step: "4",
                    title: "Data Synchronization",
                    description:
                      "Responses are transformed into a unified schema and persisted inside Supabase.",
                  },
                  {
                    step: "5",
                    title: "Confirmation Response",
                    description:
                      "The MuleSoft API returns a structured JSON payload confirming the sync.",
                  },
                ].map((item) => (
                  <Box
                    key={item.step}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="rgba(12, 140, 233, 0.2)"
                    p={4}
                    bg="linear-gradient(135deg, rgba(12,140,233,0.08) 0%, rgba(94,92,230,0.05) 100%)"
                  >
                    <Text fontWeight="600" color="#0C8CE9">
                      Step {item.step} — {item.title}
                    </Text>
                    <Text color="gray.600">{item.description}</Text>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box
              bg="white"
              borderRadius="2xl"
              p={{ base: 6, md: 8 }}
              shadow="xl"
            >
              <Heading size="md" mb={4}>
                Step 1 — Enter Runtime Inputs
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <FormControl>
                  <FormLabel>User ID (for Supabase)</FormLabel>
                  <Input
                    value={credentials.user_id}
                    onChange={(e) => updateField("user_id", e.target.value)}
                    placeholder="e.g. 935789999"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Public Token</FormLabel>
                  <Input
                    value={credentials.public_token}
                    onChange={(e) =>
                      updateField("public_token", e.target.value)
                    }
                    placeholder="Will auto-fill after creation"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Access Token</FormLabel>
                  <Input
                    value={credentials.access_token}
                    onChange={(e) =>
                      updateField("access_token", e.target.value)
                    }
                    placeholder="Will auto-fill after exchange"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Link Token</FormLabel>
                  <Input
                    value={linkToken}
                    onChange={(e) => setLinkToken(e.target.value)}
                    placeholder="Optional - generated for Link flow"
                  />
                </FormControl>
              </SimpleGrid>
            </Box>

            <Box
              bg="white"
              borderRadius="2xl"
              p={{ base: 6, md: 8 }}
              shadow="xl"
            >
              <Heading size="md" mb={4}>
                Step 2 — Run the Workflow
              </Heading>
              <Stack spacing={5}>
                <VStack align="stretch" spacing={2}>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.700"
                    textTransform="uppercase"
                  >
                    2.1 Exchange the public token for a secure access token
                  </Text>
                  <Button
                    variant="outline"
                    borderColor="#0C8CE9"
                    color="#0C8CE9"
                    _hover={{ bg: "rgba(12,140,233,0.08)" }}
                    onClick={handleExchangePublicToken}
                  >
                    Exchange Public Token for Access Token
                  </Button>
                </VStack>

                <VStack align="stretch" spacing={2}>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.700"
                    textTransform="uppercase"
                  >
                    2.2 Create the link token for Plaid Link onboarding
                  </Text>
                  <Button
                    bg="#0C8CE9"
                    color="white"
                    _hover={{ bg: "#0B7BD1" }}
                    onClick={handleCreateLinkToken}
                  >
                    Create Link Token
                  </Button>
                </VStack>

                <VStack align="stretch" spacing={2}>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.700"
                    textTransform="uppercase"
                  >
                    2.3 Fetch account details via Plaid /accounts/get
                  </Text>
                  <Button
                    bg="#1CB5A3"
                    color="white"
                    _hover={{ bg: "#13a291" }}
                    onClick={handleFetchFinancialData}
                  >
                    Fetch Account Details
                  </Button>
                </VStack>

                <VStack align="stretch" spacing={2}>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.700"
                    textTransform="uppercase"
                  >
                    2.4 Optional: fetch consolidated financial data via MuleSoft
                  </Text>
                  <Button
                    bg="#0C8CE9"
                    color="white"
                    _hover={{ bg: "#0B7BD1" }}
                    onClick={handleFetchConsolidatedFinancialData}
                  >
                    Fetch Consolidated Data (MuleSoft)
                  </Button>
                </VStack>

                <VStack align="stretch" spacing={2}>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="gray.700"
                    textTransform="uppercase"
                  >
                    2.5 Push the unified payload to Supabase for storage
                  </Text>
                  <Button
                    bg="#111827"
                    color="white"
                    _hover={{ bg: "#000000" }}
                    onClick={handlePushToSupabase}
                  >
                    Push Data to Supabase
                  </Button>
                </VStack>
              </Stack>
              <Text mt={4} color="gray.500" fontSize="sm">
                Follow the buttons in order (1 to 5). Step 2.4 is optional if
                you want richer identity/transactions/liabilities fields before
                pushing to Supabase. You can repeat steps with fresh tokens at
                any time.
              </Text>
            </Box>

            <Box
              bg="white"
              borderRadius="2xl"
              p={{ base: 6, md: 8 }}
              shadow="xl"
            >
              <Flex
                justify="space-between"
                align={{ base: "stretch", md: "center" }}
                direction={{ base: "column", md: "row" }}
              >
                <Heading size="md">Step 3 — Response Console</Heading>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setResponseLog([])}
                  mt={{ base: 4, md: 0 }}
                >
                  Clear log
                </Button>
              </Flex>
              <Divider my={4} />
              <Stack spacing={6}>
                {responseLog.length === 0 && (
                  <Text color="gray.500">
                    No API calls yet. Trigger an action to see responses.
                  </Text>
                )}
                {responseLog.map((entry, idx) => (
                  <Box
                    key={idx}
                    borderWidth="1px"
                    borderRadius="lg"
                    p={4}
                    bg="gray.900"
                  >
                    <Flex justify="space-between" align="center" mb={2}>
                      <Tag colorScheme="yellow">{entry.title}</Tag>
                      <Text color="gray.400" fontSize="xs">
                        {entry.timestamp}
                      </Text>
                    </Flex>
                    <Code
                      display="block"
                      whiteSpace="pre-wrap"
                      color="green.100"
                      bg="transparent"
                    >
                      {JSON.stringify(entry.payload, null, 2)}
                    </Code>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </ContentWrapper>
  );
}
