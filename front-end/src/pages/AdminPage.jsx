import { Navigate, useNavigate } from "react-router-dom";
import React, {userState, useEffect, useState} from "react";
import DataTable, {createTheme} from 'react-data-table-component'
import 'styled-components'

const AdminPage = ({ user }) => {
    if (user != "administrador" || !user) {
        return <Navigate to="/" />
    }
    const url = 'http://localhost:3005/v1/restaurante/ventas';

    // 1.configurar hooks
    const [ventas, setVentas] = useState([]);

    // 2. Funcion para mostrar los daos fetch
    const cargar_ventas = async () => {
        let data = await fetch(url)
                        .then(data => data.json())
                            .then(res => res)
        setVentas(data)
    }

    // 3. Configurar columns para DataTable
    const columns = [
        {
            name: '#',
            selector: row => row.idVenta
        },
        {
            name: 'Fecha Venta',
            selector: row => row.fechaVenta,
            sortable: true,
        },
        {
            name: 'Total',
            selector: row => `$ ${row.total}`,
            sortable: true,
        },
        {
            name: 'Metodo Pago',
            selector: row => row.metodoPago,
            sortable: true,
        }      
    ]
    useEffect (() => {
        cargar_ventas()
    }, [])
    return (

        <div className="min-h-full">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Administrador</h1>
            </div>
            <main>
                <div className="columns-3">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg ml-5">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center">Usuarios</div>
                            <p className="text-gray-700 text-base text-center">
                                6
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center">Productos</div>
                            <p className="text-gray-700 text-base text-center">
                                8
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-center">Pedidos</div>
                            <p className="text-gray-700 text-base text-center">
                                12
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-1 max-w-7xl rounded overflow-hidden shadow-lg ml-5 mt-4">
                    <h1 className="font-bold text-xl mb-2 my-3 ml-5">Ventas</h1>
                     <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <DataTable
                                        columns={columns}
                                        data={ventas}
                                        pagination
                                        theme="solarize"
                                        defaultSortFieldId={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminPage;