import { useContext, useState } from "react"
import { AppContext } from "./ContextAPI"
const baseUrl = process.env.REACT_APP_BASE_URL

export default function UpdateTask({ taskInfo, setUpdate }) {
    const [dateScheduled, setDateScheduled] = useState(taskInfo.dateScheduled)
    const [task, setTask] = useState(taskInfo.task)
    const { setRefreshTaskPage, refreshTaskPage ,user} = useContext(AppContext)

    const handleSumbit = () => {
        const data = { task, dateScheduled }
        if (!task || !dateScheduled) {
            alert('Both task and scheduled date are required.')
            return;
        }
        const userId=user._id
        fetch(`${baseUrl}/task/${taskInfo._id}/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials:'include',
            headers: { "Content-Type": "application/json" }
        })
            .then((result) => result.json().then((data) => {
                if(data.status){
                setUpdate(false)
                setTask("")
                setRefreshTaskPage(!refreshTaskPage)
                alert(`${data.message}`)
                }else alert(`${data.message}`)
            })).catch((err)=>console.log(err))
    }
    return (
        <div >
            <section className="p-1 border my-3 mx-5 mb-0 flex items-center rounded-md shadow-md">
                <i className='bx bx-plus pl-5 font-thin text-2xl text-blue-500'></i>
                <input className="w-full border-none focus:outline-none p-3 placeholder:text-blue-400"
                    placeholder={"Update a task"} value={task} onChange={(e) => { e.preventDefault(); setTask(e.target.value) }} />
            </section>

            <section className={`flex justify-between border p-3 my-3 mx-5 mt-0 bg-slate-100 rounded-md`}>
                <input className={`ml-7 cursor-pointer focus:outline-none  rounded-sm bg-sky-50`} type="date" value={dateScheduled} onChange={(e) => setDateScheduled(e.target.value)} />
                <div className="flex">
                    <button className="border px-3 xs:text-xs xs:px-1 mr-5 xs:mx-2 font-serif rounded-md bg-red-900 text-white drop-shadow-md active:bg-red-900" onClick={() => setUpdate(false)}>Cancle</button>
                    <button className="border px-3 xs:text-xs xs:px-1 mr-5 xs:mr-0 font-serif rounded-md bg-violet-900 text-white drop-shadow-md active:bg-blue-900" onClick={handleSumbit}>Update</button>
                </div>
            </section>
        </div>
    )
}