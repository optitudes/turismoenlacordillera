import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserInfo } from "@/LocalStorage/localStorage";
import httpClient from "@/Utils/httpClient";

const UserInfoContext = createContext();

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};

export const UserInfoProvider = ({ children }) => {
  const [roleInfo, setRoleInfo] = useState(getUserInfo()?.role || { "rol": "cliente" });
  const [userInfo, setUserInfo] = useState(getUserInfo()??null);

  const fetchUserInfo = async () => {
      await httpClient.get("users/getSessionUserInfo")
          .then(response => {setUserInfo(response.data.payload);setRoleInfo(response.data.payload.role)})
          .catch(error => console.log(error));
      return null;
  }
  useEffect(() => {
    var newUserInfo = getUserInfo();
    if(newUserInfo == null){
      fetchUserInfo();
    }
    setRoleInfo(newUserInfo ? newUserInfo.role : { "rol": "cliente" });
    setUserInfo(newUserInfo);
  }, []);

  const updateRoleInfo = (newRoleInfo) => {
    setRoleInfo(newRoleInfo);
  };
  const updateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  return (
    <UserInfoContext.Provider value={{ roleInfo, updateRoleInfo,updateUserInfo,userInfo,fetchUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
