import { useEffect, useState } from "react";
import Layout from "./Layout"
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const DashBoard = () => {

    const [users, setUsers] = useState([]);
    const [productos, setProductos] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [total, setTotal] = useState(0)
    const url_base = 'http://localhost:3005/v1/restaurante/';


    const cargar_users = async () => {
        const data = await fetch(`${url_base}users`)
            .then(res => res.json())
            .then(data => data)
        setUsers(data)
    }

    const cargar_productos = async () => {
        let data = await fetch(`${url_base}productos/`)
            .then(data => data.json())
            .then(res => res)

        setProductos(data)
    }

    const cargar_ventas = async () => {
        let data = await fetch(`${url_base}ventas`)
            .then(data => data.json())
            .then(res => res)
        setVentas(data)
        let subtotal = 0;
        data.forEach(venta => subtotal += venta.total)
        setTotal(subtotal)
    }

    const formatear_fecha = (fecha) => {
        let f_format = new Date(fecha);
        let dia = f_format.getDay() < 9 ? `0${f_format.getDay()}` : f_format.getDay();
        let mes = f_format.getMonth() < 9 ? `0${f_format.getMonth()}` : f_format.getMonth();
        return `${dia}-${mes}-${f_format.getFullYear()}`;
    }

    useEffect(() => {
        cargar_users();
        cargar_productos();
        cargar_ventas();
    }, [])

    return (
        <>
            <Layout menu_active="Inicio">
                <div className="p-4 w-full bg-background-light">
                    <h1 className="text-xl font-bold text-dark-charcoal mb-4">Dashboard Principal</h1>
                    <div className="grid grid-cols-3 gap-4">
                        <Link to="/usuarios" className="h-44 bg-sky-blue border shadow-lg rounded-xl flex flex-col justify-center items-center cursor-pointer hover:text-background-light" title="Total Usuarios">
                            <i className="fa-solid fa-users text-5xl text-background-light"></i>
                            <span className="mt-4 text-xl text-background-light"> {users.length}</span>
                        </Link>
                        <Link to="/productos" className="h-44 bg-steel-blue border shadow-lg rounded-xl flex flex-col justify-center items-center cursor-pointer hover:text-background-light" title="Total Productos">
                            <i className="fa-solid fa-boxes-stacked text-5xl text-background-light"></i>
                            <span className="mt-4 text-xl text-background-light">{productos.length}</span>
                        </Link>
                        <Link to="/ventas" className="h-44 bg-slate-blue border shadow-lg rounded-xl flex flex-col justify-center items-center cursor-pointer hover:text-background-light" title="Total Ventas">
                            <i className="fa-solid fa-cash-register text-5xl text-background-light"></i>
                            <span className="mt-4 text-xl text-background-light">  ${total}</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-3 border my-6 shadow-lg rounded-lg p-4 shadow-sky-blue overflow-hidden bg-background-light">
                            <div className="relative overflow-y-auto h-[300px]">
                                <table className="table w-full">
                                    <thead className="text-background-light bg-bright-blue rounded-xl">
                                        <tr>
                                            <th className="py-2 border-b px-5 text-left font-bold  rounded-tl-xl">Nombres y apellidos</th>
                                            <th className="py-2 border-b px-5 text-left font-bold">Email</th>
                                            <th className="py-2 border-b px-5 text-left font-bold">Rol</th>
                                            <th className="py-2 border-b px-5 text-left font-bold">Telefono</th>
                                            <th className="py-2 border-b px-5 text-left font-bold" title="fecha creacion">F.creacion</th>
                                            <th className="py-2 border-b px-5 text-left font-bold  rounded-tr-xl">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-dark-charcoal">
                                        {users.map((user, i) => (
                                            <tr key={user._id}>
                                                <td className="border-b p-2">{user.nombre}</td>
                                                <td className="border-b p-2">{user.email}</td>
                                                <td className="border-b p-2">{user.role.nombre}</td>
                                                <td className="border-b p-2">{user.telefono}</td>
                                                <td className="border-b p-2">{formatear_fecha(user.fechaRegistro)}</td>
                                                <td className="border-b p-2 text-center">
                                                    {user.estado ?
                                                        <span className="rounded-full p-1 text-background-light bg-earthy-green">activo</span> :
                                                        <span className="rounded-full p-1 text-background-light bg-dusty-red">inactivo</span>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default DashBoard