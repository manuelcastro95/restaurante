import logo from '../assets/img/logo.png'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'
import { useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function Login({ callback }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const url = 'http://localhost:3005/v1/restaurante/auth/login';
  const goTo = useNavigate();

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
      .catch((error) => console.error('Error:', error))
      .then(res => {
        

        if (res.rol == "administrador") {
          callback(res);
          goTo("/administrador");
        } else if (res.rol == "mesero") {
          callback(res);
          goTo("/mesero");
        } else if (res.rol == "cocina") {
          callback(res);
          goTo("/cocina");
        }
      });

      
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto w-64"
          src={logo}
          alt=" Saborear Express"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={ingresar}>
          <div>
            <Label htmlFor="email"> Correo Electronico </Label>
            <div className="mt-2">
              <Input
                type="text"
                id="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password"> Contraseña </Label>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
            >
              Ingresar
            </Button>
          </div>
        </form>


      </div>
    </div>
  )
}


export default Login;