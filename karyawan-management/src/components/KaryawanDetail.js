import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const KaryawanDetail = () => {
  const [karyawan, setKaryawan] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/karyawan/${id}`)
      .then(response => {
        setKaryawan(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the karyawan details!", error);
      });
  }, [id]);

  if (!karyawan) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Karyawan Details</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <p><strong>ID:</strong> {karyawan.id}</p>
        <p><strong>Name:</strong> {karyawan.name}</p>
        <p><strong>Address:</strong> {karyawan.address}</p>
        <p><strong>Date of Birth:</strong> {karyawan.dob}</p>
        <p><strong>Status:</strong> {karyawan.status}</p>
        <p><strong>NPWP:</strong> {karyawan.npwp}</p>
        {/* Add more details as necessary */}
      </div>
    </div>
  );
};

export default KaryawanDetail;
