import React, { useEffect, useState } from 'react';

const Stock = ({ userRole }) => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetch('/api/stock').then(res => res.json()).then(data => setStock(data));
  }, []);

  const updateStock = (id, quantity) => {
    fetch(`/api/stock/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    }).then(() => setStock(stock.map(item => item.id === id ? { ...item, quantity } : item)));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Gestão de Estoque</h2>
      <table className="w-full border">
        <thead>
          <tr><th>Item</th><th>Quantidade</th><th>Nível Crítico</th><th>Categoria</th><th>Ação</th></tr>
        </thead>
        <tbody>
          {stock.map(item => (
            <tr key={item.id} className={item.quantity <= item.critical_level ? 'bg-red-100' : ''}>
              <td>{item.item_name}</td>
              <td>{item.quantity}</td>
              <td>{item.critical_level}</td>
              <td>{item.category}</td>
              <td>
                {userRole === 'assistant' && (
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateStock(item.id, e.target.value)}
                    className="border p-1 w-20"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
