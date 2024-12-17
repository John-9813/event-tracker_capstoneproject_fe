import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p>&copy; 2024 Event Tracker. Tutti i diritti riservati.</p>
      <p>
        <a href="https://github.com/John-9813" target="_blank" rel="noopener noreferrer" className="text-white">
          GitHub
        </a> | 
        <a href="https://www.linkedin.com/in/john-oliver-2205aa247/" target="_blank" rel="noopener noreferrer" className="text-white">
          LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;

  