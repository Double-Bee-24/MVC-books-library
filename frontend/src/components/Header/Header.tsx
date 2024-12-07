// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FindBookForm from "../FindBookForm/FindBookForm";
import "./Header.css";
import React from "react";
import IBookPreview from "../../interfaces/IBookPreview";

interface IHeader {
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  setBooksData: React.Dispatch<React.SetStateAction<IBookPreview[]>>;
}

export default function Header({
  setIsSearchActive,
  setBooksData,
}: IHeader): JSX.Element {
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
          <FindBookForm
            setIsSearchActive={setIsSearchActive}
            setBooksData={setBooksData}
          ></FindBookForm>
        </div>
        <hr />
      </header>
    </>
  );
}
