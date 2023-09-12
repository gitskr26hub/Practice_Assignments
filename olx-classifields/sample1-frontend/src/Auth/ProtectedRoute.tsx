
import {Navigate, useLocation} from "react-router-dom"

const Protected = ({children}:{children:any}) => {
    let location = useLocation();
    const token=JSON.parse(sessionStorage.getItem('user_token')!);
    // console.log(token)
    if(!token?.token) {
        return <Navigate to="/" state={{ from: location}} replace />
    }
 return children

};

export default Protected;