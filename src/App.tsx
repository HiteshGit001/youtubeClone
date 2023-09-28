import { Suspense } from 'react'
import './App.css'
import "./sass/index.scss";
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes/routes';
import AuthLayout from './layout/AuthLayout';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className='bg_primary h_100vh'>
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
