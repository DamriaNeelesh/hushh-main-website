"use client"
import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { Button, Box, Text, useColorMode } from '@chakra-ui/react'
import { ServiceCard } from '../primitives/serviceCard'
import HushhWalletIcon from '../svg/hushhWalletIcon'
import dynamic from 'next/dynamic';
const Mermaid = dynamic(() => import('../hooks/useMermaid'), { ssr: false });

const CustomLink = (props) => {
  const { colorMode } = useColorMode();
  
  return (
    <a 
      {...props} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-[#0066CC] hover:underline font-medium relative group"
      style={{
        transition: 'all 0.2s ease',
        paddingBottom: '1px',
        borderBottom: `1px solid ${colorMode === 'light' ? 'rgba(0, 102, 204, 0.3)' : 'rgba(0, 102, 204, 0.5)'}`,
      }}
    >
      {props.children}
      <span 
        className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#0066CC] transition-all duration-300 ease-in-out group-hover:w-full" 
        style={{ opacity: 0.8 }}
      />
    </a>
  );
};

const CustomImage = (props) => {
  return (
    <div className="my-10 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-500">
      <Image 
        {...props}
        className="w-full h-auto object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        quality={90}
      />
    </div>
  );
};

const CustomCode = (props) => {
  const { children, className } = props;
  const match = /language-(\w+)/.exec(className || '');
  const { colorMode } = useColorMode();
  
  // Theme-based styling
  const bgColor = colorMode === 'light' ? "#f5f5f7" : "#1A1A1A";
  const textColor = colorMode === 'light' ? "#1d1d1f" : "#e5e5e7";
  const borderColor = colorMode === 'light' ? "#e5e5e7" : "#333336";

  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      style={atomOneDark}
      PreTag="div"
      className="rounded-lg my-8 text-sm apple-code-block"
      showLineNumbers
      customStyle={{
        padding: "1.5rem",
        borderRadius: "0.75rem",
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        fontSize: "0.9rem",
        lineHeight: 1.6,
        boxShadow: colorMode === 'light' 
          ? "0 4px 16px rgba(0, 0, 0, 0.04)" 
          : "0 4px 16px rgba(0, 0, 0, 0.2)",
      }}
      codeTagProps={{
        style: {
          fontFamily: "SF Mono, Menlo, Monaco, Consolas, monospace",
          letterSpacing: "-0.01em",
        },
      }}
      lineNumberStyle={{
        color: colorMode === 'light' ? "#6e6e73" : "#86868b",
        fontSize: "0.8rem", 
        paddingRight: "1.5rem",
      }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code 
      className="px-2 py-1 rounded text-sm font-mono"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        fontFamily: "SF Mono, Menlo, Monaco, Consolas, monospace",
        fontSize: "0.875rem",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </code>
  );
};

const CustomParagraph = (props) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === 'light' ? "#1d1d1f" : "#f5f5f7";
  
  return (
    <p 
      className="text-lg leading-relaxed my-6 font-normal apple-paragraph" 
      style={{ 
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Helvetica, Arial, sans-serif',
        letterSpacing: '-0.01em',
        lineHeight: 1.5,
      }}
      {...props} 
    />
  );
};

const CustomHeading1 = (props) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === 'light' ? "#1d1d1f" : "white";
  
  return (
    <h1 
      className="text-4xl font-semibold mt-12 mb-6 apple-heading" 
      style={{ 
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Helvetica, Arial, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      }}
      {...props} 
    />
  );
};

const CustomHeading2 = (props) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === 'light' ? "#1d1d1f" : "white";
  
  return (
    <h2 
      className="text-3xl font-semibold mt-10 mb-5 apple-heading" 
      style={{ 
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Helvetica, Arial, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: 1.3,
      }}
      {...props} 
    />
  );
};

const CustomHeading3 = (props) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === 'light' ? "#1d1d1f" : "white";
  
  return (
    <h3 
      className="text-2xl font-semibold mt-8 mb-4 apple-heading" 
      style={{ 
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Helvetica, Arial, sans-serif',
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
      }}
      {...props} 
    />
  );
};

const CustomList = (props) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === 'light' ? "#1d1d1f" : "#f5f5f7";
  
  return (
    <ul 
      className="list-disc pl-6 my-6 text-lg apple-list" 
      style={{ 
        color: textColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Helvetica, Arial, sans-serif',
      }}
      {...props} 
    />
  );
};

const CustomListItem = (props) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === 'light' ? "#1d1d1f" : "#f5f5f7";
  
  return (
    <li 
      className="mb-3 apple-list-item" 
      style={{ 
        color: textColor,
        lineHeight: 1.5,
      }}
      {...props} 
    />
  );
};

