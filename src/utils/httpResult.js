const checkError = (result)=>{
    if(result && result.error){
        throw new Error(result.error);
    }
    return result;
}
export default checkError;