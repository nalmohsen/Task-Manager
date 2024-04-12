import { useContext, useEffect, useState } from "react"
import Task from "./Task"
import { AppContext } from "./ContextAPI"
const baseUrl = process.env.REACT_APP_BASE_URL;


export default function GetTasks({ query }) {
    const [tasks, setTasks] = useState([])
    const { refreshTaskPage, searchQuery, user } = useContext(AppContext)
    const { selectSlideValue, order } = query;
    const userId = user._id
    useEffect(() => {
        console.log("fech is called")
        fetch(`${baseUrl}/tasks/${userId}?query=${selectSlideValue}&sort=${order}&searchQuery=${searchQuery}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then((result) => result.json().then((data) => {
                if (data.status) setTasks(data.data)
                else setTasks([])
                console.log(data)
            })).catch((err) => console.log(err))
    }, [refreshTaskPage, selectSlideValue, order, searchQuery])

    return (
        <div >
            {tasks.length !== 0 && tasks.map((task) => {
                return <Task key={task._id} taskInfo={task} />
            })}
            {tasks.length === 0 &&
                <div className="flex items-center flex-col w-full h-full pt-5 text-bg justify-center">
                    <img src="images/NotFound.png" alt="task not found" className="h-64 w-64 xs:h-40 xs:w-40 p-5 drop-shadow-lg" />
                    <h1 className="text-stone-500 drop-shadow-2xl font-serif font-thin text-bg  pt-2">404 Task not found</h1>
                </div>
            }
        </div>
    )
}