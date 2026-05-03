import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import TastComponent from './Component/TastComponent'
import { AppComp } from './AppComponent/AppComp';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import AddTodoForm from './Component/AddTodoForm';
import UpdateForm from './Component/UpdateForm';
import AuthForm from './Component/AuthForm';
import axios from 'axios';

function App() {
  const { getAllTask, removeTask, getUser, setUser, getUserFun } = useContext(AppComp);
  const [showField, hideField] = useState(false);
  const [view, hide] = useState(false)
  const [showform, hideform] = useState(false);



  const logoutFun = (e) => {
    if (e.target.id === "username") {
      hideField(true)
      const toast_loader = toast.loading("....")
      setTimeout(async () => {
        const data = await axios.get("http://localhost:5000/logout", { withCredentials: true })
        toast.dismiss(toast_loader)
        localStorage.clear()
        setUser(null)
        toast.success("Logout Successfully")
        window.location.reload()

      }, 2000)
    }
  }
  useEffect(() => {
    getUserFun()
    const timeOut = setTimeout(() => {
      if (!getUser) {
        hideform(true)
      }
    }, 1000)

    return () => clearTimeout(timeOut)
  }, [!getUser])
  return (
    <div id='main_container' >
      <div className="container">
        <div className="container_left_side" style={{
          width: showField ? "75%" : "100%"
        }} >
          <nav>
            <div className="user_image" onClick={() => { hideField(e => !e) }} >
              <img src="/img/user1.png" alt="" />
              <div style={{ width: "80px", textAlign: "center" }}>
                <span id='username' onClick={(e) => logoutFun(e)}  >{getUser?.username}</span>

              </div>

            </div>
            <div className="first_task" onClick={() => hide(prev => !prev)} style={{ overflow: 'hidden' }}>
              <div className="first_task_name">
                <h1>Your Next Task......</h1>
              </div>
              <div className="first_task_dis" style={{ overflow: "hidden", lineHeight: "20px" }}>
                <p style={{
                  overflow: 'hidden',
                  fontSize: '15px',
                  lineHeight: "20px",
                  display: view ? "none" : "block",
                  cursor: "pointer",
                  overflowY: "hidden",
                  height: "15px"

                }}  >{getAllTask[0]?.dis.substring(0, 150)}...

                </p>
                <p id='viewTodo' style={{
                  top: view ? "80px" : "-800px",
                }} onClick={() => hide(prev => !prev)} >{getAllTask[0]?.dis} </p>
              </div>
            </div>
            <div className="first_task_completed" onClick={() => removeTask(getAllTask[0]?._id)} >
              <button>Pending</button>
            </div>
          </nav>

          <div
            className={`user_task ${getAllTask.length >= 6 ? "response_user_task" : ""}`}
            style={{
              marginTop: view ? "180px" : "140px"
            }}
          >
            {
              getAllTask.filter((_, id) => id != 0).map((task, Id) => {


                return <TastComponent task={task} taskId={Id} key={Id} ></TastComponent>
              })
            }
          </div>
        </div>
        <div className="container_right_side" style={{
          width: showField ? "320px" : "0",
          opacity: showField ? "1" : "0"
        }}>

          <AddTodoForm hideField={hideField} ></AddTodoForm>
        </div>
      </div>


      <UpdateForm />


      <div id="floating_btn" onClick={() => getUser && hideform(e => !e)} style={{ transform: showform ? "rotate(360deg)" : "rotate(0deg)" }} >
        <img src="/img/user4.png" alt="" />

      </div>


      <div className="user_auth_form" style={{ transform: showform ? "scale(1)" : "scale(0)" }} >

        <AuthForm hideform={hideform} ></AuthForm>
      </div>

      <ToastContainer position='top-center' />
    </div>
  )
}

export default App
