import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';


import Login from './pages/Login';
import AdminPage from './pages/administrador/AdminPage';
import Productos from './pages/administrador/Productos';
import Usuarios from './pages/administrador/Usuarios';
import CocinaPage from './pages/cocina/CocinaPage';
import MeseroPage from './pages/mesero/MeseroPage';
import Roles from './pages/administrador/Roles';
import Categorias from './pages/administrador/Categorias';
import DashBoard from './pages/DashBoard';
import NoFound from './pages/NoFound';
import Actividades from './pages/Actividades';
import Mesas from './pages/administrador/Mesas';


export default function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route>
          <Route path="/actividades-recientes" element={<Actividades />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="administrador" element={<AdminPage />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="roles" element={<Roles />} />
          <Route path="productos" element={<Productos />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="mesas" element={<Mesas />} />
          <Route path="cocina" element={<CocinaPage />} />
          <Route path="mesero" element={<MeseroPage />} />
          <Route path="*" element={<NoFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
