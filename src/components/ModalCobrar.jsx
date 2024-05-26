import { useState } from "react";
import SelectBusqueda from "./SelectBusqueda";
import Label from "./Label";
import Input from "./Input";
import Swal from "sweetalert2";
const ModalCobrar = ({ isOpen, toggleModal, options, pedidoSeleccionado }) => {

    const [optionSeleccionado, setOptionSeleccionado] = useState(null);
    const [total, setTotal] = useState('')
    // const url_base = 'http://localhost:3005/v1/restaurante/';
    const url_base = 'https://restaurante-endpoints.vercel.app/v1/restaurante/';

    const obtenerMetodoSeleccionado = (optionSeleccionado) => {
        setOptionSeleccionado(optionSeleccionado);
    };

    const generarVenta = async () => {
        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString('es-ES')

        let data = {
            fechaVenta: fechaFormateada,
            total: pedidoSeleccionado.total,
            metodoPago: optionSeleccionado.value,
        }

        fetch(`${url_base}ventas/registrar-venta`, {
            'method': 'POST', 
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

        });

        //actualizar estado del pedido a pagado
        fetch(`${url_base}pedidos/update-status/${pedidoSeleccionado.id}`, {
            'method': 'PUT', 
            'body': JSON.stringify({estado: 'pagado'}),
            'headers': {
            'Content-Type': 'application/json'
        }})
        .then((res) => res.json())
        .catch((error) => console.error('Error:', error))
        .then((response) => {
            toggleModal()
        });


    }
    
    if (!isOpen) return null;

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-xl flex flex-col justify-center">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-full">
                    <div className="flex items-center justify-between  md:p-5 border-b rounded-t dark:border-gray-600">
                        <h5 className="text-xl font-medium leading-normal text-surface dark:text-white" id="exampleModalScrollableLabel">
                            Cobrar Mesa #
                        </h5>
                        <button
                            onClick={toggleModal}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Cerral Modal</span>
                        </button>
                    </div>

                    <div className="md:p-7 h-4/6  overflow-y-auto">
                        <div className='w-full'>
                            <SelectBusqueda
                                options={options}
                                optionSeleccionado={optionSeleccionado}
                                obtenerProductoSeleccionado={obtenerMetodoSeleccionado}
                                placeholder="Seleccione metodo pago"
                            />
                        </div>
                        <div className="mt-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password"> Total $</Label>
                            </div>
                            <div className="mt-2">
                                <Input
                                    value={pedidoSeleccionado.total}
                                    id="total"
                                    name="total"
                                    type="text"
                                    onChange={(e) => setTotal(e.target.value)}
                                />
                            </div>


                        </div>
                        <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">

                            <button
                                className="mt-1 mr-2 w-36 h-10 px-0 py-0 text-white bg-red-700 hover:bg-red-600 active:bg-red-500 focus:outline-none focus:ring-red-600 rounded-xl"
                                onClick={generarVenta}
                            >
                                Cobrar
                            </button>
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ModalCobrar