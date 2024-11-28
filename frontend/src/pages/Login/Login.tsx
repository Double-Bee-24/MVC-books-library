import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import "./Login.css";

export default function Login(): JSX.Element {
  const [formData, setFormData] = useState({ login: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginStatus = await login(formData);
    if (loginStatus === "success") {
      navigate("/admin");
    }
  };

  return (
    <div className="login-container">
      <h1>Вхід</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="login"
          name="login"
          value={formData.login}
          onChange={handleChange}
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="auth-input"
        />
        <button className="register-button">увійти</button>
      </form>
    </div>
  );
}
