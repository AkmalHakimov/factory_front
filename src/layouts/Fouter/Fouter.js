import React from "react";
import "../../layouts/Fouter/Fouter.scss"
import { current } from "@reduxjs/toolkit";

export default function Fouter() {

  return (
    <footer className="footer">
      <section className="section-footer">
        <p>© {new Date().getFullYear()} khakimovv.uz</p>
      </section>
    </footer>
  );
}
