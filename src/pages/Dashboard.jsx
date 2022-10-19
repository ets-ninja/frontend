import React, { useState } from 'react';
import ResponsiveContainer from '../components/styled/ResponsiveContainer'
import JarDashboard from '../components/UIElements/JarDashboard'
import JarDashboardHeader from '../components/UIElements/JarDashboardHeader'

const Dashboard = () => {
  return (
    <>
      <ResponsiveContainer>
        <JarDashboardHeader />
        <JarDashboard /> 
      </ResponsiveContainer>
    </>
)
}

export default Dashboard;
