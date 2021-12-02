export const isLoggedIn =(axios)=>{    
    return axios && axios.defaults.headers["X-Authorization"] !== "-";
}