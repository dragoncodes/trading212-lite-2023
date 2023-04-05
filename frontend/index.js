import React from "react"
import ReactDOM from "react-dom/client"

import App from "./src/App"

const customCss = `
    input:focus {
      outline: none !important;
    }
`

const style = document.createElement("style")
style.style = customCss

document.head.appendChild(style)

ReactDOM.createRoot(document.body).render(<App />)
