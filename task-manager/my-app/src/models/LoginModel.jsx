import { useContext, useState } from "react";
import SignUpModel from "./SignUpModel";
import { AppContext } from "../components/ContextAPI";
const baseUrl = process.env.REACT_APP_BASE_URL;

export default function LoginModel({ props }) {
  let { setShowLogin } = props;
  const [showSignUp, setShowSignUp] = useState(false)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {setUser,setIsLoggedIn}=useContext(AppContext)

  const handleLogin=function(event){
    event.preventDefault();
    const data={email,password}
    fetch(`${baseUrl}/login`,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{'Content-Type':"application/json"},
      credentials:'include'
    }).then((result)=>result.json().then((data)=>{
       if(data.status){
        setUser(data.user)
        setIsLoggedIn(true)
        setShowLogin(false)
        alert(`${data.message}`)
       }else alert(`${data.message}`)
    })).catch(err=>console.log(err))
  }

  return (
    <div>
      <form className={`border-6 xs:h-3/4 border-neutral-300 shadow-xl p-5 h-2/3 w-72 flex rounded-lg bg-slate-300 flex-col justify-center items-center ${showSignUp ? 'hidden' : "visible"}`}>
        <i className='bx bx-user-circle text-9xl h-42 w-42 '></i>
        <h1 className="font-serif">USER LOGIN</h1>

        <div className=" border-yellow-800 border-2 rounded-2xl shadow-lg flex items-center px-3 mt-3">
          <i className='bx bxl-gmail text-2xl font-thin pr-1 text-yellow-700'></i>
          <input type="email" className="text-orange-900 font-serif focus:outline-none bg-transparent" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        </div>

        <div className="border-yellow-800 border-2 rounded-2xl shadow-lg flex items-center px-3 mt-3">
          <i className='bx bxs-lock-alt text-2xl font-thin pr-1 text-yellow-700'></i>
          <input type="password" className="text-orange-900 font-serif focus:outline-none bg-transparent" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        </div>

        <button className="font-serif px-7 shadow-lg rounded-3xl bg-yellow-600 hover:bg-yellow-700 py-1 mt-2"
          type="button"
          onClick={handleLogin}
        >LogIn</button>

        <div className="flex flex-col justify-center items-center pt-5">
          <p className="text-sm  font-serif">Don't have an account? </p>
          <button className="border-yellow-800 font-serif shadow-lg border-2 mt-1 py-1 px-7 hover:border-yellow-600 rounded-3xl"
            type="button"
            onClick={() => setShowSignUp(true)}>
            Register
          </button>
        </div>
      </form>
      <div className={`${showSignUp ? "visible" : "hidden"}`}>
        <SignUpModel props={{ setShowSignUp, setShowLogin }} />
      </div>
    </div>
  )
}