'use client'
import React, {  } from 'react'
import MDXComponents from './src/app/_components/developerApiContent/page'
import Header from './src/app/_components/header'
import remarkGfm from 'remark-gfm';
import MyLogo from './src/app/developerApi/userLogo';
import LogoutButton from './src/app/_components/developerApiContent/logout';
import FeedbackPopup from './src/app/_components/developerApiContent/feedbackPopup';
import { Box, Flex } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowLeftIcon } from '@chakra-ui/icons';


export default {
    logo: <span>Hushh Developer API </span>,
    font:false,
    // navbar: {
    //   component: (
    //     <Flex
    //       justifyContent="space-between"
    //       alignItems="center"
    //       width="100%"
    //       padding="1rem"
    //       style={{ backgroundColor: 'white', borderBottom: '1px solid #eaeaea' }}
    //     >
    //       {/* Left Section: Main Logo */}
    //       <Box fontWeight="bold" fontSize="lg">
    //         Hushh Developer API
    //       </Box>
  
          
  
    //       {/* Right Section: MyLogo */}
    //       <Box>
    //         <MyLogo />
    //       </Box>
    //     </Flex>
    //   ),
    // },
    project: {
      link:'/developerApi/login',
      icon: (
        <MyLogo/>
      ),
    },
    footer:{
       text:null,
       Component:null,
    },
    feedback:{ 
      content: "To know more about hushh develoeper API", 
      label:'To know more about hushh develoeper API', 
      link:'/products/developerApi'
    }, 
  //   toc: {
  //     extraContent: () =>
  //         <FeedbackPopup/>
  // },
    editLink: { text: null },
    head: (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hushh Developer API" />
        <meta property="og:description" content="Secure way of relaying personal information" />
      </>
    ),
    banner: {
      dismissible:false,
      key: '2.0-release',
      text: (
        <a style={{textAlign:'left'}} href="/">
      <Box gap={'0.2rem'} alignItems={'flex-start'} justifyContent={'flex-start'} display={'flex'} >
      <ArrowBackIcon style={{marginTop:'0.25rem'}}/>
         Back 
      </Box> 
      </a>
 
    )
    },
    docsRepositoryBase: 'https://hushh.gitbook.io/hushh-docs',
    // logo:<Image src={HushhLogo} />,
    useNextSeoProps() {
      return {
        titleTemplate: '%s – Developer API'
      }
    },
    // navbar: {
    //   component:  <CustomNavbar />
    // },
    
    content: {
      components: MDXComponents,
    },
    markdown: {
      remarkPlugins: [remarkGfm],
    },
}

