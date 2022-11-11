import '../styles/main.scss'
import * as React from "react";
import { Provider as AlertProvider } from 'react-alert'
import {CartProvider} from "react-use-cart";
import AlertTemplate from "../components/layout/AlertTemplate";
import { Worker } from '@react-pdf-viewer/core';
import {MediaContextProvider, mediaStyles} from "../utils/media";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    const options = {
        position: 'top center',
        timeout: 5000,
        offset: '20px',
        transition: 'scale',
        containerStyle: {
            zIndex: 9999
        }
    }

    return (
        <React.Fragment>
            <Head>
                <style
                    type="text/css"
                    dangerouslySetInnerHTML={{ __html: mediaStyles }}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <CartProvider id={'osa-catalog-requests'}>
                <AlertProvider template={AlertTemplate} {...options}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
                        <MediaContextProvider disableDynamicMediaQueries>
                            <Component {...pageProps} />
                        </MediaContextProvider>
                    </Worker>
                </AlertProvider>
            </CartProvider>
        </React.Fragment>
    )
}

export default MyApp
