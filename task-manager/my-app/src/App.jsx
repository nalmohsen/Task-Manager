
import Header from './components/Header';
import Home from './components/Home';
import { useContext, useEffect } from "react";
import IntroPage from "./components/IntroPage";
import { AppContext } from './components/ContextAPI';
const baseUrl = process.env.REACT_APP_BASE_URL;

function App() {
  const { setUser,user,isLoggedIn } = useContext(AppContext)
  useEffect(() => {
    fetch(`${baseUrl}/profile`, {
      credentials: 'include'
    }).then((result) => result.json().then((data) => {
      if (data.status) {
        setUser(data.user)
        console.log(data)
      } else console.log(data)
    }))
      .catch((err) => console.log(err))
  }, [isLoggedIn])

  return (
    <>
      { user ?
        (<>
          <Header />
          <Home />
        </>) :
        <IntroPage />
      }
    </>
  )
}

export default App;
