import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { userInfo } = useSelector(state => state.user);

  return (
    <div>
      <h1>{userInfo.firstName}</h1>
      <h1>{userInfo.lastName}</h1>
      <h1>{userInfo.publicName}</h1>
    </div>
  );
};

export default Profile;
