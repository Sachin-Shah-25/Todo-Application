import React, { useContext, useState } from 'react'
import { AppComp } from '../AppComponent/AppComp';
import { toast } from 'react-toastify';
import { FaCaretRight } from "react-icons/fa";

function AddTodoForm({ hideField }) {
  const { addTaskFun } = useContext(AppComp)
  const [getTitle, setTitle] = useState("");
  const [getDis, setDis] = useState("");

  const add_Task_Fun = () => {

    if (!getTitle || !getDis) {
      toast.error("Task Can't Added ")
      return
    }
    const getToken = localStorage.getItem("token");
    if (!getToken) {
      toast.warning("Please Login Again ");
      return;
    }
    const toast_loadeer = toast.loading(".....")
    setTimeout(() => {
      toast.dismiss(toast_loadeer)
      const taskObj = {
        title: getTitle.trim(),
        dis: getDis.trim(),
        userId: getToken
      }

      addTaskFun(taskObj);
      hideField(false);
      setTitle("");
      setDis("");

    }, 2000)
  }
  return (
    <div className="add_task_container">
      <div className="go_right" ><div  onClick={()=>hideField(false)} className="go_right_btn"><FaCaretRight /></div> </div>

      <div className="add_task_container_inside">
        <h1 id='heading'>Add One More ? </h1>
        <div className="task_title">
          <input type="text" placeholder='Title' value={getTitle} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="tast_disc"  >
          <textarea name="" id="" value={getDis} onChange={(e) => setDis(e.target.value)} rows={10} ></textarea>
        </div>
        <div className="tast_add_btn" >
          <button onClick={() => add_Task_Fun()} >Add Task</button>
        </div>
      </div>
    </div>
  )
}

export default AddTodoForm
