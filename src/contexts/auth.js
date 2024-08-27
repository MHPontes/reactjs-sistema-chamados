import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();    //Criando contexto para autenticação, para que todos os componentes tenham acesso a ele

function AuthProvider({ children }) {
const [user, setUser] = useState(null);    //Estado para armazenar o usuário logado


return (
    <AuthContext.Provider value={{ 
        signed: !!user, //Se tiver usuário logado, signed é true
        user,
     }}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthProvider;