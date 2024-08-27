import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";

import AuthProvider from "./contexts/auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>     {/*Adicionando o contexto de autenticação em todas as paginas*/}
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
