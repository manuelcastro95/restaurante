import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Swal from 'sweetalert2'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [producto, setProducto] = useState([])
  const [titulo, setTitulo] = useState('Agregar Producto')
  const [textButton, setTextButton] = useState('Agregar')
  const [accion, setAccion] = useState('crear')
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [estado, setEstado] = useState("text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900")
  const [categoria, setCategoria] = useState("")

  const url_base = 'http://localhost:3005/v1/restaurante/productos/';

  const cargar_productos = async () => {
    let data = await fetch(`${url_base}`)
      .then(data => data.json())
      .then(res => res)

    setProductos(data)
  }

  const enviarDatos = async (e) => {
    e.preventDefault();
    let url_post = ''
    let method = 'POST'

    if (accion == 'crear') {
      url_post = `${url_base}/store`
    } else if (accion == 'actualizar') {
      url_post = `${url_base}/editar/${producto.id}`
      method = 'PUT'
    }

    let datos = {
      nombre: nombre,
      precio: precio,
      categoria: categoria
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
        cargar_productos()
        Swal.fire({
          title: '',
          text: `${response.mensaje}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        })
        limpiar_campos();
      });
  }

  const update_producto = async (id) => {
    const data = await fetch(`${url_base}${id}`)
      .then(res => res.json())
      .then(data => data)

    setProducto(data)
    setTitulo('Actualizar información Producto')
    setTextButton('Actualizar')
    setAccion('actualizar')

    setNombre(data.nombre)
    setPrecio(data.precio)
    setCategoria(data.categoria)
  }
  const changeStatus = async (id, status) => {
    let estado = status == 1 ? 0 : 1;
    fetch(`${url_base}update-status/${id}`, {
        'method': 'PUT', 
        'body': JSON.stringify({estado: estado}),
        'headers': {
        'Content-Type': 'application/json'
    }})
    .then((res) => res.json())
    .catch((error) => console.error('Error:', error))
    .then((response) => {
        cargar_productos()
        Swal.fire({
            title: '',
            text: `${response.mensaje}`,
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    });
  }


  const limpiar_campos = () => {
    setTitulo('Agregar Producto')
    setTextButton('Agregar')
    setAccion('crear')
    setNombre('')
    setPrecio('')
    setCategoria('')
  }

  useEffect(() => {
    cargar_productos();
  }, [])

  return (
    <div className="grid grid-cols-1 gap-2 max-w-7xl rounded overflow-hidden shadow-lg ml-5 mt-4">
      <h1 className="font-bold text-xl mb-2 my-3 ml-5">Productos</h1>

      <div className="ml-4 grid grid-cols-3 gap-3">
        <div className="overflow-x-auto  col-span-2 border-2 mx-auto">
          <div className="inline-block">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-xl">
                <thead>
                  <tr className="bg-blue-gray-100 text-gray-700">
                    <th className="py-3 px-4 text-left">nombre</th>
                    <th className="py-3 px-4 text-left">precio</th>
                    <th className="py-3 px-4 text-left">categoria</th>
                    <th className="py-3 px-4 text-left">acciones</th>
                  </tr>
                </thead>
                <tbody className="text-blue-gray-900">
                  {productos.map((producto, i) =>
                    <tr key={i} className="border-b border-blue-gray-200">
                      <td className="py-3 px-4">{producto.nombre}  </td>
                      <td className="py-3 px-4">${producto.precio}</td>
                      <td className="py-3 px-4">{producto.categoria}</td>
                      <td className="py-3 px-4">
                        <button
                          title="editar usuario"
                          type="button"
                          onClick={() => update_producto(producto.id)}
                          className=" text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-500"
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          type="button"
                          className={estado}
                          onClick={() => changeStatus(producto.id, producto.estado)}
                          title={producto.estado == 1 ? 'inactivar' : 'activar'}
                        >

                          <i className="fa-regular fa-trash-can"></i>
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
                <Label> Nombre  </Label>
                <Input
                  value={nombre}
                  type="text"
                  id="nombre"
                  name="nombre"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label> Precio  </Label>
                <Input
                  value={precio}
                  type="text"
                  id="precio"
                  name="precio"
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label> Categoria  </Label>
                <Input
                  value={categoria}
                  type="text"
                  id="categoria"
                  name="categoria"
                  onChange={(e) => setCategoria(e.target.value)}
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
            <div className="flex items-center justify-between">
              <Link
                to='/administrador'
                type="button"
                className="mt-3 flex w-full justify-center rounded-md bg-slate-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Regresar
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}


export default Productos