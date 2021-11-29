const checkError = (result)=>{
    if(result && (result.error || result.code === "InternalServer")){
        throw new Error(result.error);
    }
    return result;
}
export default checkError;