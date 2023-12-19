// ui/RegistrationForm.jsx
import React, { useState } from "react";
import "../../Styles/RegistrationForm.css";
import { ToastContainer, toast } from "react-toastify";

export const RegistrationForm = ({ onRegister, onCancelRegistration  }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    onRegister(username, password, confirmPassword);
  };

  const handleCancelRegistration = () => {
    onCancelRegistration();
  };

  return (
    <div>
      <ToastContainer />
      <div className="registration-form form">
      <div className="form-field">
        <label>Логин:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Повторите пароль:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Зарегистрироваться</button>
      <div className="button-spacing"></div>
      <button onClick={handleCancelRegistration}>Назад к входу</button>
    </div>
    </div>
    
  );
};

export default RegistrationForm;
