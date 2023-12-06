import "../Styles/LoginForm.css"

export const AuthForm = ({ children }) => (
  <div className="auth-form">
    <h1>Добро пожаловать в библиотеку!</h1>
    {children}
  </div>
);
