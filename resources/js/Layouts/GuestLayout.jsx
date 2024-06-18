import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import Colors from "@/Constants/Colors.js"

export default function Guest({ children,style}) {
    return (
         <div className="min-h-screen  " style={style}>
            <nav className="border-b border-black   h-full" style={{ backgroundColor: Colors.primaryDark }}>
                    <div className="flex  justify-around items-center ">
                        <div className="shrink-0 flex items-center block  w-auto fill-current ">
                            <Link href="/" className=' h-16 w-full py-2'>
                                <ApplicationLogo className=' items-center h-16 w-full' />
                            </Link>
                        </div>
                        <div className='flex  justify-center'>
                            <div className="grid grid-cols-3  md:grid-cols-3 lg:grid-cols-6 gap-4 text-white">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Inicio 
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Blogs 
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Empresas 
                                </NavLink>
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Rutas Turísticas 
                                </NavLink>
                                <NavLink href={route('login')} active={route().current('dashboard')}>
                                    Ingresar 
                                </NavLink>
                                <NavLink href={route('register')} active={route().current('dashboard')}>
                                    Registrarse 
                                </NavLink>
                            </div>
                        </div>
                    </div>
            </nav>
            <main className='flex justify-center items-center min-h-screen'>
                {children}
            </main>
        </div>
    );
}