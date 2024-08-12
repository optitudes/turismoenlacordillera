
import { useEffect,useState } from 'react';
import { Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import General from '@/Pages/Panel/Microsite/Settings/Components/General';
import Theme from '@/Pages/Panel/Microsite/Settings/Components/Theme';
import {  MicrositeInfoProvider } from '@/Context/MicrositeInfoContext';


export default function Settings({micrositeInfo}) {
    const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{console.log(micrositeInfo)},[]);

    return (

            < MicrositeInfoProvider microsite={micrositeInfo}>
              <Head title="Ajustes de micrositio" />
              <Box className="w-full " sx={{ maxWidth: { xs: 300, sm: '100%' } }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList 
                      className='text-white bg-salmon   border-white  '
                      onChange={handleChange} 
                      variant="scrollable"
                      scrollButtons="auto"
                      textColor="inherit"
                      indicatorColor="primary"
                      allowScrollButtonsMobile
                      >
                      <Tab label="General" value="1" />
                      <Tab label="Tema" value="2" />
                      <Tab label="Documentos" value="3" />
                      <Tab label="Configuracion avanzada" value="4" />
                      <Tab label="Propiedad del micrositio" value="5" />
                    </TabList>
                  </Box>
                  <TabPanel value="1" className='bg-white'>
                    <General />
                  </TabPanel>
                  <TabPanel value="2" className='bg-white'>
                    <Theme />
                  </TabPanel>
                  <TabPanel value="3">turs</TabPanel>
                  <TabPanel value="4">Sitios de interes interesantes</TabPanel>
                  <TabPanel value="5">Sitios de interes interesantes</TabPanel>
                </TabContext>
              </Box>
            </MicrositeInfoProvider>
    );
}