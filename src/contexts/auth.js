import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext(); //Criando contexto para autenticação, para que todos os componentes tenham acesso a ele

function AuthProvider({ children }) {
  //Componente que irá prover o contexto de autenticação para todos os componentes
  const [user, setUser] = useState(null); //Estado para armazenar o usuário logado
  const [loadingAuth, setLoadingAuth] = useState(false); //Estado para verificar se está carregando a autenticação

  const navigate = useNavigate();

  function signIn(email, password) {
    //Logar user
  }

  //Cadastrar novo user
  async function signUp(email, password, name) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password).then(
      async (value) => {
        let uid = value.user.uid; //Pegando o uid do user logado

        await setDoc(doc(db, "users", uid), {
          //Criando um documento com o uid do user logado no banco de dados
          name: name,
          avatarUrl: null,
        })
          .then(() => {
            let data = {
              //Criando um objeto com os dados do user logado
              uid: uid,
              name: name,
              email: value.user.email,
              avatarUrl: null,
            };

            setUser(data); //Setando os dados do user no estado user para que todos os componentes tenham acesso
            storageUser(data); //Armazenando os dados do user no localStorage
            setLoadingAuth(false); //Setando o estado de carregamento para falso para que a tela de carregamento suma
            toast.success("Conta criada com sucesso!"); //Exibindo mensagem de sucesso
            navigate("/dashboard"); //Redirecionando para a página dashboard
          })
          .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
          });
      }
    );
  }

  function storageUser(data) {
    localStorage.setItem("@ticketsPRO", JSON.stringify(data)); //Armazenando os dados do user no localStorage
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, //Se tiver usuário logado, signed é true
        user,
        signIn,
        signUp,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
