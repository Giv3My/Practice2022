import React from 'react';
import { useNavigate } from 'react-router-dom';

import { style } from './styles';

function ResultModalForm({ userData }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    return () => {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <div className="modal-result" style={style.modalResult}>
      <p>Username: {userData.user.username}</p>
      <p>Email: {userData.user.email}</p>
      <p>Password: {userData.generatedPassword}</p>
    </div>
  )
};

export default ResultModalForm;