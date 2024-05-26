import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { userState, useEffect, useState } from "react";
import Input from "../../components/Input"
import Label from '../../components/Label'
import Button from '../../components/Button'
import Swal from 'sweetalert2'
import ButtonLink from "../../components/ButtonLink";
import Layout from "../Layout";
import { useAuth } from "../../providers/AuthContext";

const Roles = () => {
    const { userAuth, logout } = useAuth();
    const [roles, setRoles] = useState([])
    const [role, setRole] = useState([])
    const [titulo, setTitulo] = useState('Agregar Rol')
    const [textButton, setTextButton] = useState('Agregar')

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    
    const [accion, setAccion] = useState('crear')
    const [estado, setEstado] = useState('text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900')

    const url = 'http://localhost:3005/v1/restaurante/roles';

    const cargar_roles = async () => {
        const data = await fetch(url)
            .then(res => res.json())
            .then(data => data)
        setRoles(data)
    }

    const update_role = async idRol => {
        const data = await fetch(`${url}/${idRol}`)
            .then(res => res.json())
            .then(data => data)

        setRole(data)
        setTitulo('Actualizar información Rol')
        setTextButton('Actualizar')
        setNombre(data.nombre)
        setDescripcion(data.descripcion)

        setAccion('actualizar')
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        let url_post = ''
        let method = 'POST'

        if (accion == 'crear') {
            url_post = `${url}/store`
        } else if (accion == 'actualizar') {
            url_post = `${url}/editar/${role._id}`
            method = 'PUT'
        }

        let datos = {
            nombre: nombre,
            descripcion: descripcion,
            idUserAuth: userAuth._id
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
                cargar_roles()
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
            'body': JSON.stringify({ estado: estado,idUserAuth: userAuth._id }),
            'headers': {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => {
                cargar_roles()
                Swal.fire({
                    title: '',
                    text: `${response.mensaje}`,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                })
            });
    }

    const limpiar_campos = () => {
        setTitulo('Agregar Rol')
        setTextButton('Agregar')
        setNombre('')
        setDescripcion('')
        setAccion('crear')
    }

    useEffect(() => {
        cargar_roles()
    }, [])

    return (
        <>
            <Layout menu_active="Roles">
                <div className="p-4 w-full bg-background-light">
                    <h1 className="text-xl font-bold text-dark-charcoal mb-4">Gestion Roles</h1>

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

                    <div className="my-9 grid grid-cols-3 gap-3">
                        <div className="overflow-x-auto col-span-2 shadow-md rounded-lg p-4 shadow-sky-blue overflow-hidden bg-background-light">
                            <div className="inline-block">
                                <div className="w-full relative overflow-y-auto h-[500px]">
                                    <table className="table w-full">
                                        <thead className="text-background-light bg-bright-blue rounded-xl">
                                            <tr>
                                                <th className="py-2 border-b px-5 text-left font-bold rounded-tl-xl">Nombre</th>
                                                <th className="py-2 border-b px-5 text-left font-bold">Descripcion</th>
                                                <th className="py-2 border-b px-5 text-left font-bold">Estado</th>
                                                <th className="py-2 border-b px-5 text-left font-bold rounded-tr-xl">acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-dark-charcoal">
                                            {roles.map((role, i) =>
                                                <tr key={i}>
                                                    <td className="border-b p-2">{role.nombre}</td>
                                                    <td className="border-b p-2">{role.descripcion}</td>
                                                    <td className="border-b p-2">
                                                        {role.estado ?
                                                            <span className="rounded-full p-1 text-background-light bg-earthy-green">activo</span> :
                                                            <span className="rounded-full p-1 text-background-light bg-dusty-red">inactivo</span>
                                                        }
                                                    </td>
                                                    <td className="border-b p-2">
                                                        <Button
                                                            title="editar rol"
                                                            type="button"
                                                            onClick={() => update_role(role._id)}
                                                            color="blue"
                                                        >
                                                            <i class="fa-solid fa-pen-to-square"></i>
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            onClick={() => changeStatus(role._id, role.estado)}
                                                            title="borrar rol"
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
                                    <Label> Nombre </Label>
                                    <Input
                                        value={nombre}
                                        type="text"
                                        id="nombre"
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className="mb-6">
                                    <Label> Descripcion </Label>
                                    <textarea 
                                        name=""
                                        rows="3"
                                        value={descripcion}
                                        type="text"
                                        id="descripcion"
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >

                                    </textarea>
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

export default Roles