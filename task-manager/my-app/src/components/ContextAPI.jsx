import { createContext, useState } from "react";


const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [refreshTaskPage, setRefreshTaskPage] = useState(false)
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery,setSearchQuery]=useState("")

  console.log(user)
  return (
    <AppContext.Provider value={{
      refreshTaskPage,
      setRefreshTaskPage,
      user, setUser,
      isLoggedIn, setIsLoggedIn,
      searchQuery,setSearchQuery
    }} >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }