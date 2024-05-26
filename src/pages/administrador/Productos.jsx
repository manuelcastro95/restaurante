import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Swal from 'sweetalert2'
import ButtonLink from '../../components/ButtonLink';
import Layout from '../Layout';
import { useAuth } from "../../providers/AuthContext";
const Productos = () => {

  const { userAuth, logout } = useAuth();
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [producto, setProducto] = useState([])
  const [titulo, setTitulo] = useState('Agregar Producto')
  const [textButton, setTextButton] = useState('Agregar')
  const [accion, setAccion] = useState('crear')
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState("")
  const [estado, setEstado] = useState("text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900")
  const [categoria, setCategoria] = useState("")

  // const url_base = 'http://localhost:3005/v1/restaurante/productos/';
  const url_base = 'https://restaurante-endpoints.vercel.app/v1/restaurante/productos/';

  const cargar_productos = async () => {
    let data = await fetch(url_base)
      .then(data => data.json())
      .then(res => res)

    setProductos(data)
  }

  const cargar_categorias = async () => {
    // let data = await fetch(`http://localhost:3005/v1/restaurante/categorias`)
    let data = await fetch(`https://restaurante-endpoints.vercel.app/v1/restaurante/categorias`)
      .then(data => data.json())
      .then(res => res)

    setCategorias(data)
  }

  const enviarDatos = async (e) => {
    e.preventDefault();
    let url_post = ''
    let method = 'POST'

    if (accion == 'crear') {
      url_post = `${url_base}/store`
    } else if (accion == 'actualizar') {
      url_post = `${url_base}/editar/${producto._id}`
      method = 'PUT'
    }

    let datos = {
      nombre: nombre,
      precio: precio,
      categoriaId: categoria,
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
      'body': JSON.stringify({ estado: estado }),
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
    cargar_categorias();
  }, [])

  return (
    <>
      <Layout menu_active="Productos">

        <div className="p-4 w-full bg-background-light">
          <h1 className="text-xl font-bold text-dark-charcoal mb-4">Gestion Productos</h1>

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
            <div className="overflow-x-auto col-span-2 shadow-md rounded-lg p-4 shadow-steel-blue overflow-hidden bg-background-light">
              <div className="inline-block">
                <div className="w-full relative overflow-y-auto h-[500px]">
                  <table className="w-full ">
                    <thead className="text-background-light bg-steel-blue rounded-xl">
                      <tr >
                        <th className="py-2 border-b px-5 text-left font-bold rounded-tl-xl">nombre</th>
                        <th className="py-2 border-b px-5 text-left font-bold">precio</th>
                        <th className="py-2 border-b px-5 text-left font-bold">categoria</th>
                        <th className="py-2 border-b px-5 text-left font-bold rounded-tr-xl">acciones</th>
                      </tr>
                    </thead>
                    <tbody className="text-dark-charcoal">
                      {productos.map((producto, i) =>
                        <tr key={i} className="border-b border-blue-gray-200">
                          <td className="border-b p-2">{producto.nombre}  </td>
                          <td className="border-b p-2">${producto.precio}</td>
                          <td className="border-b p-2">{producto.categoria.nombre}</td>
                          <td className="border-b p-2">
                            <Button
                              title="editar producto"
                              type="button"
                              onClick={() => update_producto(producto._id)}
                              color="blue"
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </Button>
                            <Button
                              type="button"
                              color="red"
                              onClick={() => changeStatus(producto._id, producto.estado)}
                              title="eliminar producto"
                            >

                              <i className="fa-regular fa-trash-can"></i>
                            </Button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="shadow-md rounded-lg shadow-steel-blue overflow-hidden bg-background-light p-2">
              <form onSubmit={enviarDatos} className="rounded px-8 pt-6 pb-8 mb-4">
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

                  <select
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="0">Seleccione una categoria </option>
                    {categorias.map(categoria =>
                      <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                    )}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <Button type="submit" color="blue" properties="w-full" >
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


export default Productos