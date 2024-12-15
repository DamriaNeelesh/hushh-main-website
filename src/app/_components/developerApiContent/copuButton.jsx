import { useState } from "react";
import { Button, Tooltip } from "@chakra-ui/react";
import { FaCheck, FaCopy } from "react-icons/fa";

const CopyButton = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);
  
    const handleCopy = async () => {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
  
    return (
      <Tooltip label={copied ? "Copied!" : "Copy"} placement="top">
        <Button
          size="sm"
          variant="ghost"
          colorScheme={copied ? "green" : "teal"}
          leftIcon={copied ? <FaCheck /> : <FaCopy />}
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </Tooltip>
    );
  };
  
  export default CopyButton;
