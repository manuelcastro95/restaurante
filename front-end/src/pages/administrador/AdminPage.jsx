import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { userState, useEffect, useState } from "react";

import 'styled-components'
import ButtonLink from "../../components/ButtonLink";

const AdminPage = ({ user }) => {
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
        <div className="max-w-7xl rounded overflow-hidden shadow-lg mx-10 my-7">
            <h1 className="font-bold text-xl mb-2 my-3 ml-5">Administrador</h1>
            <div className="flex justify-end px-9">
                <ButtonLink color="red" ruta="/">
                    Salir
                    <i className=" ml-2 fa-solid fa-right-from-bracket"></i>
                </ButtonLink>
            </div>
            <div className="container mx-auto mt-10 px-4 my-9 ">
                <div className="columns-3">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg ml-5">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center">Usuarios</div>
                            <p className="text-gray-700 text-base text-center">
                                <Link to="/usuarios">8</Link>
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center">Productos</div>
                            <p className="text-gray-700 text-base text-center">
                                <Link to="/productos">8</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto mx-auto my-6">
                    <table className="min-w-full bg-white shadow-md rounded-xl">
                        <thead>
                            <tr className="bg-blue-gray-100 text-gray-700">
                                <th className="py-3 px-4 text-left">#</th>
                                <th className="py-3 px-4 text-left">Fecha Venta</th>
                                <th className="py-3 px-4 text-left">Total</th>
                                <th className="py-3 px-4 text-left">Método Pago</th>
                            </tr>
                        </thead>
                        <tbody className="text-blue-gray-900">
                            {ventas.map((venta) =>
                                <tr key={venta.idVenta} className="border-b border-blue-gray-200">
                                    <td className="py-3 px-4">{venta.idVenta}</td>
                                    <td className="py-3 px-4">{venta.fechaVenta}</td>
                                    <td className="py-3 px-4">$ {venta.total}</td>
                                    <td className="py-3 px-4">{venta.metodoPago}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>



    )
}

export default AdminPage;