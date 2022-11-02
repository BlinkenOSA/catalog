import '../styles/main.scss'
import * as React from "react";
import { Provider as AlertProvider } from 'react-alert'
import {CartProvider} from "react-use-cart";
import AlertTemplate from "../components/layout/AlertTemplate";
import { Worker } from '@react-pdf-viewer/core';

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
        <CartProvider id={'osa-catalog-requests'}>
            <AlertProvider template={AlertTemplate} {...options}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
                    <Component {...pageProps} />
                </Worker>
            </AlertProvider>
        </CartProvider>
    )
}

export default MyApp
