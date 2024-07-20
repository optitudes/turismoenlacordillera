import BackgroundImage from '@/Assets/Backgrounds/greenBorder.png'
import CustomSidebar from '@/Pages/Panel/Components/CustomSidebar';

import { UserInfoProvider } from '@/Pages/Panel/Context/UserInfoContext';

import NavBar from '@/Layouts/Components/NavBar';
export default function PanelLayout({ children}) {
   
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
              <UserInfoProvider>
                <main className='flex justify-start'>
                    <CustomSidebar/>
                    {children}
                </main>
            </UserInfoProvider>
        </div>
    );
}