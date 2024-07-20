
import { useEffect } from 'react';
import { Head } from '@inertiajs/react';


export default function Settings({micrositeInfo}) {

    useEffect(() => {
        console.log(micrositeInfo);
    },[])
    return (
            <>
            <Head title="Ajustes de micrositio" />
            
            </>
    );
}