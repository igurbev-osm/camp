import { set } from "../features/user/userSlice";
import Cookies from 'universal-cookie';
import server from "../server/user";

const cookieName = "sid";

const UserManager = (useSelector, useDispatch) => {

    const dispatch = useDispatch()
    let user = useSelector((state) => state.user.value)?.payload;

    const cookies = new Cookies();
    
    const sid = validateSid(cookies.get(cookieName));
    const setUser = (user) => {
        if (user) {
            cookies.set(cookieName, user.sid);
        } else {
            cookies.remove(cookieName);
        }
        dispatch(set(user))
    };

    return {      
        getUserAsync: async () => {
            if (!user && sid) {
                user = await getUserInfo(sid);                
                if (user) {
                    setUser(user);
                }
            }
            return user;
        },
        getUser: ()=>{
            return user;
        },
        setUser: setUser,      
    };
}

const getUserInfo = async (sid) => {
    return await server.getUserInfo(sid);
}

const validateSid = (sid) =>{
    return sid && sid !== "" && sid !== "undefined" ? sid: null;
}

export default UserManager;