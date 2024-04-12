import { useContext, useState ,useEffect } from "react"
import CreateTask from './CreateTask'
import GetTasks from "./GetTasks"
import { AppContext } from "./ContextAPI"
import SearchQuery from "./SearchQuery"

export default function Home() {
    const [slide, setSlide] = useState(true)
    const [isXsScreen,setIsXsScreen]=useState(false)
    const [selectSlideValue, setSelectSlideValue] = useState("My Day")
    const [order, setOrder] = useState("createdAt")
    const {searchQuery,setSearchQuery} =useContext(AppContext)
    function toggleSidebar() {
        setSlide(!slide)
    }
    const selectedSlideStyle = "bg-sky-100 border-l-2 border-violet-800 hover:bg-sky-100"
    
    const checkScreenSize = function (){
        console.log(window.innerWidth >= 691)
        if(window.innerWidth >= 691){
            setSlide(true)
            setIsXsScreen(false)
        } else {
          setSlide(false)
          setIsXsScreen(true)
          setSearchQuery("")
        }
      };

      useEffect(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize); 
        return () => window.removeEventListener("resize", checkScreenSize);
      }, []);

      useEffect(()=>{
           if(isXsScreen) setSlide(!slide)
      },[selectSlideValue])

    return (
        <div className="h-screen flex mt-12 fixed top-0 right-0 left-0">

            <section className="absolute left-6 text-2xl pt-5 cursor-pointer"
                onClick={toggleSidebar} >
                <i className='bx bx-menu'></i>
            </section>

            <section className={` shadow-r-md w-1/4 h-screen rounded-md bg-slate-50 ${slide ? 'xs:w-3/4' : 'hidden'} font-serif `} >
                <div className="py-8"> </div>
                <div className={`hover:bg-sky-50 px-6 py-3 cursor-pointer ${selectSlideValue === "My Day" ? selectedSlideStyle : ""}`} onClick={() => setSelectSlideValue("My Day")}><i className='bx bx-sun pr-3'></i> My Day</div>
                <div className={`hover:bg-sky-50 px-6 py-3 cursor-pointer ${selectSlideValue === "Importance" ? selectedSlideStyle : ""}`} onClick={() => setSelectSlideValue("Importance")} > <i className='bx bx-star pr-3' ></i> Importance</div>
                <div className={`hover:bg-sky-50 px-6 py-3 cursor-pointer ${selectSlideValue === "Planned" ? selectedSlideStyle : ""}`} onClick={() => setSelectSlideValue("Planned")}><i className='bx bx-calendar pr-3' ></i> Planned</div>
                <div className={`hover:bg-sky-50 px-6 py-3 cursor-pointer ${selectSlideValue === "Completed" ? selectedSlideStyle : ""}`} onClick={() => setSelectSlideValue("Completed")}><i className='bx bx-check-double pr-3'></i> Completed</div>
                <div className={`hover:bg-sky-50 px-6 py-3 cursor-pointer ${selectSlideValue === "Overdue" ? selectedSlideStyle : ""}`} onClick={() => setSelectSlideValue("Overdue")}><i className='bx bx-time pr-4'></i>Overdue</div>
                <div className={`hover:bg-sky-50 px-6 py-3 cursor-pointer ${selectSlideValue === "Tasks" ? selectedSlideStyle : ""}`} onClick={() => setSelectSlideValue("Tasks")}><i className='bx bx-home-alt pr-3 ' ></i> Tasks</div>
            </section> 

            <section className={`border h-screen rounded-md  ${slide ? 'w-3/4 xs:hidden' : 'w-screen xs:visible'} bg-white flex-wrap`}>
                <header className="flex justify-between">
                    <div>
                        <div className="pl-12 py-5">
                            <h1 className="font-sans font-semibold text-lg xs:text-base">{slide ? <i className='bx bx-sun pr-2'></i> : ''}{selectSlideValue}</h1>
                            <span className="pl-auto  text-sm font-thin font-sans">{new Date().toDateString()}</span>
                        </div>
                    </div>

                    <div className=" flex justify-center items-center font-sans text-md xs:text-sm xs:pr-5 pr-10">
                        <i className='bx bx-sort-alt-2 xs:w-3'></i>
                        <select className="cursor-pointer font-serif hover focus:outline-none" onClick={(e) => setOrder(e.target.value)}>
                            <option value={'Sort'}>Sort</option>
                            <option value={"isImp"}>Importance</option>
                            <option value={"dateScheduled"}>Scheduled Date</option>
                            <option value={"createdAt"}>Creation Date</option>
                        </select>  
                    </div>
                </header>

                {searchQuery ? <SearchQuery/> : <CreateTask /> }
            
                <div className="overflow-y-auto h-4/6 py-2 xs:h-screen">
                    <GetTasks query={{ selectSlideValue, order }} />
                </div>
            </section>

        </div>
    )
}