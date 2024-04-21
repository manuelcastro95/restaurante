import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, menu_active }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: "fa-solid fa-house", label: "Inicio", ruta: "/dashboard" },
    { icon: "fa-solid fa-users", label: "Usuarios", ruta: "/usuarios" },
    { icon: "fa-solid fa-users-gear", label: "Roles", ruta: "/roles" },
    { icon: "fa-solid fa-boxes-stacked", label: "Productos", ruta: "/productos" },
    { icon: "fa-solid fa-layer-group", label: "Categorias", ruta: "/categorias" },
    
    { icon: "fa-solid fa-clock-rotate-left", label: "Actividad reciente", ruta: "" }
  ];


  // <i class="fa-solid fa-layer-group"></i>
  return (
    <div className="w-full h-full overflow-x-hidden font-poppins-light bg-background-light">
      <div className="flex">
        {/* Sidebar */}
        <div className={`flex-none h-screen border transition-all duration-300 w-[5rem] pr-2 hover:w-[12rem] group bg-background-light`}>
          <ul className='flex flex-col h-full text-secondary-gray'>
            <li className="mt-5 mb-3 mx-3 text-primary-blue"> {/* Logo */}
              <div className="flex justify-center">
                <span className="text-xl">Logo</span>
              </div>
            </li>
            <div className="flex-grow overflow-auto">
              {menuItems.map((item, i) => (
                <Link  key={i} to={item.ruta}>
                  <li className={`my-3 py-2 text-sm rounded-r-full  ${menu_active == item.label ? 'bg-primary-blue text-background-light' : 'bg-background-light'} hover:bg-primary-blue hover:text-background-light cursor-pointer flex items-center overflow-hidden`}>
                    <i className={`${item.icon} mr-2 ml-7 group-hover:ml-3`}></i>
                    <span className="transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {item.label}
                    </span>
                  </li>
                </Link>
              ))}
            </div>
            <li className="mt-3 mb-5 mx-3"> {/* Perfil */}
              <div className="flex justify-center">
                <span className="text-xl text-secondary-gray">Perfil</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 h-screen flex flex-col">
          <div className="flex-auto overflow-auto bg-background-light">
            {children}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Layout;
