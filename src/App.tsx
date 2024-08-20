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
import Cookies from 'js-cookie'

const App : React.FC = () => {
  const [latitude, setLatitude] = useState<number>(() => {
    const savedLat = Cookies.get('latitude')
    return savedLat ? JSON.parse(savedLat) : SEATTLE_LATITUDE
  })
  const [longitude, setLongitude] = useState<number>(() => {
    const savedLon = Cookies.get('longitude')
    return savedLon ? JSON.parse(savedLon) : SEATTLE_LONGITUDE
  })
  const [isCelsius, setIsCelsius] = useState<boolean>(() => {
    const saved = Cookies.get('isCelsius')
    return saved ? JSON.parse(saved) : false
  })
  
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
