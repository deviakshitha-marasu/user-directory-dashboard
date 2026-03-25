import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [view, setView] = useState(() => localStorage.getItem("view") || "grid");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Persist
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .sort((a, b) => {
      const valA = sortField === "company" ? a.company.name : a.name;
      const valB = sortField === "company" ? b.company.name : b.name;
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-black p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">✨ User Directory</h1>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="🔍 Search users..."
            className="flex-1 bg-white/20 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-4">
            {/* SORT */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Sort By</label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="bg-indigo-500 px-3 py-2 rounded-xl text-center text-center-last"
              >
                <option value="name">Name</option>
                <option value="company">Company</option>
              </select>
            </div>

            {/* ORDER */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-indigo-500 px-3 py-2 rounded-xl"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* VIEW TOGGLE */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">View Mode</label>
              <div className="flex bg-white/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={`px-4 py-2 ${view === "grid" ? "bg-purple-500" : "bg-transparent"}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView("table")}
                  className={`px-4 py-2 ${view === "table" ? "bg-purple-500" : "bg-transparent"}`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* GRID VIEW */}
        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-40 bg-white/10 animate-pulse rounded-2xl" />
                ))
              : filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 p-5 rounded-2xl cursor-pointer relative"
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(user.id);
                      }}
                      className="absolute top-3 right-3"
                    >
                      {favorites.includes(user.id) ? "⭐" : "☆"}
                    </button>

                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-300 text-sm">{user.email}</p>
                    <p className="text-gray-300 text-sm">{user.phone}</p>
                    <p className="text-indigo-300 mt-2">{user.company.name}</p>
                  </motion.div>
                ))}
          </div>
        )}

        {/* TABLE VIEW */}
        {view === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full bg-white/10 rounded-xl overflow-hidden">
              <thead className="bg-white/20">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Company</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/10 hover:bg-white/10 cursor-pointer"
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.company.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!user) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black p-6 text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto bg-white/10 p-6 rounded-2xl">
        <button onClick={() => window.history.back()} className="mb-4">← Back</button>
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.website}</p>
        <h2 className="mt-4 font-semibold">Address</h2>
        <p>{user.address.city}</p>
        <h2 className="mt-4 font-semibold">Company</h2>
        <p>{user.company.name}</p>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}
