import React, { useState } from 'react';
import axios from 'axios';

const UpdateEventForm = () => {
  const [form, setForm] = useState({
    judul: '',
    deskripsi: '',
    tanggal: '',
    waktu: '',
    lokasi: '',
  });

  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('judul', form.judul);
    formData.append('deskripsi', form.deskripsi);
    formData.append('tanggal', form.tanggal);
    formData.append('waktu', form.waktu);
    formData.append('lokasi', form.lokasi);
    if (file) formData.append('file', file);

    try {
      const res = await axios.put('http://localhost:5000/api/event/8', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMsg('✅ Event updated successfully!');
      console.log(res.data);
    } catch (err) {
      setMsg(`❌ ${err.response?.data?.msg || 'Something went wrong'}`);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Update Event ID 1</h2>
      <p style={{ color: msg.startsWith('✅') ? 'green' : 'red' }}>{msg}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="judul" placeholder="Judul" onChange={handleChange} required /><br />
        <textarea name="deskripsi" placeholder="Deskripsi" onChange={handleChange} required /><br />
        <input type="date" name="tanggal" onChange={handleChange} required /><br />
        <input type="time" name="waktu" onChange={handleChange} required /><br />
        <input type="text" name="lokasi" placeholder="Lokasi" onChange={handleChange} required /><br />
        <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} /><br /><br />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEventForm;
