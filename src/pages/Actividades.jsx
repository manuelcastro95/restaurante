import React, { useEffect, useState } from 'react';
import { useAuth } from "../providers/AuthContext";
import Layout from "./Layout"
import ButtonLink from '../components/ButtonLink';


const Actividades = () => {
    const { userAuth, logout } = useAuth();
    const [actividades, setActividades] = useState([]);
    // const url = 'http://localhost:3005/v1/restaurante/actividades';
    const url_base = 'https://restaurante-endpoints.vercel.app/v1/restaurante/actividades/';

    const cargar_actividades = async () => {
        const data = await fetch(url)
            .then(res => res.json())
            .then(data => data);
        setActividades(data);
    }

    useEffect(() => {
        cargar_actividades();
    }, []); 

    return (
        <Layout menu_active="Actividades Recientes">
            <div className="p-4 w-full bg-background-light">
                <h1 className="text-xl font-bold text-dark-charcoal mb-4">Actividades Recientes</h1>

                <div className="flex justify-end px-9">
                    <ButtonLink color="light-gray" ruta="/dashboard">
                        <i className="mr-2 fa-solid fa-angles-left"></i>
                        Regresar
                    </ButtonLink>
                    <ButtonLink color="warning-orange" ruta="/" onClick={logout}>
                        Salir
                        <i className="ml-2 fa-solid fa-right-from-bracket"></i>
                    </ButtonLink>
                </div>

                <div className="my-9 overflow-x-auto shadow-md rounded-lg p-4 shadow-sky-blue overflow-hidden bg-background-light">
                    <div className="inline-block">
                        <div className="w-full relative overflow-y-auto h-[500px]">
                            <table className="table w-full">
                                <thead className="text-background-light bg-bright-blue rounded-xl">
                                    <tr>
                                        <th className="py-2 border-b px-5 text-left font-bold rounded-tl-xl">Usuario</th>
                                        <th className="py-2 border-b px-5 text-left font-bold">Acción</th>
                                        <th className="py-2 border-b px-5 text-left font-bold">Detalles</th>
                                        <th className="py-2 border-b px-5 text-left font-bold rounded-tr-xl">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody className="text-dark-charcoal">
                                    {actividades.map((actividad, i) => (
                                        <tr key={i}>
                                            <td className="border-b p-2">{actividad.userId.nombre} {actividad.userId.apellido}</td>
                                            <td className="border-b p-2">{actividad.action}</td>
                                            <td className="border-b p-2">{actividad.details}</td>
                                            <td className="border-b p-2">{new Date(actividad.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Actividades;
