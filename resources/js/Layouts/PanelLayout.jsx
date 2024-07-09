import ApplicationLogo from '@/Components/ApplicationLogo';
import BackgroundImage from '@/Assets/Backgrounds/greenBorder.png'
import CustomSidebar from '@/Pages/Panel/Partials/CustomSidebar';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link , useForm} from '@inertiajs/react';
import {useState,useEffect} from 'react';
import {clearLocalStorage, getUserToken,} from "@/LocalStorage/localStorage";
import NavLink from '@/Components/NavLink';
import Colors from "@/Constants/Colors.js";
import httpClient from "@/Utils/httpClient";

export default function PanelLayout({ children}) {
    const { post} = useForm({});


    const [isSessionUser, setIsSessionUser] = useState(null);

     useEffect(() => {
        if (getUserToken() != null ){
            setIsSessionUser(true);
        }else{
            setIsSessionUser(false);
        }
    }, []);

    const logout = async () =>{
        try {
            const response = await httpClient.post("auth/logout");
            if (response.data.success) {
                console.log(response.data);
                clearLocalStorage();
                setIsSessionUser(false);
                post(route('logout'))
                
            } else {
                console.log(response.data);
                alert(response.data.message);
            }
        } catch (error) {
            console.log( error);
        }

    }
    return (
         <div className="min-h-screen  " 
          style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
                }}
         >
            <nav className="border-b border-black   h-full" style={{ backgroundColor: Colors.primaryDark }}>
                    <div className="flex  justify-around items-center ">
                        <div className="shrink-0 flex items-center block  w-auto fill-current ">
                            <Link href="/" className=' h-16 w-full py-2'>
                                <ApplicationLogo className=' items-center h-16 w-full' />
                            </Link>
                        </div>
                        <div className='flex  justify-center'>
                            <div className="grid grid-cols-3  md:grid-cols-3 lg:grid-cols-6 gap-4 text-white">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    Inicio 
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('blogs')}>
                                    Blogs 
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('ventures')}>
                                    Empresas 
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('tourisRoutes')}>
                                    Rutas Turísticas 
                                </NavLink>
                                {isSessionUser != null?
                                <>
                                    {(isSessionUser)?
                                    <>
                                        <NavLink href={route('login')} active={route().current('panel')}>
                                            Panel 
                                        </NavLink>

                                        <ResponsiveNavLink
                                            as="button"
                                            onClick={logout}
                                        >
                                            Salir 
                                        </ResponsiveNavLink>
                                        
                                    </>:
                                    <>
                                        <NavLink href={route('login')} active={route().current('login')}>
                                            Ingresar 
                                        </NavLink>
                                        <NavLink href={route('register')} active={route().current('register')}>
                                            Registrarse 
                                        </NavLink>
                                    </>}
                                </>
                                :
                                <>
                                </>
                                }
                                
                            </div>
                        </div>
                    </div>
            </nav>
            <main className='flex justify-start'>
                <CustomSidebar></CustomSidebar>
                {children}
            </main>
        </div>
    );
}