import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalTomarPedido from "../../components/ModalTomarPedido";
import ModalVerPedido from "../../components/ModalVerPedido";
import ModalCobrar from "../../components/ModalCobrar";
import ButtonLink from "../../components/ButtonLink";



const MeseroPage = ({ user }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenPedido, setModalOpenPedido] = useState(false);
    const [modalOpenCobrar, setModalOpenCobrar] = useState(false);

    const [optionsProductos, setOptionsProductos] = useState([])
    const [allProductos, setAllProductos] = useState([])
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null)
    const [mesas, setMesas] = useState([])
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState([])

    const arrayMesas = [
        { id: 1, nombre: 'Mesa #1' },
        { id: 2, nombre: 'Mesa #2' },
        { id: 3, nombre: 'Mesa #3' },
        { id: 4, nombre: 'Mesa #4' },
        { id: 5, nombre: 'Mesa #5' },
        { id: 6, nombre: 'Mesa #6' },
        { id: 7, nombre: 'Mesa #7' },
        { id: 8, nombre: 'Mesa #8' }
    ];

    const optionsMetodosPago = [
        { value: 3, label: 'Efectivo' },
        { value: 4, label: 'Transferencia' },
        { value: 1, label: 'Tarjeta credito' },
        { value: 2, label: 'Tarjeta debito' },
    ];

    const cargar_productos = async () => {
        let productos = await fetch(`http://localhost:3005/v1/restaurante/productos/`)
            .then(data => data.json())
            .then(res => res)

        let productosFormateados = []
        productos.forEach(producto => {
            productosFormateados.push({ value: producto.id, label: producto.nombre })
        })

        setAllProductos(productos)
        setOptionsProductos(productosFormateados)
    }
    const cargarMesas = () => {
        setMesas(arrayMesas)
    }

    // modales
    const toggleModalTomarPedido = (mesa) => {
        setMesaSeleccionada(mesa)
        setModalOpen(!modalOpen);
        cargar_productos();
    };

    const toggleModalVerPedido = () => {
        setModalOpenPedido(!modalOpenPedido);
    };
    const toggleModalCobrarPedido = (id) => {
        setModalOpenCobrar(!modalOpenCobrar);
        cobrarMesa(id)
    };


    const cobrarMesa = async (id) => {
        let pedido = await fetch(`http://localhost:3005/v1/restaurante/pedidos/${id}`)
            .then(data => data.json())
            .then(res => res)

        setPedidoSeleccionado(pedido)
    }

    useEffect(() => {
        cargarMesas()
    }, [])
    return (
        <div className="max-w-7xl rounded overflow-hidden shadow-lg mx-10 my-9">
            <h1 className="font-bold text-xl mb-2 my-3 ml-5">Mesero</h1>
            <div className="flex justify-end px-9">
                <ButtonLink color="red" ruta="/">
                    Salir
                    <i className=" ml-2 fa-solid fa-right-from-bracket"></i>
                </ButtonLink>
            </div>
            
            <div className="container mx-auto mt-10 px-4 my-9 ">
                <div className="grid md:grid-cols-4 md:gap-4 sm:grid-cols-1 sm:gap-2">

                    {/* Mesas */}
                    {mesas.map((mesa, i) =>
                        <div key={i} className="w-25 h-auto border bg-purple-200 rounded-md px-2 py-2 grid grid-cols-1 justify-items-center">
                            <span className="text-center font-mono text-xl mb-2">{mesa.nombre}</span>
                            <button
                                className="w-36 h-10 px-0 py-0 text-white bg-green-800 hover:bg-green-600 active:bg-green-500 focus:outline-none focus:ring-green-600 rounded-xl"
                                onClick={() => toggleModalTomarPedido(mesa.id)}
                            >
                                Tomar pedido
                            </button>
                            {/* <button
                                className="mt-3 w-36 h-10 px-0 py-0 text-white bg-amber-700 hover:bg-amber-600 active:bg-amber-500 focus:outline-none focus:ring-amber-600 rounded-xl"
                                onClick={() => toggleModalVerPedido(mesa.id)}
                            >
                                Ver pedido
                            </button> */}
                            <button
                                className="mt-3 w-36 h-10 px-0 py-0 text-white bg-red-700 hover:bg-red-600 active:bg-red-500 focus:outline-none focus:ring-red-600 rounded-xl"
                                onClick={() => toggleModalCobrarPedido(mesa.id)}
                            >
                                Cobrar
                            </button>
                            <ul className="font-mono text-lg mt-2">
                                {/* <li>Total: $56.99</li> */}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
            {/* Modales */}
            <ModalTomarPedido
                isOpen={modalOpen}
                toggleModal={toggleModalTomarPedido}
                options={optionsProductos}
                productos={allProductos}
                mesaSeleccionada={mesaSeleccionada}
                mesero={user}
            />
            <ModalVerPedido
                isOpen={modalOpenPedido}
                toggleModal={toggleModalVerPedido}
            />
            <ModalCobrar
                isOpen={modalOpenCobrar}
                toggleModal={toggleModalCobrarPedido}
                options={optionsMetodosPago}
                pedidoSeleccionado={pedidoSeleccionado}
            />
        </div>




    )
}

export default MeseroPage;