import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import "../../Styles/LoginForm.css";

export const LoginForm = ({ onLogin, onShowRegistrationForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Войти</button>
          <p className="message">
            Не зарегистрированы?{" "}
            <a href="#" onClick={onShowRegistrationForm}>
              Создать аккаунт
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
