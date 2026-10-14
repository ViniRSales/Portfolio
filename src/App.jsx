import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Projects from './pages/Projects'
import Experiences from './pages/Experiences'
import Contact from './pages/Contact'

// Cada <Route> é uma "página" do site. O Layout (cabeçalho + rodapé) envolve todas.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<About />} />
        <Route path="projetos" element={<Projects />} />
        <Route path="experiencias" element={<Experiences />} />
        <Route path="contato" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
