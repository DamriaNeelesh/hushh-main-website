"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import axios from "axios";

const FALLBACK_BASE_URL = "https://hushh.ai";

const resolveBaseUrl = (endpointBaseUrl) => {
  if (endpointBaseUrl) {
    return endpointBaseUrl;
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  return FALLBACK_BASE_URL;
};

function generateDummyData(requestBodyDefinition) {
  const result = {};

  for (const [key, definition] of Object.entries(requestBodyDefinition)) {
    const fieldType = definition.type;
    const hasExample = Object.prototype.hasOwnProperty.call(definition, "example");

    if (fieldType === "string") {
      if (hasExample) {
        result[key] = definition.example;
      } else if (key === "text") {
        result[key] =
          "Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.";
      } else if (key === "sessionId") {
        result[key] = "session-456";
      } else if (key === "id") {
        result[key] = "task-124";
      } else {
        result[key] = `dummy_${key}`;
      }
    } else if (fieldType === "number") {
      result[key] = hasExample ? definition.example : 123;
    } else if (fieldType === "array") {
      if (hasExample) {
        result[key] = definition.example;
      } else if (definition.items?.type === "object") {
        result[key] = [{ sampleKey: "sampleValue" }];
      } else {
        result[key] = ["sampleItem1", "sampleItem2"];
      }
    } else {
      result[key] = hasExample ? definition.example : `dummy_${key}`;
    }
  }

  return JSON.stringify(result, null, 2);
}

function FieldGroup({ label, items, values, onChange }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="docs-endpoint-field-group">
      <div className="docs-endpoint-field-label">{label}</div>
      <div className="docs-endpoint-field-grid">
        {items.map((item) => (
          <label key={item.name} className="docs-endpoint-field-stack">
            <span className="docs-endpoint-field-name">{item.name}</span>
            <input
              className="docs-endpoint-input"
              placeholder={item.placeholder || `Enter ${item.name}`}
              value={values[item.name] || ""}
              onChange={(event) => onChange(item.name, event.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

const ApiSection = ({ endpoint, apiKey = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localApiKey] = useState(apiKey || "");
  const [queryParams, setQueryParams] = useState(
    endpoint?.queryParams?.reduce((acc, param) => {
      acc[param.name] = "";
      return acc;
    }, {}) || {}
  );
  const [headerParams, setHeaderParams] = useState(
    endpoint?.headers?.reduce((acc, header) => {
      acc[header.name] = "";
      return acc;
    }, {}) || {}
  );
  const initialJsonBody = endpoint?.requestBody ? generateDummyData(endpoint.requestBody) : "";
  const [jsonBody, setJsonBody] = useState(initialJsonBody);
  const [response, setResponse] = useState(null);
  const [requestedUrl, setRequestedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (setter, key, value) => {
    setter((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const queryString = new URLSearchParams(queryParams).toString();
    const baseUrl = resolveBaseUrl(endpoint?.baseUrl);
    const isAbsolutePath = /^https?:\/\//i.test(endpoint?.path || "");
    const urlRoot = isAbsolutePath ? "" : baseUrl;
    const fullUrl = `${urlRoot}${endpoint.path}${queryString ? `?${queryString}` : ""}`;

    setRequestedUrl(fullUrl);
    setResponse(null);
    setIsLoading(true);

    const finalHeaders = {
      "Content-Type": "application/json",
      ...(localApiKey ? { Authorization: `Bearer ${localApiKey}` } : {}),
      ...headerParams,
    };

    let parsedBody = {};
    if (endpoint.method !== "GET" && jsonBody.trim()) {
      try {
        parsedBody = JSON.parse(jsonBody);
      } catch {
        setResponse("Invalid JSON in request body");
        setIsLoading(false);
        return;
      }
    }

    try {
      const res = await axios({
        method: endpoint.method,
        url: fullUrl,
        headers: finalHeaders,
        data: endpoint.method !== "GET" ? parsedBody : undefined,
      });
      setResponse(res.data);
    } catch (error) {
      setResponse(error.response ? error.response.data : "Error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="docs-endpoint-card">
      <button type="button" className="docs-endpoint-summary" onClick={() => setIsOpen((value) => !value)}>
        <div className="docs-endpoint-summary-main">
          <span className={`docs-endpoint-method is-${endpoint?.method?.toLowerCase() || "post"}`}>
            {endpoint?.method || "POST"}
          </span>
          <span className="docs-endpoint-path">{endpoint?.path}</span>
        </div>
        <FaChevronDown className={`docs-endpoint-chevron${isOpen ? " is-open" : ""}`} size={14} />
      </button>

      {endpoint?.description ? (
        <div className="docs-endpoint-description">{endpoint.description}</div>
      ) : null}

      {isOpen ? (
        <div className="docs-endpoint-body">
          <FieldGroup
            label="Query parameters"
            items={endpoint?.queryParams}
            values={queryParams}
            onChange={(key, value) => handleInputChange(setQueryParams, key, value)}
          />

          <FieldGroup
            label="Headers"
            items={endpoint?.headers}
            values={headerParams}
            onChange={(key, value) => handleInputChange(setHeaderParams, key, value)}
          />

          {endpoint?.requestBody ? (
            <div className="docs-endpoint-field-group">
              <div className="docs-endpoint-field-label">Request body</div>
              <textarea
                className="docs-endpoint-textarea"
                value={jsonBody}
                onChange={(event) => setJsonBody(event.target.value)}
                rows={9}
              />
            </div>
          ) : null}

          <div className="docs-endpoint-actions">
            <button
              type="button"
              className="site-cta-solid docs-endpoint-run"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
              {isLoading ? "Running..." : "Run request"}
            </button>
          </div>

          {requestedUrl ? (
            <div className="docs-endpoint-output">
              <div className="docs-endpoint-field-label">Requested URL</div>
              <div className="docs-endpoint-meta">{requestedUrl}</div>
            </div>
          ) : null}

          {isLoading || response ? (
            <div className="docs-endpoint-output">
              <div className="docs-endpoint-field-label">Response</div>
              {isLoading ? (
                <div className="docs-endpoint-loading">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Waiting for response...</span>
                </div>
              ) : (
                <pre className="docs-endpoint-response">
                  {typeof response === "string" ? response : JSON.stringify(response, null, 2)}
                </pre>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ApiSection;
