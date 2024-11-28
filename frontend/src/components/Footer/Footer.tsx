import { useNavigate } from "react-router-dom";
import "./Footer.css";

export default function Footer(): JSX.Element {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/login");
  };

  return (
    <footer>
      © 2024 Назва компанії. Всі права захищені.{" "}
      <span className="admin-text" onClick={handleClick}>
        {" "}
        Я адміністратор
      </span>
    </footer>
  );
}
