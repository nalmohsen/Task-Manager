import { useState } from "react";
const baseUrl = process.env.REACT_APP_BASE_URL;


export default function SignUpModel({ props }) {
    const { setShowSignUp, setShowLogin } = props
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleSignUp=function(event){
        event.preventDefault();
        const data={username,email,password}
        fetch(`${baseUrl}/register`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{'Content-Type':'application/json'}
        }).then((result)=>result.json().then(data=>{
            if(data.status){
                setShowLogin(true)  
                setShowSignUp(false)
                alert(`${data.message}`)
            }else alert(`${data.message}`)
        })).catch(err=>console.log(err))
    }
    return (
        <form className="border-6 xs:h-3/4 border-neutral-300 shadow-xl p-5 h-2/3 w-72 flex rounded-lg bg-slate-300 flex-col justify-center items-center">
            <i className='bx bx-user-circle text-9xl h-42 w-42 '></i>
            <h1 className="font-serif uppercase">Create an Account</h1>

            <div className=" border-yellow-800 border-2 rounded-2xl shadow-lg flex items-center px-3 mt-3">
                <i className='bx bx-user-circle text-2xl font-thin pr-1 text-yellow-700'></i>
                <input type="text" className="text-orange-900 font-serif focus:outline-none bg-transparent" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
            </div>

            <div className=" border-yellow-800 border-2 rounded-2xl shadow-lg flex items-center px-3 mt-3">
                <i className='bx bxl-gmail text-2xl font-thin pr-1 text-yellow-700'></i>
                <input type="email" className="text-orange-900 font-serif focus:outline-none bg-transparent" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div className="border-yellow-800 border-2 rounded-2xl shadow-lg flex items-center px-3 mt-3">
                <i className='bx bxs-lock-alt text-2xl font-thin pr-1 text-yellow-700'></i>
                <input type="password" className=" text-orange-900 font-serif bg-transparent focus:outline-none" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button className="font-serif px-7 shadow-lg rounded-3xl bg-yellow-600 hover:bg-yellow-700 py-1 mt-2"
                type="button"
                onClick={handleSignUp}
            >Register
            </button>

            <div className="flex flex-col justify-center items-center pt-5">
                <p className="text-sm  font-serif">Already registered? </p>
                <button className="border-yellow-800 font-serif shadow-lg border-2 mt-1 py-1 px-7 hover:border-yellow-600 rounded-3xl"
                    type="button"
                    onClick={() => { setShowSignUp(false); setShowLogin(true) }}>
                    LogIn
                </button>
            </div>
        </form>
    )
}

