import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { userState, useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthContext";

import 'styled-components'
import ButtonLink from "../../components/ButtonLink";
import Layout from "../Layout";

const AdminPage = () => {

    const { user, logout } = useAuth();


    if (user.rol != "administrador" || !user.rol) {
        return <Navigate to="/" />
    }
    const url = 'http://localhost:3005/v1/restaurante/ventas';
    const [ventas, setVentas] = useState([]);


    const cargar_ventas = async () => {
        let data = await fetch(url)
            .then(data => data.json())
            .then(res => res)
        setVentas(data)
    }

    useEffect(() => {
        cargar_ventas()
    }, [])
    return (
        <>
            <Layout>
                <div className="max-w-7xl rounded overflow-hidden shadow-lg mx-10 my-7 bg-background-light">
                    <h1 className="font-bold text-xl mb-2 my-3 ml-5 text-secondary-gray">Administrador</h1>
                    <div className="flex justify-end px-9">
                        <ButtonLink color="warning-orange" ruta="/" onClick={logout}>
                            Salir
                            <i className="ml-2 fa-solid fa-right-from-bracket"></i>
                        </ButtonLink>
                    </div>
                    <div className="container mx-auto mt-10 px-4 my-9">
                        <div className="columns-3">
                            <div className="max-w-sm rounded overflow-hidden shadow-lg ml-5 bg-primary-blue text-background-light">
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2 text-center">Usuarios</div>
                                    <p className="text-base text-center">
                                        <Link to="/usuarios" className="text-background-light">8</Link>
                                    </p>
                                </div>
                            </div>
                            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-primary-blue text-background-light">
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2 text-center">Productos</div>
                                    <p className="text-base text-center">
                                        <Link to="/productos" className="text-background-light">8</Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto mx-auto my-6">
                            <table className="min-w-full bg-background-light shadow-md rounded-xl">
                                <thead className="bg-primary-blue text-background-light">
                                    <tr>
                                        <th className="py-3 px-4 text-left">#</th>
                                        <th className="py-3 px-4 text-left">Fecha Venta</th>
                                        <th className="py-3 px-4 text-left">Total</th>
                                        <th className="py-3 px-4 text-left">Método Pago</th>
                                    </tr>
                                </thead>
                                <tbody className="text-secondary-gray">
                                    {ventas.map((venta, index) =>
                                        <tr key={index} className="border-b border-secondary-gray">
                                            <td className="py-3 px-4">{venta.idVenta}</td>
                                            <td className="py-3 px-4">{venta.fechaVenta}</td>
                                            <td className="py-3 px-4">$ {venta.total}</td>
                                            <td className="py-3 px-4">
                                                {venta.metodoPago === 1 ? 'Tarjeta crédito' : ''}
                                                {venta.metodoPago === 2 ? 'Tarjeta débito' : ''}
                                                {venta.metodoPago === 3 ? 'Efectivo' : ''}
                                                {venta.metodoPago === 4 ? 'Transferencia' : ''}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default AdminPage;