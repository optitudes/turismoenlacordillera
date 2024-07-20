import {useState,useEffect} from 'react';

import {Gear, List, User,UserCircleGear,Desktop,UserList, 
        House, ArchiveBox,PlusCircle,Mountains, Browser,
        FloppyDiskBack,MapPin,ArrowLeft,ArrowRight,
        Wrench } from '@phosphor-icons/react';

import  Colors from "@/Constants/Colors";
import { Link } from '@inertiajs/react';
import { Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import { useUserInfo } from '@/Pages/Panel/Context/UserInfoContext';

const CustomSidebar = () => {
  const [toggled, setToggled] = useState(true);
    const { roleInfo } = useUserInfo();
  const toggle = () => {
    setToggled(!toggled);
  }
const [isLargeScreen, setIsLargeScreen] = useState(
  window.innerWidth < 768 ? false : true 
);

const handleResize = () => {
  setIsLargeScreen(window.innerWidth < 768 ? false : true);
};

useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);


  return (

    <Sidebar
      backgroundColor={Colors.pinkSoft}
      rtl={false}
      style={{ height: "145vh" }}
      collapsed = {toggled}
    >
    <Menu>
      <MenuItem
        icon={<House/>}  
        component={<Link href={route('dashboard')} className='h-16 w-full py-2' />}
        >
            Inicio 
       </MenuItem>
      <SubMenu icon={<Gear/>} label="Ajustes">

        <MenuItem 
          rootStyles={{backgroundColor:Colors.primarySoft}}
          icon={<User/>}  
          component={<Link href={route('profile.edit')} className='h-16 w-full py-2' />}
        >
          Perfil 
         </MenuItem>

        {(roleInfo && (roleInfo.rol == "admin" || roleInfo.rol == "root") )?
            <MenuItem 
              rootStyles={{backgroundColor:Colors.primarySoft}}
              icon={<Browser/>}  
              component={<Link href={route('panel.settings.mainpage')} className='h-16 w-full py-2' />}
            >
              Página Principal 
            </MenuItem>
         :<></>}
      </SubMenu>

  {(roleInfo && (roleInfo.rol == "admin" || roleInfo.rol == "root") )?
      <SubMenu icon={<UserCircleGear/>} label="Administrador">

        <SubMenu rootStyles={{backgroundColor:Colors.primarySoft}} icon={<User/>} label="Usuarios">
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<UserList/>} onClick={() => console.log("list usaer")}> Lista </MenuItem>
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<Gear/>} onClick={() => console.log("users settings")} > Ajustes </MenuItem>
        </SubMenu>
        <SubMenu rootStyles={{backgroundColor:Colors.primarySoft}} icon={<Desktop/>}label="Micrositios">
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<List/>} >  Lista </MenuItem>
            <MenuItem
              rootStyles={{backgroundColor:Colors.primarySoft}}
              icon={<ArchiveBox/>}
              component={<Link href={route('panel.admin.microsites.solicitudes')} className='h-16 w-full py-2' />}
               >
                Solicitudes
            </MenuItem>
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<Gear/>}> Ajustes </MenuItem>
        </SubMenu>
        <SubMenu rootStyles={{backgroundColor:Colors.primarySoft}} icon={<MapPin/>} label="Rutas turísticas">
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<List/>}> Lista </MenuItem>
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<PlusCircle/>}> Crear </MenuItem>
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<Gear/>}> Ajustes </MenuItem>
        </SubMenu>

      </SubMenu>
  :<></>}

  {(roleInfo  && roleInfo.rol == "emprendedor")?
      <SubMenu icon={<Desktop/>} label="Micrositio">

        <MenuItem 
          rootStyles={{backgroundColor:Colors.primarySoft}}
          icon={<Wrench/>}
          component={<Link href={route('panel.microsite.settings')} className='h-16 w-full py-2' />}
         >
           Ajustes  
         </MenuItem>



        <SubMenu rootStyles={{backgroundColor:Colors.primarySoft}} icon={<Mountains/>} label="Sitios de interés">
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<List/>}> Lista </MenuItem>
            <MenuItem  rootStyles={{backgroundColor:Colors.primarySoft}}icon={<Gear/>}> Ajustes </MenuItem>
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<FloppyDiskBack/>}> Backup </MenuItem>
        </SubMenu>

        <SubMenu icon={<MapPin/>} label="Rutas turísticas">
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<List/>}> Lista </MenuItem>
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<Gear/>}> Ajustes </MenuItem>
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<FloppyDiskBack/>}> Backup </MenuItem>
        </SubMenu>

      </SubMenu>
  :<></>}

    {isLargeScreen ? (
      toggled ? (
        <MenuItem onClick={toggle}><ArrowRight/></MenuItem>
      ) : (
        <MenuItem onClick={toggle}><ArrowLeft/></MenuItem>
      )
    ) : (
      <></>
    )}

    </Menu>
  </Sidebar>
  
  );
};

export default CustomSidebar;
