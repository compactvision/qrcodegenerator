import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./DashboardWrapper.scss";
import Navbar from "../navbar/Navbar";

export default function DashboardWrapper({children}) {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <>
      <Sidebar show={openSidebar} onClose={() => setOpenSidebar(!openSidebar)}/>
      <main className="dashboard_name">
        <Navbar onMenuClick={() => setOpenSidebar(!openSidebar)}/>
        {children}
      </main>
    </>
  )
}