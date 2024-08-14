import { useState } from 'react'
import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { SEATTLE_LATITUDE, SEATTLE_LONGITUDE } from './constants/Constants'
import MainLayout from './MainLayout'

const App : React.FC = () => {
  const [latitude, setLatitude] = useState(SEATTLE_LATITUDE)
  const [longitude, setLongitude] = useState(SEATTLE_LONGITUDE)
  const [isCelsius, setIsCelsius] = useState(true)
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout setLatitude={setLatitude} setLongitude={setLongitude} isCelsius={isCelsius} setIsCelsius={setIsCelsius}/>}>
      <Route index element={<HomePage latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} isCelsius={isCelsius}/>} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>    )
  )
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
