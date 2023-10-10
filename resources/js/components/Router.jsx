import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Participant from "../pages/Participant";
import Login from "../pages/Login";
import CreateParticipant from "../pages/CreateParticipant";
import EditParticipant from "../pages/EditParticipant";
import Profile from "../pages/Profile";
function AppRoutes(){
    return(
    
        <Routes>
            <Route exat path="/participants" element={ <Participant /> }/>
            <Route exat path="/login" element={ <Login /> }/>
            <Route exat path="/" element={ <Home /> }/>
            <Route exat path="/create-participant" element={ <CreateParticipant /> }/>
            <Route exat path="/profile" element={ <Profile /> }/>
            <Route exat path="/edit-participant/:id" element={ <EditParticipant /> }/>
        </Routes>
    )
}
export default AppRoutes;