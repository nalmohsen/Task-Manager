import { useContext, useState } from "react"
import UpdateTask from "./UpdateTask"
import { AppContext } from "./ContextAPI"
const baseUrl = process.env.REACT_APP_BASE_URL;

export default function Task({ taskInfo }) {
    const { isImp, status } = taskInfo  
    const [complete, setComplete] = useState(status)
    const [update, setUpdate] = useState(false)
    const [importent, setImportent] = useState(isImp)
    const { refreshTaskPage, setRefreshTaskPage,user } = useContext(AppContext)

    const handleClick = (event) => {
        const data = {
            status: event === "complete" ? !complete : status,
            isImp: event === "imp" ? !importent : isImp
        }
        if (event === 'imp') {
            if (data.isImp === true) {
                setImportent(true)
                setRefreshTaskPage(!refreshTaskPage)
                alert("This task is now marked as important.");
            } else {
                setImportent(false)
                setRefreshTaskPage(!refreshTaskPage)
                alert("Task is no longer marked as important.");
            }
        }
        if (event === 'complete') {
            if (data.status === true) {
                setComplete(true)
                alert('Well done! You have successfully completed the task.');
            } else {
                setComplete(false)
                alert('Task has been marked as incomplete.');
                setRefreshTaskPage(!refreshTaskPage)
            }
        }
        const userId=user._id
        fetch(`${baseUrl}/task/${taskInfo._id}/${userId}`, {
            method: 'PUT',   
            body: JSON.stringify(data),
            credentials:'include',
            headers: { "Content-Type": "application/json" }
        })
            .then((result) => result.json().then((response) => {
                if (data.status) {
                    setRefreshTaskPage(!refreshTaskPage)
                }
                console.log(response)
            }))
    }
    return (
        <div>
            <section className={` mx-5 p-2 pl-7 flex justify-between  mt-3 rounded-md shadow-sm items-center cursor-pointer text-sm bg-slate-100 ${update ? 'hidden' : ''} hover:bg-sky-100`} >
                <div className="pr-4 flex items-center">
                    <i className={`text-xl mr-5 text-violet-800 cursor-pointer  hover:text-red-500 ${complete ? 'bx bx-check-circle' : 'bx bx-circle'}`}
                        onClick={() => { handleClick("complete") }} >
                    </i>
                    <div>
                        <div>{taskInfo?.task}</div>
                        <div className="text-xs text-stone-500 pt-1 font-sans">  <i className='bx bx-calendar pr-1'></i>{new Date(taskInfo?.dateScheduled).toDateString()}</div>
                    </div>
                </div>

                <div className="flex w-16 xs:w-12  justify-between pr-3 xs:pr-0">
                    <i className={`${importent ? 'bx bxs-star' : 'bx bx-star'}   text-lg cursor-pointer  text-violet-800 hover:scale-125 ease-in-out duration-300`}
                        onClick={() => { handleClick("imp") }}>
                    </i>
                    <i className='bx bxs-edit text-lg  text-violet-800  cursor-pointer '
                        onClick={() => setUpdate(true)}>
                    </i>
                </div>
            </section>

            <section className={`${update ? "" : 'hidden'}`}>
                <UpdateTask taskInfo={taskInfo} setUpdate={setUpdate} />
            </section>
        </div>
    )
}