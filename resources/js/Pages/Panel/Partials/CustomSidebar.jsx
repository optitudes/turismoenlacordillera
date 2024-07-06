import {useState} from 'react';
import {Gear, List, User,UserCircleGear,Desktop,UserList, 
        House, ArchiveBox,PlusCircle,Mountains, SignOut,
        FloppyDiskBack,MapPin,ArrowLeft,ArrowRight } from '@phosphor-icons/react';
import  Colors from "@/Constants/Colors";
import { Link } from '@inertiajs/react';

import { Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';


const CustomSidebar = () => {
  const [toggled, setToggled] = useState(true);

  const toggle = () => {
    setToggled(!toggled);
  }
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
      </SubMenu>

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
      <SubMenu icon={<Desktop/>} label="Micrositio">

        <SubMenu rootStyles={{backgroundColor:Colors.primarySoft}} label="Contenido">
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<List/>}> Lista </MenuItem>
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<Gear/>}> Ajustes </MenuItem>
            <MenuItem rootStyles={{backgroundColor:Colors.primarySoft}} icon={<FloppyDiskBack/>}> Backup </MenuItem>
        </SubMenu>

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
      {toggled?

      <MenuItem onClick={toggle} > <ArrowRight/> </MenuItem>
      :
      
      <MenuItem onClick={toggle} > <ArrowLeft/> </MenuItem>
      }
    </Menu>
  </Sidebar>
  
  );
};

export default CustomSidebar;
