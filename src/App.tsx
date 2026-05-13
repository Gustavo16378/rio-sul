import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import Servicos from './pages/Servicos'
import SejaRioSul from './pages/SejaRioSul'
import Parceiros from './pages/Parceiros'
import Blog from './pages/Blog'
import Contato from './pages/Contato'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"              element={<Home />}       />
        <Route path="/servicos"      element={<Servicos />}   />
        <Route path="/seja-rio-sul"  element={<SejaRioSul />} />
        <Route path="/parceiros"     element={<Parceiros />}  />
        <Route path="/blog"          element={<Blog />}       />
        <Route path="/contato"       element={<Contato />}    />
      </Routes>
      <Footer />
      <CookieBanner />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
