import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from './pages/Login.jsx';
import Vans from "./pages/Vans.jsx"
import VanDetail from './pages/VanDetail.jsx'
import NotFound from './pages/NotFound.jsx';
import Layout from './components/Layout.jsx';

import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans from './pages/Host/HostVans'
import HostVanDetail from './pages/Host/HostVanDetail'
import HostVanInfo from "./pages/Host/HostVanInfo.jsx"
import HostVanPricing from "./pages/Host/HostVanPricing.jsx"
import HostVanPhotos from "./pages/Host/HostVanPhotos.jsx"
import HostLayout from "./components/HostLayout"
import AuthRequired from './components/AuthRequired.jsx';

import "./server"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />

        <Route element={<AuthRequired />}>
          <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />}/>
                <Route path="pricing" element={<HostVanPricing />}/>
                <Route path="photos" element={<HostVanPhotos />}/>
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);