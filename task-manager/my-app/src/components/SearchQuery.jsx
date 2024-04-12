import { useContext } from "react"
import { AppContext } from "./ContextAPI"

export default function SearchQuery(){
    const {searchQuery}=useContext(AppContext)
       return(
          <div className="font-serif text-sky-500 m-6 text-xl xs:hidden">
                  Searching for "{searchQuery}"
          </div>
       )
}