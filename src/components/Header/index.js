import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import avatarImg from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import "./header.css";

import { FiHome, FiUser, FiSettings } from "react-icons/fi";

export default function Header() {
  const { user } = useContext(AuthContext); //Pegando o user do contexto de autenticação, iremos usar para verificar se o usuario possui foto de perfil

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
          alt="Foto de perfil"
        />{" "}
        {/*Verificando se o user tem foto de perfil, se não tiver irá mostrar a foto padrão*/}
      </div>
      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Chamados
      </Link>
      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        Clientes
      </Link>
      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        Perfil
      </Link>
    </div>
  );
}
