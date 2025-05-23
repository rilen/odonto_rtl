// Salvar em: frontend/src/components/Login.js
   import React, { useState } from 'react';
   import axios from 'axios';
   import { useTranslation } from 'react-i18next';
   import { useNavigate } from 'react-router-dom';

   const Login = () => {
     const { t, i18n } = useTranslation();
     const [cpf, setCpf] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const navigate = useNavigate();

     const handleLogin = async (e) => {
       e.preventDefault();
       try {
         const response = await axios.post('/api/auth/login', { cpf, password });
         localStorage.setItem('token', response.data.token);
         navigate('/dashboard');
       } catch (err) {
         setError(t('login.error') || 'Erro ao fazer login');
       }
     };

     const changeLanguage = (lng) => {
       i18n.changeLanguage(lng);
     };

     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
         <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
           <div className="flex justify-end mb-4">
             <select
               onChange={(e) => changeLanguage(e.target.value)}
               value={i18n.language}
               className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-2 focus:outline-none"
               aria-label={t('login.language_select')}
             >
               <option value="pt">Português</option>
               <option value="en">English</option>
             </select>
           </div>
           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">{t('login.title')}</h2>
           <form onSubmit={handleLogin} className="space-y-4">
             <div>
               <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                 {t('login.cpf')}
               </label>
               <input
                 id="cpf"
                 type="text"
                 value={cpf}
                 onChange={(e) => setCpf(e.target.value)}
                 className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                 aria-required="true"
                 required
               />
             </div>
             <div>
               <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                 {t('login.password')}
               </label>
               <input
                 id="password"
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                 aria-required="true"
                 required
               />
             </div>
             {error && <p className="text-red-500 text-sm">{error}</p>}
             <button
               type="submit"
               className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
             >
               {t('login.login')}
             </button>
           </form>
         </div>
       </div>
     );
   };

   export default Login;
