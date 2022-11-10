import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/user'
import Admin from '../components/Admin';
import User from '../components/User';

export default function Home() {
  const [userState] = useContext(UserContext);
  const role = userState.user.roles[0];

  if(role.name === 'admin') {
    return <Admin />
  }
  return <User />
}
