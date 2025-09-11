import React, { useContext, useEffect, useState } from 'react'
import { AppComp } from '../AppComponent/AppComp';
import { motion } from "motion/react"
function TastComponent({ task, taskId }) {
    const [getState, setState,] = useState(true);
    const { removeTask, hideUpdateBox ,getAllTask} = useContext(AppComp);
    const [showFull,hideFull]=useState(false)
    const [view,hide]=useState(false)



    const taskChangeFun = value => {
        if (value === "update") {
            hideUpdateBox(e => {
                
            return { ...e, isTask: !e.isTask,taskId:task._id,task:task}
            });
        }
        else  removeTask(task._id);
        
    }
    return (

        <div className="task tak" style={{
            height:showFull?"100%":"72px"
        }} >
            <div className={`task_image ${getState ? "rotated" : ""}`} onClick={() => setState(e => !e)} >
                <p id='task_id'>{taskId+1}</p>
            </div>
            <div className={`task_con ${getAllTask.length >= 6 ? "task_con_height" : ""}`} style={{
                width: getState ? "100%" : "0px",
                opacity: getState ? "1" : "0",
            }} >
                <div className="task_detail" >
                    <div className="task_name">
                        <span>{task.title}</span>
                    </div>
                    <div className="tast_dis" >
                        <p onClick={()=>hideFull(e=> !e)} >{task.dis} </p>
                    </div>
                </div>
                <div className="task_completed">
                    <select name="" id="" value={"pending"} onChange={(e) => taskChangeFun(e.target.value)} >
                        <option value="pending">Pending</option>
                        <option value="update">Update</option>
                        <option value="delete">Completed</option>
                    </select>
                </div>
            </div>

        </div>
    )
}

export default TastComponent
