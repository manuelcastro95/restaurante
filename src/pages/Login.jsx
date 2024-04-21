import logo from '../assets/img/logo.png'
import fondo_login from '../assets/img/fondo_login.png'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'
import { useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext';

function Login({ callback }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = 'http://localhost:3005/v1/restaurante/auth/login';
  const goTo = useNavigate();
  const { login } = useAuth();

  const ingresar = e => {
    e.preventDefault();

    fetch(url, {
      'method': 'POST',
      'body': JSON.stringify({ email: email, password: password }),
      'headers': {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: error.toString(),
        });
      })
      .then(res => {

        login(res)
        const redirectRoute = res.rol === "administrador" ? "/dashboard" :
          res.rol === "mesero" ? "/mesero" : "/cocina";
        goTo(redirectRoute)

        Swal.fire({
          title: '',
          text: `Bienvenido ${res.nombre}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        })
      });


  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 font-nunito">
  <div className='w-full md:h-screen md:col-span-2 bg-soft-cream'>
    <img
      src={fondo_login}
      alt="fondo login"
      className='object-cover h-full w-full' // Asegúrate de que la imagen cubra el espacio disponible
    />
  </div>

  <div className='w-full h-full md:h-screen p-2 bg-background-light grid place-items-center'>
    <form className="w-full px-8" onSubmit={ingresar}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <img
          className="mx-auto w-64"
          src={logo}
          alt="Saborear Express"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-dark-charcoal">Correo Electrónico</Label>
        <div className="">
          <Input
            type="text"
            id="email"
            name="email"
            required
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mt-3">
          <Label htmlFor="password" className="text-dark-charcoal">Contraseña</Label>
        </div>
        <div className="">
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full mt-6 bg-dusty-red hover:bg-dusty-red-dark text-white border border-dusty-red hover:border-dusty-red-dark focus:ring-4 focus:outline-none focus:ring-dusty-red-light font-medium rounded-lg text-sm px-2 py-1 text-center"
        >
          Ingresar
          <i className="ml-2 fa-solid fa-user-lock"></i>
        </Button>
      </div>
    </form>
  </div>
</div>

  )
}


export default Login;