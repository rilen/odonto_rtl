// Salvar em: frontend/src/pages/Admin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Admin = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then(res => setUsers(res.data));
  }, []);

  const updateUserRole = async (id, role) => {
    await axios.put(`/api/users/${id}`, { role });
    setUsers(users.map(u => u.id === id ? { ...u, role } : u));
  };

  return (
    <div className="container" role="region" aria-label={t('admin.title')}>
      <h2 className="text-2xl font-bold mb-4">{t('admin.title')}</h2>
      <table className="table">
        <thead>
          <tr><th scope="col">{t('admin.name')}</th><th scope="col">{t('admin.role')}</th><th scope="col">{t('admin.actions')}</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateUserRole(u.id, e.target.value)}
                  className="input"
                  aria-label={t('admin.change_role', { name: u.name })}
                >
                  <option value="admin">{t('admin.admin')}</option>
                  <option value="secretary">{t('admin.secretary')}</option>
                  <option value="dentist">{t('admin.dentist')}</option>
                  <option value="patient">{t('admin.patient')}</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
