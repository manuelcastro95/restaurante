
import { useNavigate } from 'react-router-dom';
import constructionImage from  '../assets/img/en_construccion.webp'

const InConstruction = () => {
    const navigate = useNavigate();
  
    return (
      <div className="font-poppins-light flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
          <div className="flex flex-row items-center justify-center w-full max-w-4xl p-4 bg-white shadow-xl rounded-lg">
              <div className="flex-1">
                  <img src={constructionImage} alt="In Construction" className="w-full h-auto max-w-md mx-auto rounded-2xl" />
              </div>
              <div className="flex-1 text-center p-3">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">Modulo En Construcción</h1>
                  <p className="text-lg md:text-xl mb-6">Estamos trabajando para mejorar esta sección. ¡Vuelve pronto!</p>
                  <button
                      onClick={() => navigate('/dashboard')}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  >
                      Volver al inicio
                  </button>
              </div>
          </div>
      </div>
    );
  }
  

export default InConstruction;
