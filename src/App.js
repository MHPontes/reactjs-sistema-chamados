import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";

import AuthProvider from "./contexts/auth";
import { ToastContainer } from "react-toastify";    //Importando o toastify
import "react-toastify/dist/ReactToastify.css";      //Importando o css do toastify


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>     {/*Adicionando o contexto de autenticação em todas as paginas*/}
        <ToastContainer autoClose={3000} />    {/*Adicionando o toastify em todas as paginas*/}
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
