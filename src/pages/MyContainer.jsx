import { Outlet, useNavigation } from "react-router-dom"
import { Footer, Header, Loading } from "../components"

const MyContainer = () => {
  const navigate = useNavigation();
  const isLoading = navigate.state === 'loading';
  return (
    <>
     <Header/>
     {!isLoading ? <Outlet/> : <Loading/>}
     <Footer/>   
    </>
  )
}

export default MyContainer