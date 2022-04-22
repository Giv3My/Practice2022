import React from 'react';

import useActiveUsers from '../../common/hooks/useActiveUsers';

import './Admin.css'

function Admin() {
  const filteredActiveUsers = useActiveUsers();

  return (
    <>
      <div className="admin-container">
        <h1 className="admin-title">Admin page</h1>
        <div className="user-list">
          {filteredActiveUsers ? filteredActiveUsers.map(user => {
            return (
              <div className="user-list-item" key={user.id}>
                <p className="username">{user.username}</p>
                <p className="user-booked-places">Booked places: [{user.activeBooks.join(',')}]</p>
              </div>
            )
          }) : (
            <p
              style={{
                textAlign: 'center',
                fontSize: '20px'
              }}
            >
              Nobody didn't book yet {':('}
            </p>
          )}
        </div>
      </div>
    </>
  )
};

export default Admin;