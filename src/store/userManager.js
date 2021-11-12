import { set } from "../features/user/userSlice";
import Cookies from 'universal-cookie';
import server from "../server/user";

const UserManager = (useSelector, useDispatch) => {

    const dispatch = useDispatch()
    let user = useSelector((state) => state.user.value)?.payload;

    const cookies = new Cookies();
    const cookieName = "sid";
    const sid = cookies.get(cookieName);
    const setUser = (user) => {
        if (user) {
            cookies.set(cookieName, user.sid);
        } else {
            cookies.remove(cookieName);
        }
        dispatch(set(user))
    };

    return {
        user: user,
        getUserAsync: async () => {
            if (!user && sid) {
                user = await getUserInfo(sid);
                if (user) {
                    setUser(user);
                }
            }
            return user;
        },
        setUser: setUser
    };
}

const getUserInfo = async (sid) => {
    return await server.getUserInfo(sid);
}

export default UserManager;