const CustomBlockquote = (props) => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === 'light' ? "#6e6e73" : "#86868b";
  const borderColor = "#0066CC"; // Apple blue
  
  return (
    <blockquote 
      className="pl-4 border-l-4 italic my-8 py-1 apple-blockquote" 
      style={{ 
        borderColor: borderColor,
        color: textColor,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        background: 'transparent',
      }}
      {...props} 
    />
  );
};

const mdxComponents = {
    Image: CustomImage,
    a: CustomLink,
    code: CustomCode,
    p: CustomParagraph,
    h1: CustomHeading1,
    h2: CustomHeading2,
    h3: CustomHeading3,
    ul: CustomList,
    li: CustomListItem,
    blockquote: CustomBlockquote,
    SyntaxHighlighter,
    Button,
    ServiceCard,
    HushhWalletIcon,
    Mermaid,
}

const RenderMdx = ({blog}) => {
  const { colorMode } = useColorMode();
  
  try {
    if (!blog || !blog.body || !blog.body.code) {
      console.error("Blog content is missing or improperly formatted");
      return (
        <Box p={5} textAlign="center">
          <Text fontSize="lg" color="red.500">
            The blog content could not be loaded. Please try again later.
          </Text>
        </Box>
      );
    }
    
    const MDXContent = useMDXComponent(blog.body.code);

    return (
      <article 
        className="max-w-none apple-article"
        style={{
          color: colorMode === 'light' ? "#1d1d1f" : "#f5f5f7",
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Helvetica, Arial, sans-serif',
        }}
      >
        <MDXContent components={mdxComponents} />
        
        <style jsx global>{`
          .apple-article .apple-paragraph:first-of-type {
            font-size: 1.125rem;
            line-height: 1.6;
            color: ${colorMode === 'light' ? '#424245' : '#a1a1a6'};
            letter-spacing: -0.011em;
          }
          
          .apple-code-block {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .apple-code-block:hover {
            transform: translateY(-2px);
            box-shadow: ${colorMode === 'light' 
              ? '0 6px 20px rgba(0, 0, 0, 0.1)' 
              : '0 6px 20px rgba(0, 0, 0, 0.3)'};
          }
          
          .apple-heading {
            position: relative;
          }
          
          .apple-heading:after {
            content: '';
            display: block;
            width: 0;
            height: 0;
            margin-top: 8px;
            transition: width 0.3s ease;
          }
          
          .apple-heading:hover:after {
            width: 40px;
            height: 2px;
            background-color: #0066CC;
          }
          
          .apple-list {
            position: relative;
          }
          
          .apple-list-item {
            position: relative;
            padding-left: 0.25rem;
          }
          
          .apple-list-item::marker {
            color: ${colorMode === 'light' ? '#1d1d1f' : '#f5f5f7'};
          }
          
          .apple-blockquote {
            position: relative;
          }
          
          .apple-blockquote:before {
            content: """;
            position: absolute;
            top: -0.5rem;
            left: -0.5rem;
            font-size: 2rem;
            color: #0066CC;
            opacity: 0.3;
          }
          
          /* Enhance table styles */
          .apple-article table {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
            font-size: 0.9rem;
            box-shadow: ${colorMode === 'light' 
              ? '0 2px 8px rgba(0, 0, 0, 0.05)' 
              : '0 2px 8px rgba(0, 0, 0, 0.2)'};
            border-radius: 0.5rem;
            overflow: hidden;
          }
          
          .apple-article th {
            background-color: ${colorMode === 'light' ? '#f5f5f7' : '#1A1A1A'};
            color: ${colorMode === 'light' ? '#1d1d1f' : 'white'};
            font-weight: 600;
            text-align: left;
            padding: 0.75rem 1rem;
            border: 1px solid ${colorMode === 'light' ? '#e5e5e7' : '#333336'};
          }
          
          .apple-article td {
            padding: 0.75rem 1rem;
            border: 1px solid ${colorMode === 'light' ? '#e5e5e7' : '#333336'};
            transition: background-color 0.2s ease;
          }
          
          .apple-article tr:hover td {
            background-color: ${colorMode === 'light' ? 'rgba(0, 102, 204, 0.05)' : 'rgba(0, 102, 204, 0.1)'};
          }
        `}</style>
      </article>
    );
  } catch (error) {
    console.error("Error rendering MDX content:", error);
    return (
      <Box p={5} textAlign="center">
        <Text fontSize="lg" color="red.500">
          There was an error rendering this blog post. Please try again later.
        </Text>
        {process.env.NODE_ENV === 'development' && (
          <Text mt={2} fontSize="sm" color="gray.500">
            Error: {error.message}
          </Text>
        )}
      </Box>
    );
  }
}

export default RenderMdx