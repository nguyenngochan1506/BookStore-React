import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const AdminRote = () => {
    const checkAdmin = useSelector(state => state.userState.user.listRole.includes('ADMIN'))
    return checkAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRote