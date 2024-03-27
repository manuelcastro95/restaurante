import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { userState, useEffect, useState } from "react";
import Input from "../components/Input"
import Label from '../components/Label'
import Button from '../components/Button'
import Swal from 'sweetalert2'

const Usuarios = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [titulo, setTitulo] = useState('Agregar Usuario')
    const [textButton, setTextButton] = useState('Agregar')
    
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [rol, setRol] = useState('')
    const [email, setEmail] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [accion, setAccion] = useState('crear')
    const [estado, setEstado] = useState('text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900')

    const url = 'http://localhost:3005/v1/restaurante/users';

    const cargar_users = async () => {
        const data = await fetch(url)
            .then(res => res.json())
            .then(data => data)
        setUsers(data)
    }

    const update_user = async idUsuario => {
        const data = await fetch(`${url}/${idUsuario}`)
            .then(res => res.json())
            .then(data => data)

        setUser(data)
        setTitulo('Actualizar información Usuario')
        setTextButton('Actualizar')
        setNombres(data.nombre)
        setApellidos(data.apellido)
        setRol(data.rol)
        setEmail(data.email)
        setContraseña(data.password)
        setAccion('actualizar')
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        let url_post = ''
        let method = 'POST'

        if(accion == 'crear'){
            url_post = `${url}/store`
        }else if(accion == 'actualizar'){
            url_post = `${url}/editar/${user.id}`
            method = 'PUT'
        }

        let datos = {
            nombre : nombres,
            apellido : apellidos,
            rol : rol,
            email : email,
            password : contraseña,
            estado: true
        }

        fetch(url_post, {
            'method': method, 
            'body': JSON.stringify(datos),
            'headers': {
            'Content-Type': 'application/json'
        }})
        .then((res) => res.json())
        .catch((error) => console.error('Error:', error))
        .then((response) => {
            cargar_users()
            Swal.fire({
                title: '',
                text: `${response.mensaje}`,
                icon: 'success',
                confirmButtonText: 'Cerrar'
            })
            limpiar_campos();
        });
    }

    const changeStatus = async (id,status) => {
        
        let estado = status == 1 ? 0 : 1;
        fetch(`${url}/update-status/${id}`, {
            'method': 'PUT', 
            'body': JSON.stringify({estado: estado}),
            'headers': {
            'Content-Type': 'application/json'
        }})
        .then((res) => res.json())
        .catch((error) => console.error('Error:', error))
        .then((response) => {
            cargar_users()
            Swal.fire({
                title: '',
                text: `${response.mensaje}`,
                icon: 'success',
                confirmButtonText: 'Cerrar'
            })
        });
    }

    const limpiar_campos = () => { 
        setTitulo('Agregar Usuario')
        setTextButton('Agregar')
        setNombres('')
        setApellidos('')
        setRol('')
        setEmail('')
        setContraseña('')
        setAccion('crear')
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
                                    {users.map((user,i) =>
                                        <tr key={i} className="border-b border-blue-gray-200">
                                            <td className="py-3 px-4">{user.nombre}  {user.apellido}</td>
                                            <td className="py-3 px-4">{user.email}</td>
                                            <td className="py-3 px-4">{user.rol}</td>
                                            <td className="py-3 px-4">
                                                {user.estado == 1 ? 'activo' : 'inactivo'}
                                            </td>
                                            <td className="py-3 px-4">
                                                <button
                                                    title="editar usuario"
                                                    type="button"
                                                    onClick={() => update_user(user.id)}
                                                    className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-500"
                                                >
                                                    <i className="fa-solid fa-user-pen"></i>
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className={estado}
                                                    onClick={() => changeStatus(user.id,user.estado)}
                                                    title={user.estado == 1 ? 'inactivar' : 'activar'}
                                                >

                                                    <i className="fa-solid fa-user-lock"></i>
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
                        
                        <form onSubmit={enviarDatos} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-3">
                                <h2 className="block text-xl font-si leading-6 text-gray-900">{titulo}</h2>
                            </div>
                                        
                            <div className="mb-4">
                                <Label> Nombres  </Label>
                                <Input
                                    value={nombres}
                                    type="text"
                                    id="nombres"
                                    name="name"
                                    onChange={(e) => setNombres(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <Label> Apellidos </Label>
                                <Input
                                    value={apellidos}
                                    type="text"
                                    id="apellidos"
                                    name="apellidos"
                                    onChange={(e) => setApellidos(e.target.value)} 
                                />
                            </div>
                            <div className="mb-6">
                                <Label> Rol </Label>
                                <Input
                                    value={rol}
                                    type="text"
                                    id="rol"
                                    name="rol"
                                    
                                    onChange={(e) => setRol(e.target.value)} 
                                />
                            </div>
                            <div className="mb-6">
                                <Label> Email </Label>
                                <Input
                                    value={email}
                                    type="text"
                                    id="email"
                                    name="email"
                                    
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                            <div className="mb-6">
                                <Label> Contraseña </Label>
                                <Input
                                    value={contraseña}
                                    type="text"
                                    id="contraseña"
                                    name="contraseña"
                                    
                                    onChange={(e) => setContraseña(e.target.value)} 
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Button type="submit" >
                                    {textButton}
                                </Button>
                            </div>
                        </form>
                        <div className="flex items-center justify-between">
                            <button 
                                type="button" 
                                onClick={limpiar_campos}
                                className="flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Limpiar Campos
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Usuarios