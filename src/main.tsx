import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, Route } from "react-router-dom"
import { router } from "./routes"
import "./index.css"
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
