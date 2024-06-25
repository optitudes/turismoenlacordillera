
import {useEffect} from 'react';
import Panel from "@/Assets/panel.png";
import CustomSidebar from '@/Pages/Panel/Partials/CustomSidebar';
import Background from "@/Assets/Backgrounds/greenBorder.png";
import {setUserInfo, setUserToken,} from "@/LocalStorage/localStorage";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth,token,userInfo}) {

    useEffect(() => {
        setUserToken(token);
        setUserInfo(userInfo);
    }, [token]);


    return (
        <GuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
                }}
        >
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
        </GuestLayout>
    );
}