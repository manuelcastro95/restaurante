import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { userState, useEffect, useState } from "react";
import Input from "../components/Input"
import Label from '../components/Label'
import Button from '../components/Button'

const Usuarios = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [titulo, setTitulo] = useState('Agregar Usuario')
    const [textButton, setTextButton] = useState('Agregar')

    const url = 'http://localhost:3005/v1/restaurante/users';

    const cargar_users = async () => {
        const data = await fetch(url)
            .then(res => res.json())
            .then(data => data)
        setUsers(data)
    }

    const update_user = async id => {
        const data = await fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(data => data)
        setUser(data)
        setTitulo('Actualizar información Usuario')
        setTextButton('Actualizar')
        console.log(user)

    }

    useEffect(() => {
        cargar_users()
    }, [])

    return (
        <div className="grid grid-cols-1 gap-2 max-w-7xl rounded overflow-hidden shadow-lg ml-5 mt-4">
            <h1 className="font-bold text-xl mb-2 my-3 ml-5">Usuarios</h1>

            <div className="ml-4 grid grid-cols-3 gap-3">
                <div className="overflow-x-auto  col-span-2 border-2 mx-auto">
                    <div className="inline-block">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-xl">
                                <thead>
                                    <tr className="bg-blue-gray-100 text-gray-700">
                                        <th className="py-3 px-4 text-left">Nombres y apellido</th>
                                        <th className="py-3 px-4 text-left">Email</th>
                                        <th className="py-3 px-4 text-left">Rol</th>
                                        <th className="py-3 px-4 text-left">Estado</th>
                                        <th className="py-3 px-4 text-left">acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-blue-gray-900">
                                    {users.map((user) =>
                                        <tr key={user.idUsuario} className="border-b border-blue-gray-200">
                                            <td className="py-3 px-4">{user.nombre}  {user.apellido}</td>
                                            <td className="py-3 px-4">{user.email}</td>
                                            <td className="py-3 px-4">{user.rol}</td>
                                            <td className="py-3 px-4">{user.estado ? 'activo' : 'inactivo'}</td>
                                            <td className="py-3 px-4">
                                                <button
                                                    type="button"
                                                    onClick={() => update_user(user.idUsuario)}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    editar
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full max-w-xl max-h-xl mx-auto">
                        
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-3">
                                <h2 className="block text-xl font-si leading-6 text-gray-900">{titulo}</h2>
                            </div>
                                        
                            <div className="mb-4">
                                <Label> Nombres  </Label>
                                <Input
                                    type="text"
                                    id="nombre"
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Label> Apellidos </Label>
                                <Input
                                    type="text"
                                    id="email"
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Label> Rol </Label>
                                <Input
                                    type="text"
                                    id="email"
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Label> Email </Label>
                                <Input
                                    type="text"
                                    id="email"
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <Label> Contraseña </Label>
                                <Input
                                    type="text"
                                    id="email"
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                            <Button
                                type="button"
                            >
                                {textButton}
                            </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Usuarios