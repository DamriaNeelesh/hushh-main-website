"use client";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Toast,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import DeveloperBg from "../../_components/svg/developerApi/developerApiLoginBg.svg";
import BgLeftCircle from "../../_components/svg/developerApi/developerLoginLCircle.svg";
import BgTopRightCircle from "../../_components/svg/developerApi/developerLoginTRCircle.svg";
import BgRightCircle from "../../_components/svg/developerApi/developerLoginRCircle.svg";
import Image from "next/image";
import { EmailIcon } from "@chakra-ui/icons";
import { FiAlertCircle, FiLock, FiUser } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import GoogelIcon from "../../_components/svg/icons/googleIcon.svg";
import GithubIcon from "../../_components/svg/icons/githubIcon.svg";
import Loading from "../../_components/features/loading";
import { useApiKey } from "../../context/apiKeyContext";
import AppleIcon from "../../_components/svg/icons/appleIconLogo.svg";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import { getCountryCallingCode } from "react-phone-number-input";

export default function LoginPage() {
  const { data: session, status } = useSession()
  const { setApiKey } = useApiKey();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (session?.user) {
  //     router.push("/developer-Api/on-boarding");
  //   }
  // }, [status, session]);

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleGithubLogin = () => {
    signIn("github");
    console.log("Session", session);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    // if (!formData.name) {
    //   newErrors.name = "Name is required";
    //   valid = false;
    // } else {
    //   newErrors.name = "";
    // }

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    } else if (!/^\+?\d{8,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
      valid = false;
    } else {
      newErrors.phoneNumber = "";
    }

    // if (!formData.email) {
    //   newErrors.email = "Email is required";
    //   valid = false;
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Invalid email format";
    //   valid = false;
    // } else {
    //   newErrors.email = "";
    // }
    // if (!formData.password) {
    //   newErrors.password = "Password is required";
    //   valid = false;
    // } else {
    //   newErrors.password = "";
    // }

    setErrors(newErrors);
    return valid; // Return true if valid, false otherwise
  };

  // const handleSignUp = async () => {
  //   if (validateForm()) {

  //     if (error) {
  //       toast({
  //         title: "Sign-up Error",
  //         description: error.message,
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     } else {
  //       toast({
  //         title: "Sign-up Successful",
  //         description: "Please log in to continue.",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //       setFormData({
  //         name: "",
  //         email: "",
  //         //   phoneNumber: "",
  //         password: "",
  //       });
  //       router.push("/login"); // Redirect after successful sign-up
  //     }
  //   }
  // };
  
  // const backendSendingData = {
  //   number:phoneNumber,
  //   code:phoneCode,
  // };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
      const countryCode = getCountryCallingCode(phoneNumber);
      const phoneNumberWithoutCountryCode = phoneNumber.slice(countryCode.length);
        const response = await axios.post(
          "https://developer-api-53407187172.us-central1.run.app/login",
          {
            number: phoneNumberWithoutCountryCode,
            code: countryCode,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log('Backend Sending:',backendSendingData)
        console.log("Response:", response.data);
        console.log('Api Key:',response.data.API_key)
        if (response.data.status === 200) {
          // Saving API key for new users 
          const apiKey = response.data.API_key;
          setApiKey(apiKey);
          toast({
            title: "Signup Successful",
            description: response.data.data,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          router.push("/onboarding");
        } else {
          toast({
            title: "Signup Failed",
            description: response.data.message,
            status: "error",
            duration: 6000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } finally {
        setLoading(false); // End loading animation
      }
    }
  };

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   router.refresh();
  //   setUser(null);
  // };

  return (
    <div className="relative" style={{ overflow: "hidden", height: "100vh" }}>
      <Image
        src={BgLeftCircle}
        alt="BgLeftCircle"
        style={{ position: "absolute" }}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANII="
      />
      <Image
        src={BgRightCircle}
        alt="BgRightCircle"
        objectFit="cover"
        style={{ position: "absolute", width: "60%", height: "100%", right: 0 }}
        width={200}
        height={200}
      />
      <Image
        src={DeveloperBg}
        alt="DeveloperBg"
        style={{ position: "absolute" }}
      />
      {loading && <Loading />}
      <main className=" flex items-center justify-center z-10 p-6">
        <Box
          zIndex={"10"}
          w={{ md: "lg", base: "100%" }}
          minH={"25rem"}
          borderRadius={"1.61rem"}
          background={"#1E1E1E"}
          p={{ md: "2.68rem", base: "1.34rem" }}
          mt={{ md: "6rem", base: "6rem" }}
          textAlign={"center"}
          display={"flex"}
          flexDirection={"column"}
          alignContent={"space-between"}
        >
          <Text
            color={"#CBCBCB"}
            fontSize={{ md: "1.65rem", base: "1.15rem" }}
            fontWeight={"700"}
            mb={{ md: "1.25rem", base: "1rem" }}
          >
            {" "}
            Get your account ready for Hushh{" "}
          </Text>

          <Button
            style={{ borderRadius: "3.35rem" }}
            onClick={() =>
              signIn(
                "google",
                { callbackUrl: "/developer-Api/on-boarding" },
              )
            }
            w={"100%"}
            background="#686F7D0F"
            mb={{ md: "1.25rem", base: "0.75rem" }}
            color={"#CBCBCB"}
            fontWeight={"400"}
            fontSize={"1rem"}
            lineHeight={"17.5px"}
            textAlign={"center"}
            gap={{ md: "0.75rem", base: "0.45rem" }}
            _hover={{
              color: "white",
              background:
                "linear-gradient(270.53deg, #E54D60 2.44%, #A342FF 97.51%)",
            }}
          >
            <Image src={GoogelIcon} alt="GoogelIcon" />
            Continue with Google
          </Button>

          <Button
            style={{ borderRadius: "3.35rem" }}
            // onClick={handleGithubLogin}
            onClick={() =>
              signIn(
                "github",
                { callbackUrl: "/developer-Api/on-boarding" },
                console.log("Github session data :", session)
              )
            }
            w={"100%"}
            background="#686F7D0F"
            mb={{ md: "1.25rem", base: "0.75rem" }}
            color={"#CBCBCB"}
            fontWeight={"400"}
            fontSize={"1rem"}
            lineHeight={"17.5px"}
            textAlign={"center"}
            gap={{ md: "0.75rem", base: "0.45rem" }}
            _hover={{
              color: "white",
              background:
                "linear-gradient(270.53deg, #E54D60 2.44%, #A342FF 97.51%)",
            }}
          >
            <Image src={GithubIcon} alt="GithubIcon" />
            Continue with Github
          </Button>

          <Button
            style={{ borderRadius: "3.35rem" }}
            onClick={() =>
              signIn(
                "apple",
                { callbackUrl: "/developer-Api/on-boarding" },
                console.log("Github session data :", session)
              )
            }
            w={"100%"}
            background="#686F7D0F"
            mb={{ md: "1.25rem", base: "0.75rem" }}
            color={"#CBCBCB"}
            fontWeight={"400"}
            fontSize={"1rem"}
            lineHeight={"17.5px"}
            textAlign={"center"}
            gap={{ md: "0.75rem", base: "0.45rem" }}
            _hover={{
              color: "white",
              background:
                "linear-gradient(270.53deg, #E54D60 2.44%, #A342FF 97.51%)",
            }}
          >
            <Image src={AppleIcon} alt="AppleIcon" />
            Continue with Apple
          </Button>

          <HStack my={{ md: "1rem", base: "0.5rem" }}>
            <Divider />
            <Text
              color={"#3F434A"}
              fontWeight={"400"}
              fontSize={{ md: "0.87rem", base: "0.6rem" }}
            >
              Or
            </Text>
            <Divider />
          </HStack>

          <FormControl isInvalid={errors.phoneNumber} mb={4}>
                  <Box borderRadius={"5px"}>
                    <PhoneInput
                      defaultCountry="US"
                      color={"#FFFFFF"}
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                    />
                  </Box>
                  <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
          </FormControl>

          {/* <Tooltip
            label={
              <>
                <Icon
                  as={FiAlertCircle}
                  color="yellow.400"
                  mb={"0.20rem"}
                  mr={"0.3rem"}
                />
                {errors.email}
              </>
            }
            isOpen={!!errors.email}
            hasArrow
            bg={"white"}
            color={"black"}
            borderRadius={"0.5rem"}
            fontSize={"1rem"}
            placement="right"
          >
            
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Input type="number" 
                 className="w-full p-3 rounded-md border border-gray-700 bg-transparent text-white"
                />
              </InputLeftElement>
              <InputRightElement>
              <Input
                type="number"
                name="phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                borderRadius="3.35rem"
                placeholder="Email"
                className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-transparent text-white"
              />
              </InputRightElement>
            </InputGroup>
          </Tooltip> */}

          {/* <Tooltip
            label={
              <>
                <Icon
                  as={FiAlertCircle}
                  color="yellow.400"
                  mb={"0.20rem"}
                  mr={"0.3rem"}
                />
                {errors.phoneNumber}
              </>
            }
            isOpen={!!errors.phoneNumber}
            hasArrow
            bg={"white"}
            color={"black"}
            borderRadius={"0.5rem"}
            fontSize={"1rem"}
            placement="right"
            icon={<FiAlertCircle />}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiLock} color="gray.400" />{" "}
              </InputLeftElement>
              <PhoneInput
                      className="phoneInput"
                      style={{width:'100%',backgroundColor:'transparent'}}
                      defaultCountry="US"
                      color={"#FFFFFF"}
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
              />
            </InputGroup>
          </Tooltip> */}

          <Button
            style={{ borderRadius: "3.35rem" }}
            onClick={handleSignIn}
            w={"100%"}
            background="linear-gradient(270.53deg, #E54D60 2.44%, #A342FF 97.51%)"
            mb={{ md: "1.25rem", base: "0.75rem" }}
          >
            Get Started
          </Button>

          <Text
            fontWeight={"400"}
            lineHeight={"18px"}
            fontSize={{ md: "sm", base: "xs" }}
            color={"white"}
          >
            By continuing, you're agreeing to our{" "}
            <a href="/legal/termsofuse" style={{ textDecoration: "underline" }}>
              Terms
            </a>{" "}
            and{" "}
            <a
              href="/legal/privacypolicy"
              style={{ textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </Text>
        </Box>
      </main>
    </div>
  );
}
