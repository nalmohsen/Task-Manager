

import { useContext } from "react"
import { AppContext } from "./ContextAPI"
const baseUrl = process.env.REACT_APP_BASE_URL

export default function Header() {
    const {user,setUser,setIsLoggedIn,setSearchQuery}=useContext(AppContext)

    const handleLogOut=function(){
          fetch(`${baseUrl}/logout`,{
            method:'PUT',
            credentials:'include'
          }).then((result)=>result.json().then((data)=>{
            if(data.status){
                setUser(null)
                setIsLoggedIn(false)
                alert(`${data.message}`)
            }else alert("You are not logged out. Please try again.")
          })).catch((err)=>console.log(err))
    }

    return (
        <nav className="bg-violet-800 h-13 flex justify-between items-center px-5 py-2 fixed right-0  left-0 top-0 ">

            <section className="text-white font-bold font-sans sm:text-base md:text-lg lg:text-xl xl:text-xl pl-2 cursor-pointer hover:text-yellow-300">
                <i className='bx bx-task pr-2' ></i>Task Manager
            </section>

            <section className="xs:hidden w-80  h-8 border shadow-md flex items-center bg-white rounded font-serif">
                <i className='bx bx-search px-3 cursor-pointer text-sky-400'></i>
                <input className="w-full focus:outline-none h-full" type="text"
                 placeholder="Search ..."
                 onChange={(e)=>setSearchQuery(e.target.value)}
                  />
            </section>

            <section className="text-white flex items-center cursor-pointer">
                <i className='bx bx-bell text-2xl pr-2 xs:pr-5 hover:text-red-600'></i>
                <div className="border-2  border-emerald-600 shadow-2xl h-8 w-8 rounded-full flex justify-center items-center uppercase text-xl p-0 font-serif bg-emerald-600 font-semibold">
                          {user?.username[0]}
                </div>  
                <h3 className="pl-2 xs:hidden font-serif sm:pr-3 capitalize">{user?.username}</h3>
                <button 
                className='bx bx-log-out-circle text-2xl font-bold hover:scale-125 ease-in-out duration-300 text-red-600 xs:ml-3'
                onClick={handleLogOut} 
                ></button>
            </section>

        </nav>
    )
}