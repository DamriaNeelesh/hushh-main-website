"use client"
import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { Button } from '@chakra-ui/react'
import { ServiceCard } from '../primitives/serviceCard'
import HushhWalletIcon from '../svg/hushhWalletIcon'
import dynamic from 'next/dynamic';
const Mermaid = dynamic(() => import('../hooks/useMermaid'), { ssr: false });

const CustomLink = (props) => {
  return (
    <a 
      {...props} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-[#0066CC] hover:underline font-medium"
    />
  );
};

const CustomImage = (props) => {
  return (
    <div className="my-10 overflow-hidden rounded-lg">
      <Image 
        {...props}
        className="w-full h-auto object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      />
    </div>
  );
};

const CustomCode = (props) => {
  const { children, className } = props;
  const match = /language-(\w+)/.exec(className || '');

  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      style={atomOneDark}
      PreTag="div"
      className="rounded-lg my-8 text-sm"
      showLineNumbers
      customStyle={{
        padding: "1.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "#f5f5f7",
        color: "#1d1d1f",
        border: "1px solid #e5e5e7",
      }}
      codeTagProps={{
        style: {
          fontFamily: "SF Mono, Menlo, Monaco, Consolas, monospace",
        },
      }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className="bg-[#f5f5f7] text-[#1d1d1f] dark:bg-[#1A1A1A] dark:text-[#E5E5E5] px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  );
};

const CustomParagraph = (props) => {
  return (
    <p className="text-[#1d1d1f] dark:text-[#f5f5f7] text-lg leading-relaxed my-6 font-normal" {...props} />
  );
};

const CustomHeading1 = (props) => {
  return (
    <h1 className="text-[#1d1d1f] dark:text-white text-4xl font-semibold mt-12 mb-6" {...props} />
  );
};

const CustomHeading2 = (props) => {
  return (
    <h2 className="text-[#1d1d1f] dark:text-white text-3xl font-semibold mt-10 mb-5" {...props} />
  );
};

const CustomHeading3 = (props) => {
  return (
    <h3 className="text-[#1d1d1f] dark:text-white text-2xl font-semibold mt-8 mb-4" {...props} />
  );
};

const CustomList = (props) => {
  return (
    <ul className="list-disc pl-6 my-6 text-[#1d1d1f] dark:text-[#f5f5f7] text-lg" {...props} />
  );
};

const CustomListItem = (props) => {
  return (
    <li className="mb-3 text-[#1d1d1f] dark:text-[#f5f5f7]" {...props} />
  );
};

const CustomBlockquote = (props) => {
  return (
    <blockquote className="pl-4 border-l-4 border-[#0066CC] italic my-8 text-[#6e6e73] dark:text-[#86868b] py-1" {...props} />
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
    const MDXContent = useMDXComponent(blog.body.code)

  return (
    <article className="max-w-none text-[#1d1d1f] dark:text-[#f5f5f7]
      prose-headings:text-[#1d1d1f] dark:prose-headings:text-white prose-headings:font-semibold prose-headings:mb-4 prose-headings:mt-8
      prose-h1:text-4xl prose-h1:mt-10 prose-h1:mb-6
      prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-5
      prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-4
      prose-p:text-[#1d1d1f] dark:prose-p:text-[#f5f5f7] prose-p:my-5 prose-p:leading-relaxed prose-p:text-lg
      prose-li:text-[#1d1d1f] dark:prose-li:text-[#f5f5f7] prose-li:my-2 prose-li:text-lg
      prose-strong:font-semibold prose-strong:text-[#1d1d1f] dark:prose-strong:text-white
      prose-blockquote:border-l-4 prose-blockquote:border-[#0066CC] prose-blockquote:pl-4 prose-blockquote:bg-transparent
      prose-blockquote:italic prose-blockquote:text-[#6e6e73] dark:prose-blockquote:text-[#86868b]
      prose-hr:border-[#e5e5e7] dark:prose-hr:border-[#333336] prose-hr:my-10
      prose-img:rounded-lg prose-img:my-10
      prose-table:border-collapse prose-table:w-full
      prose-th:bg-[#f5f5f7] dark:prose-th:bg-[#1A1A1A] prose-th:p-3 prose-th:border prose-th:border-[#e5e5e7] dark:prose-th:border-[#333336]
      prose-td:p-3 prose-td:border prose-td:border-[#e5e5e7] dark:prose-td:border-[#333336]
    ">
      <MDXContent components={mdxComponents} />
    </article>
  )
}

export default RenderMdx