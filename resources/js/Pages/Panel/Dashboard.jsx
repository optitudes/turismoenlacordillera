
import {useEffect} from 'react';
import Panel from "@/Assets/panel.png";
import {setUserInfo, setUserToken,} from "@/LocalStorage/localStorage";
import { Head } from '@inertiajs/react';

import { useUserInfo } from '@/Pages/Panel/Context/UserInfoContext';

export default function Dashboard({ auth,token,userInfo}) {
    const {updateRoleInfo,updateUserInfo } = useUserInfo();

    useEffect(() => {
        console.log(token);
        //almacenamiento en el localStorage
        setUserToken(token);
        setUserInfo(userInfo);
        //guardado de info en el context
        updateUserInfo(userInfo);
        updateRoleInfo(userInfo.role);
    }, [token]);

    return (
            <>
            <Head title="Dashboard" />
            <div className='justify-start'>
            <img 
                    src={Panel} 
                    alt="Panel" 
                    className="mx-auto my-auto block" 
                    style={{ width: '1900px', height: 'auto' }}
                />
            </div> 
            </>
    );
}