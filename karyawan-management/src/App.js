import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KaryawanList from './components/KaryawanList';
import KaryawanForm from './components/KaryawanForm';
import KaryawanDetail from './components/KaryawanDetail';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/karyawan-list" element={<KaryawanList />} />
          <Route path="/add" element={<KaryawanForm />} />
          <Route path="/edit/:id" element={<KaryawanForm />} />
          <Route path="/karyawan/:id" element={<KaryawanDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
