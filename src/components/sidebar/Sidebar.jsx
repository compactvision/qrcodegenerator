import "./Sidebar.scss";
import { Link } from "react-router-dom";


export default function Sidebar({ show, onClose }) {
  return (
    <>
      {show && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`flex sidebar ${show ? "show" : ""}`}>
        <div className="flex-center top">
          <div className="flex-center logo">
            <div className="flex-center icon-wrapper">
              <img src={""} alt="" />
            </div>
            <span>
              The <span className="gradient-text">QrCode</span> Generator
            </span>
          </div>
          <div
            className="flex-center icon-wrapper cancel-btn"
            onClick={onClose}
          >
            X
          </div>
        </div>

        <div className="middle no-scrollbar">
          <div className="tabs-container">
            <a
              href="/"
              className={`flex-center tab`}
            >
              <span className={`name`}>
                Home
              </span>
            </a>
            <a
              href="/users"
              className={`flex-center tab`}
            >
              <span className={`name`}>
                Users
              </span>
            </a>
          </div>
        </div>

        <div className="bottom">
          <div className="flex-center user-container">
            <div className="profilee">
              <img
                src={""}
                alt=""
              />
            </div>
            <div className="detail">
              <small className="muted clamp-1">Hi good to meet you</small>
            </div>
            <button className="btnn">
              <i className="fa-solid fa-power-off"></i>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
