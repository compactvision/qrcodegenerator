import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx"
import UserList from "./components/UserList";
import UserForm from "./components/UserForm.jsx";
import UserDetail from "./components/UserDetail.jsx";

export default function Pages() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<UserForm/>} />
          <Route exact path="/users" element={<UserList/>} />
          <Route exact path="/user/:id" element={<UserDetail />} />
        </Routes>
      </Router>
    </>
  );
}
