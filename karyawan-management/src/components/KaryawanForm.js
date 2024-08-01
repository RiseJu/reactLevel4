import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';

const KaryawanForm = () => {
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [nik, setNik] = useState('');
  const [npwp, setNpwp] = useState('');
  const [status, setStatus] = useState('Active'); // Default value for status
  const { id } = useParams();
  const history = useNavigate ();

  useEffect(() => {
    if (id) {
      axios.get(`/api/karyawan/${id}`)
        .then(response => {
          const karyawan = response.data;
          setNama(karyawan.nama);
          setAlamat(karyawan.alamat);
          setTanggalLahir(karyawan.tanggal_lahir);
          setNik(karyawan.nik);
          setNpwp(karyawan.npwp);
          setStatus(karyawan.status);
        })
        .catch(error => {
          console.error("There was an error fetching the karyawan!", error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const karyawan = { nama, alamat, tanggal_lahir: tanggalLahir, nik, npwp, status };

    if (id) {
      axios.put(`/api/karyawan/${id}`, karyawan)
        .then(() => {
          history('/');
        })
        .catch(error => {
          console.error("There was an error updating the karyawan!", error);
        });
    } else {
      axios.post('/api/karyawan', karyawan)
        .then(() => {
          history('/');
        })
        .catch(error => {
          console.error("There was an error creating the karyawan!", error);
        });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Karyawan' : 'Add Karyawan'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nama</label>
          <input 
            type="text" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={nama} 
            onChange={(e) => setNama(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Alamat</label>
          <input 
            type="text" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={alamat} 
            onChange={(e) => setAlamat(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tanggal Lahir</label>
          <input 
            type="date" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={tanggalLahir} 
            onChange={(e) => setTanggalLahir(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">NIK</label>
          <input 
            type="text" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={nik} 
            onChange={(e) => setNik(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">NPWP</label>
          <input 
            type="text" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={npwp} 
            onChange={(e) => setNpwp(e.target.value)} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <div>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                className="form-radio" 
                value="Active" 
                checked={status === 'Active'} 
                onChange={(e) => setStatus(e.target.value)} 
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input 
                type="radio" 
                className="form-radio" 
                value="Non Active" 
                checked={status === 'Non Active'} 
                onChange={(e) => setStatus(e.target.value)} 
              />
              <span className="ml-2">Non Active</span>
            </label>
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default KaryawanForm;
