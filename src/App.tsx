import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route index element={<HomePage />} />
    <Route path="*" element={<NotFoundPage />} />
    </>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
