'use client'
import React from 'react'
import HTMLFlipBook from 'react-pageflip';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import ContactForm from './features/contactForm';
import { Box, Text } from '@chakra-ui/react';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const Pages = React.forwardRef((props, ref) => {
//     return (
//         <div className="demoPage" ref={ref} >
//             <p>{props.children}</p>
//             <p>Page number: {props.number}</p>
//         </div>
//     );
// });

// Pages.displayName = 'Pages';

function Flipbook() {

    const [numPages, setNumPages] = useState();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return (
        <>
          <Box width={'100%'} position={'relative'} height={'100%'} mt={'0.5rem'}>
            <Text color={'white'} fontSize={{md:'4rem',base:'1.75rem'}}>Hushh Journey Book</Text>
            <Box position={'relative'}>
            <iframe src="https://online.publuu.com/570829/1281762/page/1?embed&transparent" width="100%" height="800"  scrolling="no" frameborder="0" allowfullscreen="" allow="clipboard-write" class="publuuflip"></iframe>

            </Box>
          </Box>      
            {/* <iframe src="https://online.publuu.com/570829/1281762/page/1?embed" width="100%" height="1200px" scrolling="no" frameborder="0" allowfullscreen="true" allow="clipboard-write" class="publuuflip"></iframe> */}
            {/* <div style={{ position: 'relative',background:'black', paddingTop: 'max(60%, 324px)', width: '100%', height: '0' }}>
            <iframe
                style={{ position: 'absolute',marginTop:'6rem',background:'black', border: 'none', width: '100%', height: '100%', left: '0', top: '0' }}
                src="https://online.fliphtml5.com/xctge/xwqu/"
                seamless="seamless"
                scrolling="no"
                frameBorder="0"
                allowTransparency="true"
                allowFullScreen="true"
            ></iframe>
        </div> */}
            <ContactForm/>
        </>

    );
}

export default Flipbook