import { useState } from "react";
import LoginModel from "../models/LoginModel";


export default function IntroPage() {
    const [showLogin, setShowLogin] = useState(false)
    return (
        <div className="h-screen w-screen items-center flex  justify-evenly bg-white">
            <div className="h-3/4 w-1/4 xs:hidden"><img src="/images/welcome-left.png" alt="img-1" /></div>

            <div className="flex flex-col justify-center items-center  p-0">
                <div className="h-24 w-24"> <img src="/images/logo.png" alt="logo" /> </div>
                <h1 className="font-semibold  text-gray-600 text-4xl pt-3  text-center font-serif xs:text-xl xs:pb-3">Welcome to TaskTrack</h1>
                <p className="text-xl text-gray-700 pt-5  xs:hidden font-serif ">Task Track gives you focus, from work to</p>
                <p className="text-xl text-gray-700 pb-5 xs:hidden font-serif">play</p>
                <div className="xs:visible w-2/4 py-3 sm:hidden"> <img src="/images/welcome-center.png" alt="" /> </div>
                <button className="bg-sky-700 border rounded-md px-6 py-2 shadow-xl font-bold text-white font-serif " onClick={() => setShowLogin(true)}>Get started</button>
                <span className="text-sky-700 pt-3 font-serif cursor-pointer"
                    onClick={() => { alert("To learn more about this project, please visit the repository.") }}>
                    Learn more
                </span>
            </div>

            <div className="h-3/4 w-2/12 xs:hidden"><img src="/images/welcome-right.png" alt="img-2" /></div>

            <div className={`fixed inset-0 flex justify-center backdrop-blur-sm items-center ${showLogin ? "" : 'hidden'}`}>
                {showLogin && <LoginModel props={{ setShowLogin }} />}

            </div>
        </div>
    )
}