import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import CocinaPage from './pages/CocinaPage';
import MeseroPage from './pages/MeseroPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login callback={setUser} />}></Route>
        <Route path="/administrador" element={<AdminPage user={user} />}></Route>
        <Route path="/mesero" element={<CocinaPage user={user} />}></Route>
        <Route path="/cocina" element={<MeseroPage user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
