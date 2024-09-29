
import "./Navbar.scss";
import { useState } from "react";

export default function Navbar({ onMenuClick }) {
  const [searchInputFocus, setSearchInputFocus] = useState(false);
  return (
    <nav className="navbar">
      <div className="flex nav-row">
        <div className="flex-center icon-wrapper logo">
          {/* <SiBuildkite /> */}
        </div>
        <div className="flex column">
          
        </div>
        <div className="flex column">
          <div className="flex-center">
            The Qrcode Generator
          </div>
          <div className="flex-center menu-btn" onClick={onMenuClick}>
            Menu
          </div>
        </div>
      </div>
      <div className="flex nav-row">
        <div className="column flex tabs-container">
          
            <a
              href={"/users"}
              className={`tab ${"active gradient-text"}`}
            >
              Users
            </a>
        
        </div>
        <div className="column"></div>
      </div>
    </nav>
  );
}
