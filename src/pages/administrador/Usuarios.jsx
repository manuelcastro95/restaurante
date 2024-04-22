import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { userState, useEffect, useState } from "react";
import Input from "../../components/Input"
import Label from '../../components/Label'
import Button from '../../components/Button'
import Swal from 'sweetalert2'
import ButtonLink from "../../components/ButtonLink";
import Layout from "../Layout";

const Usuarios = () => {
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [user, setUser] = useState([])
    const [titulo, setTitulo] = useState('Agregar Usuario')
    const [textButton, setTextButton] = useState('Agregar')

    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [rol, setRol] = useState('')
    const [email, setEmail] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [accion, setAccion] = useState('crear')
    const [estado, setEstado] = useState('text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900')

    const url = 'http://localhost:3005/v1/restaurante/users';

    const cargar_users = async () => {
        const data = await fetch(url)
            .then(res => res.json())
            .then(data => data)
        setUsers(data)
    }

    const cargar_roles = async () => {
        const data = await fetch('http://localhost:3005/v1/restaurante/roles')
            .then(res => res.json())
            .then(data => data)
        setRoles(data)
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
        setRol(data.role)
        setEmail(data.email)

        setAccion('actualizar')
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        let url_post = ''
        let method = 'POST'

        if (accion == 'crear') {
            url_post = `${url}/store`
        } else if (accion == 'actualizar') {
            url_post = `${url}/editar/${user._id}`
            method = 'PUT'
        }

        let datos = {
            nombre: nombres,
            apellido: apellidos,
            roleId: rol,
            email: email,
            password: contraseña
        }

        fetch(url_post, {
            'method': method,
            'body': JSON.stringify(datos),
            'headers': {
                'Content-Type': 'application/json'
            }
        })
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

    const changeStatus = async (id, status) => {

        let estado = status == 1 ? 0 : 1;
        fetch(`${url}/update-status/${id}`, {
            'method': 'PUT',
            'body': JSON.stringify({ estado: estado }),
            'headers': {
                'Content-Type': 'application/json'
            }
        })
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
        setRol(0)
        setEmail('')
        setContraseña('')
        setAccion('crear')
    }

    useEffect(() => {
        cargar_users()
        cargar_roles()
    }, [])

    return (
        <>
            <Layout menu_active="Usuarios">
                <div className="p-4 w-full bg-background-light">
                    <h1 className="text-xl font-bold text-dark-charcoal mb-4">Gestion Usuarios</h1>

                    <div className="flex justify-end px-9">
                        <ButtonLink color="light-gray" ruta="/dashboard">
                            <i className="mr-2 fa-solid fa-angles-left"></i>
                            Regresar
                        </ButtonLink>
                        <ButtonLink color="red" ruta="/">
                            Salir
                            <i className=" ml-2 fa-solid fa-right-from-bracket"></i>
                        </ButtonLink>
                    </div>

                    <div className="my-9 grid grid-cols-3 gap-3">
                        <div className="overflow-x-auto col-span-2 shadow-md rounded-lg p-4 shadow-sky-blue overflow-hidden bg-background-light">
                            <div className="inline-block">
                                <div className="w-full relative overflow-y-auto h-[500px]">
                                    <table className="table w-full">
                                        <thead className="text-background-light bg-bright-blue rounded-xl">
                                            <tr>
                                                <th className="py-2 border-b px-5 text-left font-bold rounded-tl-xl">Nombres y apellidos</th>
                                                <th className="py-2 border-b px-5 text-left font-bold">Email</th>
                                                <th className="py-2 border-b px-5 text-left font-bold">Rol</th>
                                                <th className="py-2 border-b px-5 text-left font-bold">Estado</th>
                                                <th className="py-2 border-b px-5 text-left font-bold rounded-tr-xl">acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-dark-charcoal">
                                            {users.map((user, i) =>
                                                <tr key={i}>
                                                    <td className="border-b p-2">{user.nombre}  {user.apellido}</td>
                                                    <td className="border-b p-2">{user.email}</td>
                                                    <td className="border-b p-2">{user.role.nombre}</td>
                                                    <td className="border-b p-2">
                                                        {user.estado ?
                                                            <span className="rounded-full p-1 text-background-light bg-earthy-green">activo</span> :
                                                            <span className="rounded-full p-1 text-background-light bg-dusty-red">inactivo</span>
                                                        }
                                                    </td>
                                                    <td className="border-b p-2">
                                                        <Button
                                                            title="editar usuario"
                                                            type="button"
                                                            onClick={() => update_user(user._id)}
                                                            color="blue"
                                                        >
                                                            <i className="fa-solid fa-user-pen"></i>
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            onClick={() => changeStatus(user._id, user.estado)}
                                                            title="borrar usuario"
                                                            color="red"
                                                        >
                                                            <i className="fa-solid fa-trash-can"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="shadow-md rounded-lg shadow-sky-blue overflow-hidden bg-background-light p-2">
                            <form onSubmit={enviarDatos} className="bg-white  rounded-xl px-8 pt-6 pb-8 mb-4">
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

                                    <select 
                                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="rol"
                                        value={rol}
                                        onChange={(e) => setRol(e.target.value)}
                                    >
                                        <option value="0">Seleccione un rol</option>
                                        {roles.map(role => 
                                            <option key={role._id} value={role._id}>{role.nombre}</option>
                                        )}
                                    </select>
                                    
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
                                    <Button
                                        type="submit"
                                        color="blue"
                                        properties="w-full"
                                    >
                                        {textButton}
                                        <i className="ml-2 fa-solid fa-floppy-disk"></i>
                                    </Button>
                                </div>
                            </form>
                            <div className="flex items-center justify-between">
                                <Button
                                    type="button"
                                    onClick={limpiar_campos}
                                    color="slate"
                                    properties="w-full"
                                >
                                    Limpiar Campos
                                    <i className="ml-2 fa-solid fa-eraser"></i>
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>


            </Layout>
        </>



    )
}

export default Usuarios