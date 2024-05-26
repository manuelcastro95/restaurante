import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import ButtonLink from "../../components/ButtonLink";


function CocinaPage({ user }) {
    // if (user.rol != "cocina" || !user) {
    //     return <Navigate to="/" />
    // }

    const [pedidos, setPedidos] = useState([])
    // const url_base = 'http://localhost:3005/v1/restaurante/pedidos/';
    const url_base = 'https://restaurante-endpoints.vercel.app/v1/restaurante/pedidos/';


    const cargar_pedidos = async () => {
        let data = await fetch(`${url_base}cocina`)
        .then(data => data.json())
        .then(res => res)

        setPedidos(data)
    }   

    const update_status = async (id) => {

        let data = {
            estado: "listo"
        }

        fetch(`${url_base}update-status/${id}`, {
            'method': 'PUT', 
            'body': JSON.stringify(data),
            'headers': {
            'Content-Type': 'application/json'
        }})
        .then((res) => res.json())
        .catch((error) => console.error('Error:', error))
        .then((response) => {
            Swal.fire({
                title: '',
                text: `${response.mensaje}`,
                icon: 'success',
                confirmButtonText: 'Cerrar'
            })
            cargar_pedidos()
        });
    }

    useEffect(() => {
        cargar_pedidos();
    },[])

    return (
        <div className="max-w-7xl rounded overflow-hidden shadow-lg mx-10 my-7">
            <h1 className="font-bold text-xl mb-2 my-3 ml-5">Cocina</h1>
            <div className="flex justify-end px-9">
                <ButtonLink color="red" ruta="/">
                    Salir
                    <i className=" ml-2 fa-solid fa-right-from-bracket"></i>
                </ButtonLink>
            </div>
            

            <div className="container  mx-12">
                <table className="w-11/12 my-4 bg-white shadow-md rounded-xl">
                    <thead>
                        <tr className="bg-blue-gray-100 text-gray-700">
                            <th className="py-3 px-4 text-center">Mesa</th>
                            <th className="py-3 px-4 text-left">Detalle pedido</th>
                            <th className="py-3 px-4 text-left">Estado</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-blue-gray-900">
                        {pedidos.map((pedido, i) =>
                            <tr key={i} className="border-b border-blue-gray-200">
                                <td className=" text-center">{pedido.mesa}</td>
                                <td className="py-2">
                                    {pedido.detallesPedido.map(detalle => 
                                        <li>{detalle.cantidad} {detalle.nombre}</li>
                                    )}
                                </td>
                                <td className="">{pedido.estado}</td>
                                <td className="text-center">
                                    <button
                                        title="Pedido Listo"
                                        type="button"
                                        onClick={() => update_status(pedido.id)}
                                        className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-500"
                                    >
                                        <i className="fa-solid fa-list-check"></i>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CocinaPage;