import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import DashboardWrapper from "./dashboardwrapper/DashboardWrapper";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: "Nom",
      selector: (row) => row.nom,
      sortable: true,
      cell: (row) => <a href={`/user/${row.id}`}>{row.nom}</a>
    },
    {
      name: "Prenom",
      selector: (row) => row.prenom,
      sortable: true,
    },
    {
      name: "Postnom",
      selector: (row) => row.postnom,
      sortable: true,
    },
    {
      name: "Metier",
      selector: (row) => row.metier,
      sortable: true,
    },
    {
      name: "Formation suivie",
      selector: (row) => row.formation_suivie,
      sortable: true,
    },
    {
      name: "Competences",
      selector: (row) => row.competences,
      sortable: true,
    },
    {
      name: "Periode validite",
      selector: (row) => row.periode_validite,
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/getusers");
        setUsers(response.data);
      } catch (error) {
        setError("erreur");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  console.log(users);
  return (
    <>
      <div className="user-container mt-5">
        {/* <div className="text-nd">
          <input type="text" onChange={handleFilter} />
        </div> */}
        {loading ? (
          "En cours de recherche"
        ) : (
          <DataTable
            columns={columns}
            data={users}
            fixedHeader
            pagination
          ></DataTable>
        )}
      </div>
    </>
  );
}
