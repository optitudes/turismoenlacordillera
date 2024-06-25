export function getUserToken(){
    try{
        const item = window.localStorage.getItem("token");
        return item ? item : null;    
    }catch (error){
        console.log(error);
    }
}
export function setUserToken(token){
    try {
        window.localStorage.setItem("token", token);
    } catch (error) {
        console.error(error);
    }
}
export function getUserInfo(){
    try{
        const item = window.localStorage.getItem("userInfo");
        return item ? JSON.parse(item) : null;     
    }catch (error){
        console.log(error);
    }
}
export function setUserInfo(userInfo){
    try {
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
        console.error(error);
    }
}
export function clearLocalStorage() {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  }