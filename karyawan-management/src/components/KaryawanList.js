import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const KaryawanList = () => {
  const [karyawans, setKaryawans] = useState([]);

  useEffect(() => {
    axios.get('/api/karyawan')
      .then(response => {
        setKaryawans(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the karyawans!", error);
      });
  }, []);

  const deleteKaryawan = (id) => {
    axios.delete(`/api/karyawan/${id}`)
      .then(() => {
        setKaryawans(karyawans.filter(karyawan => karyawan.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the karyawan!", error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Karyawan List</h1>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Karyawan</Link>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">NIK</th>
            <th className="py-2 px-4 border">Alamat</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {karyawans.map(karyawan => (
            <tr key={karyawan.id}>
              <td className="py-2 px-4 border">{karyawan.id}</td>
              <td className="py-2 px-4 border">{karyawan.nama}</td>
              <td className="py-2 px-4 border">{karyawan.nik}</td>
              <td className="py-2 px-4 border">{karyawan.alamat}</td>
              <td className="py-2 px-4 border">{karyawan.status}</td>
              <td className="py-2 px-4 border">
                <Link to={`/edit/${karyawan.id}`} className="text-blue-500">Edit</Link> | 
                <button onClick={() => deleteKaryawan(karyawan.id)} className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KaryawanList;
