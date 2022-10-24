import React from 'react';
import ResponsiveContainer from '../components/styled/ResponsiveContainer';
import JarDashboard from '../components/Dashboard/JarDashboard';
import JarDashboardHeader from '../components/Dashboard/JarDashboardHeader';

const Dashboard = () => {
  return (
    <>
      <ResponsiveContainer>
        <JarDashboardHeader />
        <JarDashboard />
      </ResponsiveContainer>
    </>
  );
};

export default Dashboard;
