import React from 'react'
import normalNav from './NavigationBar'
import {clearLoginStatus} from '../Slices/adminSlice'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Header() {
    let loginStatus =localStorage.getItem("login");
    let navigate=useNavigate();
    useEffect(()=>{
        if(loginStatus ==='false'){
            navigate('/')
        }
    },loginStatus);
  return (
    <div>
      {loginStatus === "true" ? (
        <></>
      ) : (
        <>
          <normalNav />
        </>
      )}
    </div>
  );
}

export default Header