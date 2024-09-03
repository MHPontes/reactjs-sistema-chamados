import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function Private({ children }) {
    const { signed, loading } = useContext(AuthContext);   //Pegando o estado de autenticação do contexto de autenticação loading e signed (se está logado ou não) 

    if (loading) {    //Se estiver carregando a página
        return <h1>Carregando...</h1>;    //Retorna uma mensagem de carregamento
    }

    if (!signed) {    //Se não estiver logado
        return <Navigate to="/" />;    //Redireciona para a página de login
    }
    return children;
}