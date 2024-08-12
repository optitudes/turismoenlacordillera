import BackgroundImage from '@/Assets/Backgrounds/greenBorder.png'
import NavBar from '@/Layouts/Components/NavBar';
export default function GuestLayout({children}) {

    return (
         <div className="min-h-screen  " 
          style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
                }}
         >
            <NavBar />
            <main className='flex flex-col justify-center items-center '>
                {children}
            </main>
        </div>
    );
}