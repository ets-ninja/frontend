import React, { useState } from 'react';
import BasketDashboard from '../components/UIElements/BasketDashboard'
import BasketDashboardHeader from '../components/UIElements/BasketDashboardHeader'

const Dashboard = () => {
  return (
    <>
      <BasketDashboardHeader />
      <BasketDashboard /> 
    </>
)
}

export default Dashboard;
