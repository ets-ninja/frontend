import React, { useState } from 'react';
import ResponsiveContainer from '../components/styled/ResponsiveContainer'
import BasketDashboard from '../components/UIElements/BasketDashboard'
import BasketDashboardHeader from '../components/UIElements/BasketDashboardHeader'

const Dashboard = () => {
  return (
    <>
      <ResponsiveContainer>
        <BasketDashboardHeader />
        <BasketDashboard />
      </ResponsiveContainer>
    </>
)
}

export default Dashboard;
