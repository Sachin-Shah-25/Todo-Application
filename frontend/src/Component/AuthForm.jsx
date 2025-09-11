import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { AppComp } from '../AppComponent/AppComp';
const apiUrl = import.meta.env.VITE_BASE_URL;


function AuthForm({ hideform }) {
  const { setUser, errFun, findAllTask } = useContext(AppComp)
  const [showloginForm, hideloginForm] = useState(false);
  const [getUserName, setUserName] = useState("");
  const [getUserEmail, setUserEmail] = useState("");
  const [getUserPassword, setUserPassword] = useState("");



  const formSubmitFun = (e) => {
    e.preventDefault();
    const userdata = {
      username: getUserName.trim(),
      useremail: getUserEmail.trim().toLowerCase(),
      userpassword: getUserPassword.trim()
    }
    try {
      if (!getUserPassword || !getUserEmail) {
        toast.error("All Filed Required ");
        return;
      }
      if (getUserPassword.length < 6) {
        toast.error("Password is too short ");
        return;
      }
      const pendingState = toast.loading("Checking Details....");
      if (!showloginForm) {
        setTimeout(async () => {
          try {
            const data = await axios.post(`${apiUrl}/user/createuser`, userdata, { withCredentials: true });
            toast.dismiss(pendingState);
            if (data.status != 201 && data.status != 200) {
              toast.error(data.message || "Could not create user ");
              return;
            }

            const token = data.data.data._id;
            if (token) localStorage.setItem("token", token);
            toast.success("Success ! Please Login");
            hideform(true);
            hideloginForm(true)
            setUser(data.data);
           
            setUserEmail("")
            setUserName("")
            setUserPassword("")
          } catch (innerErr) {
            toast.dismiss(pendingState);
            errFun(innerErr)
          }

        }, 1000);
      }
      else {
        setTimeout(async () => {
          try {
            const { data } = await axios.post(`${apiUrl}/user/loginuser`, userdata, { withCredentials: true });
            toast.dismiss(pendingState);
            if (!data || !data.success) {
              toast.error(data.message || "Could not Login ");
              return;
            }

            const token = data.data._id;
            if (token) localStorage.setItem("token", token);
            findAllTask()  
            toast.success(data.message || "Login successfully!");
            setUser(data.data);
            hideform(false);
            setUserEmail("")
            setUserName("")
            setUserPassword("")
          } catch (innerErr) {
            toast.dismiss(pendingState);
            errFun(innerErr)
          }

        }, 1000);
      }


    } catch (error) {
      toast.dismiss(pendingState);
      errFun(error)
      hideform(false);
    }
  }


  return (
    <form action="#" onSubmit={(e) => formSubmitFun(e)} >
      <h1 style={{ color: 'white' }} >{showloginForm ? "Welcome Back !" : "Create New Account "}  </h1>
      {
        showloginForm
          ? ""
          : <div className="username" style={{ marginTop: '20px' }}>
            <input type="text" value={getUserName} placeholder='Enter Your name' onChange={(e) => setUserName(e.target.value)} />
          </div>
      }

      <div className="useremail">
        <input type="email" name="" value={getUserEmail} placeholder='Enter Your Email' id="" onChange={(e) => setUserEmail(e.target.value)} />
      </div>
      <div className="userpassword" >
        <input type="text" value={getUserPassword} placeholder='Enter Your Password' onChange={(e) => setUserPassword(e.target.value)} />
      </div>
      <div className="already_acc" style={{ color: 'white', fontSize: '12px' }}>
        {showloginForm ? "Create new account ?  " : "Already User ?  "}
        <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => hideloginForm(e => !e)} >{showloginForm ? "SignUp" : "SignIn"} </span>
      </div>
      <div className="user_btn">
        <button > {showloginForm ? "SignIn" : "SignUp"} </button>
      </div>
    </form>
  )
}

export default AuthForm
