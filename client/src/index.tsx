import React from "react";
import ReactDom from 'react-dom/client'
import App from "./App";
import './style/style.scss'

const rootElement = document.getElementById('root') as HTMLDivElement

const root = ReactDom.createRoot(rootElement)
root.render(<App/>)