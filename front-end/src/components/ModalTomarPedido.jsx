import React, { useEffect, useState } from 'react';
import SelectBusqueda from './SelectBusqueda';
import Swal from 'sweetalert2';

const ModalTomarPedido = ({ isOpen, toggleModal, options, productos, mesaSeleccionada, mesero }) => {
    const [optionSeleccionado, setOptionSeleccionado] = useState(null);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [total, setTotal] = useState(0);

    const url_base = 'http://localhost:3005/v1/restaurante/pedidos/';



    useEffect(() => {
        const subTotal = calcularSubtotal();
        setTotal(subTotal);
    }, [productosSeleccionados]);

    const obtenerProductoSeleccionado = (optionSeleccionado) => {
        setOptionSeleccionado(optionSeleccionado);
    };

    const guardarProductosSeleccionados = () => {
        const productoSeleccionado = productos.find(p => p.id === optionSeleccionado.value);
        let validarProductoIndex = productosSeleccionados.findIndex(vp => vp.id === productoSeleccionado.id);

        if (validarProductoIndex !== -1) {
            let productosSeleccionadosActualizados = [...productosSeleccionados];
            productosSeleccionadosActualizados[validarProductoIndex].cantidad += 1;
            setProductosSeleccionados(productosSeleccionadosActualizados);
        } else {
            productoSeleccionado.cantidad = 1;
            setProductosSeleccionados(prevProductos => [...prevProductos, productoSeleccionado]);
        }
    };

    const reducirCantidadProducto = (idProducto) => {
        const productoIndex = productosSeleccionados.findIndex(p => p.id === idProducto);

        if (productoIndex !== -1) {
            const productosSeleccionadosActualizados = [...productosSeleccionados];
            if (productosSeleccionadosActualizados[productoIndex].cantidad > 1) {
                productosSeleccionadosActualizados[productoIndex].cantidad -= 1;
                setProductosSeleccionados(productosSeleccionadosActualizados);
            } else {
                productosSeleccionadosActualizados.splice(productoIndex, 1);
                setProductosSeleccionados(productosSeleccionadosActualizados);
            }
        }
    };

    const calcularSubtotal = () => {
        let subTotal = 0;
        productosSeleccionados.forEach(p =>
            subTotal += (p.precio * p.cantidad)
        );
        return subTotal;
    };

    const enviarPedido = async () => {
        // obtener fecha actual
        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString('es-ES')

        let data = {
            idUsuario: mesero.id,
            fechaPedido: fechaFormateada,
            estado: "procesando",
            total: total,
            mesa: mesaSeleccionada,
            detallesPedido: productosSeleccionados
        }

        fetch(`${url_base}store`, {
            'method': 'POST',
            'body': JSON.stringify(data),
            'headers': {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => {
                Swal.fire({
                    title: '',
                    text: `${response.mensaje}`,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                })
                limpiar()
            });

    }

    const limpiar = () => { 
        setProductosSeleccionados([])
        setOptionSeleccionado(null)
        setTotal(0)
    }

    if (!isOpen) return null;

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-2xl h-full flex flex-col justify-center">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-full">
                    <div className="flex items-center justify-between  md:p-5 border-b rounded-t dark:border-gray-600">
                        <h5 className="text-xl font-medium leading-normal text-surface dark:text-white" id="exampleModalScrollableLabel">
                            Tomar pedido Mesa #{mesaSeleccionada}
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
                            <span className="sr-only">Cerrar Modal</span>
                        </button>
                    </div>

                    <div className="md:p-7 h-4/6 overflow-y-auto">
                        <div className="flex flex-col-2 mb-6">
                            <div className='w-96'>
                                <SelectBusqueda
                                    options={options}
                                    optionSeleccionado={optionSeleccionado}
                                    obtenerProductoSeleccionado={obtenerProductoSeleccionado}
                                    placeholder="Buscar producto"
                                />
                            </div>

                            <button
                                className='ml-2 w-32 h-10 px-0 py-0 text-white bg-blue-800 hover:bg-blue-600 active:bg-blue-500 focus:outline-none focus:ring-blue-600 rounded-xl'
                                onClick={guardarProductosSeleccionados}
                            >
                                Agregar
                                <i className="ml-2 fa-solid fa-cart-plus"></i>
                            </button>
                        </div>

                        <p> Productos</p>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-x-hidden">
                                        <table
                                            className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                                            <thead
                                                className="border-b border-neutral-200 font-medium dark:border-white/10">
                                                <tr>
                                                    <th scope="col" className="px-6 py-2">Producto</th>
                                                    <th scope="col" className="px-6 py-2">Precio</th>
                                                    <th scope="col" className="px-6 py-2">Cantidad</th>
                                                    <th scope="col" className="px-6 py-2">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productosSeleccionados.map((ps, i) =>
                                                    <tr key={i} className="border-b border-neutral-200 dark:border-white/10">
                                                        <td className="whitespace-nowrap px-6 py-2">{ps.nombre}</td>
                                                        <td className="whitespace-nowrap px-6 py-2">{ps.precio}</td>
                                                        <td className="whitespace-nowrap px-6 py-2">{ps.cantidad}</td>
                                                        <td className="whitespace-nowrap px-6 py-2">
                                                            <button
                                                                className="text-red-600 hover:text-red-800 focus:outline-none"
                                                                onClick={() => reducirCantidadProducto(ps.id)}
                                                                title='reducir cantidad de producto'
                                                            >
                                                                <i className="fa-regular fa-rectangle-xmark"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )}
                                                <tr className="border-b border-neutral-200 dark:border-white/10">
                                                    <td colSpan="3" className="whitespace-nowrap px-6 py-2 text-right">
                                                        Subtotal
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-2">{total}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-shrink-0 items-center justify-end'>
                                <button
                                    className="mt-3 w-36 h-10 px-0 py-0 text-white bg-red-700 hover:bg-red-600 active:bg-red-500 focus:outline-none focus:ring-red-600 rounded-xl"
                                    onClick={enviarPedido}
                                >
                                    Enviar Pedido
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
                        <button
                            onClick={toggleModal}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalTomarPedido;
