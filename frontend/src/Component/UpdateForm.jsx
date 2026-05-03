import React, { useContext, useEffect, useState } from 'react'
import { AppComp } from '../AppComponent/AppComp'
import { FaChevronDown } from "react-icons/fa";

function UpdateForm() {
  const { showUpdateBox, removeTask,hideUpdateBox, updateTaskFun } = useContext(AppComp)
  const [getUpdateTitle, setUpdateTitle] = useState("");
  const [getUpdateDis, setUpdateDis] = useState("");


  useEffect(() => {
    if (showUpdateBox.task != null) {
      setUpdateDis(showUpdateBox.task.dis)
      setUpdateTitle(showUpdateBox.task.title)
    }

  }, [showUpdateBox.task])

  return (
    <div className="bottom_container" style={{
      bottom: showUpdateBox.isTask ? "0px" : "-400px",

    }}>
      <div className="go_down" onClick={()=>hideUpdateBox(false)} ><div className="go_down_btn"><FaChevronDown/></div> </div>
      <div className="update_task">
        <div className="update_title">
          <span>Update Title</span>
          <input type="text" value={getUpdateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />
        </div>
        <div className="update_dis">
          <span>Update Discription</span>
          <textarea name="" id="" rows={5} value={getUpdateDis} onChange={(e) => setUpdateDis(e.target.value)} ></textarea>

        </div>
      </div>
      <div className="update_btn">
        <button onClick={() => updateTaskFun(getUpdateTitle, getUpdateDis)} >Update Task</button>
        <button onClick={() => removeTask(showUpdateBox.taskId)} >Remove Task</button>
      </div>
    </div>
  )
}

export default UpdateForm
