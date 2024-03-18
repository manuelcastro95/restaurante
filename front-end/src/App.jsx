import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import CocinaPage from './pages/CocinaPage';
import MeseroPage from './pages/MeseroPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Usuarios from './pages/Usuarios';
import { Productos } from './pages/Productos';
import { Pedidos } from './pages/Pedidos';

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login callback={setUser} />}></Route>
        <Route path="/administrador" element={<AdminPage user={user} />}></Route>
        <Route path="/usuarios" element={<Usuarios user={user} />}></Route>
        <Route path="/productos" element={<Productos user={user} />}></Route>
        <Route path="/pedidos" element={<Pedidos user={user} />}></Route>

        <Route path="/mesero" element={<CocinaPage user={user} />}></Route>
        <Route path="/cocina" element={<MeseroPage user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
