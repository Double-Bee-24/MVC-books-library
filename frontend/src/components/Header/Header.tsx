// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FindBookForm from "../FindBookForm/FindBookForm";
import "./Header.css";

export default function Header(): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="find-container">
          <img
            src="/assets/images/library.png"
            alt="значок бібліотеки"
            className="big-logo"
            onClick={() => navigate("/")}
          />
          <FindBookForm></FindBookForm>
        </div>
        <hr />
      </header>
    </>
  );
}
