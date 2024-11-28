// import { useEffect, useState } from "react";
import FindBookForm from "../FindBookForm/FindBookForm";
import "./Header.css";

export default function Header(): JSX.Element {
  return (
    <>
      <header>
        <div className="find-container">
          <img
            src="/assets/images/library.png"
            alt="значок бібліотеки"
            className="big-logo"
          />
          <FindBookForm></FindBookForm>
        </div>
        <hr />
      </header>
    </>
  );
}
