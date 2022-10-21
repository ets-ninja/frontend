import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useModal from '../../hooks/useModal'

const IntroChecker = () => {
  
  const modal = useModal()  
  const navigate = useNavigate()  

  useEffect(() => {

    if (!localStorage.getItem('notFirstTime?')){
        navigate('/login')
        modal.open('intro-page')
        localStorage.setItem('notFirstTime?', true)
    } else {
        navigate('/dashboard')
    }

  },[])  


  return (<></>)
}

export default IntroChecker