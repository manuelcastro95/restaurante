import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Label from '../../components/Label';
import Button from '../../components/Button';
import Swal from 'sweetalert2';
import ButtonLink from "../../components/ButtonLink";
import Layout from "../Layout";
import { useAuth } from "../../providers/AuthContext";

const Mesas = () => {
    const { userAuth,logout } = useAuth();
    
    const [mesas, setMesas] = useState([]);
    const [mesa, setMesa] = useState({});
    const [titulo, setTitulo] = useState('Agregar Mesa');
    const [textButton, setTextButton] = useState('Agregar');

    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('disponible');

    const [accion, setAccion] = useState('crear');
    const url = 'http://localhost:3005/v1/restaurante/mesas';

    const cargar_mesas = async () => {
        const data = await fetch(url)
            .then(res => res.json())
            .then(data => data);
        setMesas(data);
    };

    const update_mesa = async Mesa => {
        
        setMesa(Mesa);
        setTitulo('Actualizar información de la Mesa');
        setTextButton('Actualizar');
        setNombre(Mesa.nombre);
        setEstado(Mesa.estado);

        setAccion('actualizar');
    };

    const enviarDatos = async (e) => {
        e.preventDefault();
        let url_post = '';
        let method = 'POST';

        if (accion === 'crear') {
            url_post = `${url}/store`;
        } else if (accion === 'actualizar') {
            url_post = `${url}/editar/${mesa._id}`;
            method = 'PUT';
        }

        let datos = {
            nombre: nombre,
            estado: estado,
            idUserAuth: userAuth._id
        };

        fetch(url_post, {
            method: method,
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => {
                cargar_mesas();
                Swal.fire({
                    title: '',
                    text: `${response.mensaje}`,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                });
                limpiar_campos();
            });
    };

    const limpiar_campos = () => {
        setTitulo('Agregar Mesa');
        setTextButton('Agregar');
        setNombre('');
        setEstado('disponible');
        setAccion('crear');
    };

    useEffect(() => {
        cargar_mesas();
    }, []);

    return (
        <>
            <Layout menu_active="Mesas">
                <div className="p-4 w-full bg-background-light">
                    <h1 className="text-xl font-bold text-dark-charcoal mb-4">Gestión de Mesas</h1>

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
                                                <th className="py-2 border-b px-5 text-left font-bold">Estado</th>
                                                <th className="py-2 border-b px-5 text-left font-bold rounded-tr-xl">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-dark-charcoal">
                                            {mesas.map((mesa, i) =>
                                                <tr key={i}>
                                                    <td className="border-b p-2">{mesa.nombre}</td>
                                                    <td className="border-b p-2">
                                                        {mesa.estado === 'ocupada' ?
                                                            <span className="rounded-full p-1 text-background-light bg-earthy-green">Ocupada</span> :
                                                            <span className="rounded-full p-1 text-background-light bg-dusty-red">Disponible</span>
                                                        }
                                                    </td>
                                                    <td className="border-b p-2">
                                                        <Button
                                                            title="editar mesa"
                                                            type="button"
                                                            onClick={() => update_mesa(mesa)}
                                                            color="blue"
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i>
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
                            <form onSubmit={enviarDatos} className="bg-white rounded-xl px-8 pt-6 pb-8 mb-4">
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
                                    <Label> Estado </Label>
                                    <Input
                                        value={estado}
                                        type="text"
                                        id="estado"
                                        onChange={(e) => setEstado(e.target.value)}
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
    );
}

export default Mesas;
