import { useState, useContext } from "react"
import { AppContext } from "./ContextAPI"
const baseUrl = process.env.REACT_APP_BASE_URL;



export default function CreateTask() {
  const [dateScheduled, setDateScheduled] = useState("")
  const [task, setTask] = useState("")
  const { refreshTaskPage, setRefreshTaskPage,user } = useContext(AppContext)

  const handleSumbit = function () {
    try {
      const data = {
        'task': task,
        'dateScheduled': dateScheduled
      }
      const userId=user?._id
      if (!data.dateScheduled) {
        alert("Task schedule date is required")
        return;
      }
      console.log(data)
      fetch(`${baseUrl}/createTask/${userId}`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials:'include',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((result) => result.json().then((data) => {
          if(data.status){
          setTask("")
          setDateScheduled("")
          setRefreshTaskPage(!refreshTaskPage)
          alert(`${data.message}`)
          }else alert(`${data.message}`)
        }))

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div >
      <section className="p-1 border my-3 mx-5 mb-0 flex items-center rounded-md shadow-md">
        <i className='bx bx-plus pl-5 font-thin text-2xl text-blue-500'></i>
        <input className="w-full border-none focus:outline-none p-3 placeholder:text-blue-400 placeholder:font-serif"
          placeholder={"Add a task"} value={task} onChange={(e) => setTask(e.target.value)} />
      </section>

      <section className={`${task ? '' : 'hidden'} flex justify-between border p-3 my-3 mx-5 mt-0 bg-teal-50 rounded-md`}>
        <input className={`ml-7 cursor-pointer focus:outline-none  rounded-sm bg-sky-50`} type="date" value={dateScheduled} onChange={(e) => setDateScheduled(e.target.value)} />
        <button className="border px-3 mx-5 rounded-md bg-violet-900 text-white drop-shadow-md active:bg-blue-900" onClick={handleSumbit}>Add</button>
      </section>
    </div>
  )
}