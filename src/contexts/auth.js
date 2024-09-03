import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext(); //Criando contexto para autenticação, para que todos os componentes tenham acesso a ele

function AuthProvider({ children }) {
  //Componente que irá prover o contexto de autenticação para todos os componentes
  const [user, setUser] = useState(null); //Estado para armazenar o usuário logado
  const [loadingAuth, setLoadingAuth] = useState(false); //Estado para verificar se está carregando a autenticação
  const [loading, setLoading] = useState(true); //Estado para verificar se está carregando a página

  const navigate = useNavigate();

  useEffect(() => {      //Função para verificar se tem usuário logado no localStorage ao carregar a página
    async function loadUser() {
      const storageUser = localStorage.getItem("@ticketsPRO"); //Pegando os dados do user no localStorage

      if (storageUser) {
        setUser(JSON.parse(storageUser)); //Setando os dados do user no estado user convertendo de string para objeto
        setLoading(false); //Setando o estado de carregamento para falso pois a página já carregou
      }

      setLoading(false);    //Setando o estado de carregamento para falso pois a página já carregou pois o if acima não foi executado
    }
    loadUser();
  }, []);

  async function signIn(email, password) {    //Função para logar o usuário no sistema 
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);    //Referência do documento do user logado
        const docSnap = await getDoc(docRef);    //Pegando o documento do user logado no banco de dados

        if (docSnap.exists()) {
          let data = {
            uid: uid,
            name: docSnap.data().name,
            email: value.user.email,
            avatarUrl: docSnap.data().avatarUrl,
          };

          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
          toast.success("Bem-vindo de volta!");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        toast.error("Ops, algo deu errado!");
      });
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

  async function logout() {
    await signOut(auth); //Função para fazer logout do usuário
    localStorage.removeItem("@ticketsPRO"); //Removendo os dados do user do localStorage
    setUser(null); //Setando o estado user para nulo
 
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, //Se tiver usuário logado, signed é true  !! = se tiver algo, retorne true
        user,
        signIn,
        signUp,
        logout,
        loadingAuth,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
