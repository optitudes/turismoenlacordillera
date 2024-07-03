
import {useEffect} from 'react';
import Panel from "@/Assets/panel.png";
import CustomSidebar from '@/Pages/Panel/Partials/CustomSidebar';
import Background from "@/Assets/Backgrounds/greenBorder.png";
import {setUserInfo, setUserToken,} from "@/LocalStorage/localStorage";
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth,token,userInfo}) {

    useEffect(() => {
        setUserToken(token);
        setUserInfo(userInfo);
    }, [token]);


    return (
            <>
            <Head title="Dashboard" />
            <CustomSidebar></CustomSidebar>
            <div className='w-full  justify-center items-center '>

            <img 
                    src={Panel} 
                    alt="Panel" 
                    className="mx-auto my-auto block" 
                    style={{ width: '1000px', height: 'auto' }}
                />

           
            </div> 
            </>
    );
}