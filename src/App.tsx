import { Suspense, useEffect } from 'react'
import './App.css'
import "./sass/index.scss";
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes/routes';
import AuthLayout from './layout/AuthLayout';
import Navbar from './components/Navbar/Navbar';

import 'swiper/css';
import 'swiper/css/navigation';
import { useData } from './context/DataContext';
import { useDispatch } from 'react-redux';
import { getUserData } from './store/slice/authSlice';
import { getLocalStorage } from './utils/webStorage';

function App() {
  const {
    contextHolder
  } = useData();
  const dispatch = useDispatch();
  const loggerId = getLocalStorage("loggerId");

  useEffect(() => {
    if (loggerId) {
      getUserData(loggerId, dispatch)
    }
  }, [])

  return (
    <div className='bg_primary'>
      {contextHolder}
      <Navbar />
      <Suspense fallback="...Loading">
        <Routes>
          {
            routes.map((item) => (
              <Route
                element={item.isPrivate ?
                  <div className='home_layout'>
                    <AuthLayout
                      child={
                        <item.element />
                      }
                    />
                  </div> :
                  <item.element />}
                path={item.path}
                key={item.name}
              />
            ))
          }
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
