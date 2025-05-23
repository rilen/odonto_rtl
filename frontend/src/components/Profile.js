import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    address: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError(t('profile.not_authenticated') || 'Usuário não autenticado.');
          setLoading(false);
          // Se desejar, redirecione aqui para login
          return;
        }
        const response = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError(t('profile.session_expired') || 'Sessão expirada. Faça login novamente.');
          localStorage.removeItem('token');
          // Se quiser, redirecione para login
        } else {
          setError(t('profile.error_fetch') || 'Erro ao carregar dados do usuário');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [t]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError(t('profile.not_authenticated') || 'Usuário não autenticado.');
        return;
      }
      await axios.put('/api/users/me', user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(t('profile.success') || 'Perfil atualizado com sucesso');
      setEditMode(false);
      setError('');
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError(t('profile.session_expired') || 'Sessão expirada. Faça login novamente.');
        localStorage.removeItem('token');
        // Se quiser, redirecione para login
      } else {
        setError(t('profile.error_update') || 'Erro ao atualizar perfil');
      }
      setSuccess('');
    }
  };

  const handleEditMode = (value) => {
    setEditMode(value);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4" role="region" aria-label={t('profile.title')}>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t('profile.title')}</h2>
        <p>{t('profile.loading') || 'Carregando...'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4" role="region" aria-label={t('profile.title')}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t('profile.title')}</h2>
      {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
      {success && <p className="text-green-500 mb-4" role="status">{success}</p>}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {editMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ...campos do formulário permanecem iguais... */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('profile.name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={user.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('profile.cpf')}
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                value={user.cpf}
                disabled
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 dark:text-gray-200"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('profile.phone')}
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={user.phone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
                autoComplete="tel"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('profile.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('profile.address')}
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={user.address}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200"
                autoComplete="street-address"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              >
                {t('profile.save')}
              </button>
              <button
                type="button"
                onClick={() => handleEditMode(false)}
                className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
              >
                {t('profile.cancel')}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p><strong>{t('profile.name')}:</strong> {user.name}</p>
            <p><strong>{t('profile.cpf')}:</strong> {user.cpf}</p>
            <p><strong>{t('profile.phone')}:</strong> {user.phone || '-'}</p>
            <p><strong>{t('profile.email')}:</strong> {user.email || '-'}</p>
            <p><strong>{t('profile.address')}:</strong> {user.address || '-'}</p>
            <button
              onClick={() => handleEditMode(true)}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              {t('profile.edit')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
