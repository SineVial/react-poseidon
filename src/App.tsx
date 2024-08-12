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
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout setLatitude={setLatitude} setLongitude={setLongitude}/>}>
      <Route index element={<HomePage latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude}/>} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>    )
  )
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
