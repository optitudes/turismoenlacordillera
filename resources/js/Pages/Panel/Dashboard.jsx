
import {useEffect} from 'react';
import Panel from "@/Assets/panel.png";
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