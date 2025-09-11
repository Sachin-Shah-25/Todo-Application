import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL

export const AppComp = createContext();
export const ContextProvider = (props) => {
    const [getAllTask, setAllTask] = useState([]);
    const [showUpdateBox, hideUpdateBox] = useState({
        isTask: false,
        updateValue: "",
        taskId: null,
        task: null
    });
    const [getUser, setUser] = useState(null);


    const addTaskFun = async (newTask) => {

        try {
            const { data } = await axios.post(`${BASE_URL}/todo/addtodo`, newTask, { withCredentials: true });

            if (!data || !data.message) {
                toast.error(data.message || "Not Added ");
                return;
            }
            toast.success("New Task Added ");
            setAllTask(data.userTask.todocreateby || []);

        } catch (error) {
            errFun(error)

        }

    }

    const removeTask = async (id) => {

        try {
            const getToken = localStorage.getItem("token");
            if (!getToken) {
                toast.error("!Please Login Again ");
                return;

            }
            const { data } = await axios.delete(`${BASE_URL}/todo/deletetodo/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken}`
                }, withCredentials: true
            });

            if (!data || !data.success) {
                toast.error("Todo Can't Deleted " || data.message);
                return;
            }
            toast.success("Deleted");
            setAllTask(data.userTask.todocreateby || []);

        } catch (error) {
            errFun(error)
        }
    }

    const updateTaskFun = async (title, dis) => {

        try {

            const getToken = localStorage.getItem("token");
            if (!getToken) {
                toast.error("!Please Login Again ");
                return;
            }
            const getTodoId = showUpdateBox.taskId;

            const { data } = await axios.put(`${BASE_URL}/todo/updatetodo/${getTodoId}`, { title, dis }, {
                headers: {
                    Authorization: `Bearer ${getToken}`
                }, withCredentials: true
            });

            if (!data || !data.success) {
                toast.error(data.message || "Can't Update ");
                return;
            }
            toast.success("A Todo Updated ");
            setAllTask(data.userTask.todocreateby);
            hideUpdateBox((e) => {
                return { ...e, isTask: !e.isTask }
            });

        } catch (error) {
            errFun(error)
        }

    }

    const findAllTask = async () => {
        try {
            const getToken = localStorage.getItem("token");
            if (!getToken) {
                toast.error("Login Again ");
                return;
            }
            const data = await axios.get(`http://localhost:5000`, {
                headers: {
                    Authorization: `Bearer ${getToken}`
                }, withCredentials: true
            });
            if (data.status != 200) {
                toast.error(data.message || "Not Found");
                return;
            }
            setUser(data.data.userTask);
            setAllTask(data.data.userTask.todocreateby || []);


        } catch (error) {

            errFun(error)
        }
    }


    const getUserFun = async () => {
        try {
            const data = await axios.get("http://localhost:5000/user", { withCredentials: true })
            setUser(data.data.data)
        } catch (error) {
            errFun(error)
        }
    }

    function errFun(err) {
        if (err.status == 404) {
            toast.error(err.response.data.message)
        }
        else if (err.status == 409) {

            toast.error(err.response.data.message)
        }
        else if (err.status == 401) {
            toast.error(err.response.data.message)

        }
        else if (err.status == 503) {
            toast.error(err.response.data.message)
        }
        else {
            toast.error("An Error When Fechting Detials");
            console.error("An Error When Fechting Detials : ", err.message);

        }
    }

    useEffect(() => {
        
            findAllTask();
    }, []);

    return <AppComp.Provider value={{ errFun, setAllTask, getAllTask, addTaskFun, removeTask, updateTaskFun, showUpdateBox, hideUpdateBox, findAllTask, setUser, getUser, getUserFun }} >
        {props.children}
    </AppComp.Provider>
}


