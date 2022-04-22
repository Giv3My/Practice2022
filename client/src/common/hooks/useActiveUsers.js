import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setUsersWhoBooked } from '../../redux/slices/userSlice';

import { API_URL } from './../api/index';
import { role } from '../constants/roles';

function useActiveUsers() {
  const dispatch = useDispatch();
  const { squares } = useSelector(({ box }) => box);
  const { userInfo } = useSelector(({ user }) => user);

  const [users, setUsers] = React.useState([]);
  const [filteredActiveUsers, setFilteredActiveUsers] = React.useState(null);

  React.useEffect(() => {
    filterUsers();
  }, []);

  React.useEffect(() => {
    userInfo?.role === role.admin && users.length && getActiveUsersFromDB();
  }, [users]);

  const filterUsers = () => {
    const users = squares.filter(square => square.userId).map(square => square.userId);

    setUsers(users);
  };

  const getActiveUsersFromDB = async () => {
    const { data } = await axios.post(`${API_URL}/users`, users);

    if (data.length) {
      getUsersWhoBooked(data);
      getUserBooks(data);
    }
  };

  const getUsersWhoBooked = (users) => {
    const result = {};

    users.forEach(user => {
      result[user.id] = user;
    });

    dispatch(setUsersWhoBooked(result));
  };

  const getUserBooks = (activeUsers) => {
    const usersWhoBooked = activeUsers.map((user) => {
      return {
        ...user,
        activeBooks: squares.reduce((acc, square) => {
          if (square.userId === user.id) {
            acc.push(square.id + 1);
          }

          return acc;
        }, [])
      };
    });

    setFilteredActiveUsers(usersWhoBooked);
  };

  return filteredActiveUsers;
}

export default useActiveUsers;