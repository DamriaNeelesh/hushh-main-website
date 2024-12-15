"use client"
import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Button } from '@chakra-ui/react'
import { ServiceCard } from '../primitives/serviceCard'
import HushhWalletIcon from '../svg/hushhWalletIcon'
import dynamic from 'next/dynamic';
const Mermaid = dynamic(() => import('../hooks/useMermaid'), { ssr: false });

const CustomLink = (props) => {
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
};

const mdxComponents = {
    Image,
    SyntaxHighlighter,
    Button,
    ServiceCard,
    HushhWalletIcon,
    Mermaid,
    a: CustomLink, // Override the default link component
}

const RenderMdx = ({blog}) => {
    const MDXContent = useMDXComponent(blog.body.code)

  return (
    <>
    <div className='col-span-12 text-white lg:col-span-8 font-in prose sm:prose-base md:prose-lg max-w-max
prose-blockquote:bg-accent/20 
prose-blockquote:p-2
prose-blockquote:px-6
prose-blockquote:border-accent
prose-blockquote:not-italic
prose-blockquote:rounded-r-lg
prose-li:marker:text-white
prose-strong:text-white
prose-b:text-white
prose-p:text-white
prose-span:text-white
prose-a:text-white
dark:prose-invert
dark:prose-blockquote:border-accentDark
dark:prose-blockquote:bg-accentDark/20
dark:prose-li:marker:text-accentDark
first-letter:text-3xl
sm:first-letter:text-5xl
prose-headings:text-white
'>
        <MDXContent components={mdxComponents}/>
    </div>
    </>
  )
}

export default RenderMdx