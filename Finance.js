import React, { useEffect, useState } from 'react';

const Finance = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch('/api/payments').then(res => res.json()).then(data => setPayments(data));
  }, []);

  const markPaid = (id, method, receipt) => {
    fetch(`/api/payments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'paid', method, receipt_number: receipt })
    }).then(() => setPayments(payments.map(p => p.id === id ? { ...p, status: 'paid', method, receipt_number: receipt } : p)));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Gestão Financeira</h2>
      <table className="w-full border">
        <thead>
          <tr><th>Paciente</th><th>Valor</th><th>Status</th><th>Ação</th></tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className={p.status === 'paid' ? 'bg-green-100' : p.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'}>
              <td>{p.patient_id}</td>
              <td>R${p.amount}</td>
              <td>{p.status}</td>
              <td>
                {p.status !== 'paid' && (
                  <button onClick={() => markPaid(p.id, 'pix', `REC${p.id}`)} className="bg-blue-500 text-white p-1">Marcar Pago</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Finance;
