import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';


import Login from './pages/Login';
import AdminPage from './pages/administrador/AdminPage';
import Productos from './pages/administrador/Productos';
import Usuarios from './pages/administrador/Usuarios';
import CocinaPage from './pages/cocina/CocinaPage';
import MeseroPage from './pages/mesero/MeseroPage';
import Pedidos from './pages/cocina/Pedidos';

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

        <Route path="/cocina" element={<CocinaPage user={user} />}></Route>
        <Route path="/mesero" element={<MeseroPage user={user} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
