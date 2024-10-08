import axios from "axios";
import { clearLocalStorage,getUserToken } from "@/LocalStorage/localStorage";

const instance = axios.create({
   baseURL: 'http://localhost:8000/api/',
   timeout: 30000,
   headers: {
     'Accept': 'application/json'
   }
});

instance.interceptors.request.use(
 function(config) {
  const token = getUserToken(); 
  if (token != null) {
    config.headers["Authorization"] = "Bearer "+token;
  }
  return config;
 },
 function(error) {
  return Promise.reject(error);
 }
);

instance.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {

      if (error.response.status === 401) {
        clearLocalStorage();
        // Ejecutar la función de redirección cuando ocurra un error 401
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
export default instance;
