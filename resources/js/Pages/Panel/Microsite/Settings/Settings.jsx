
import { useEffect,useState } from 'react';
import { Head } from '@inertiajs/react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


export default function Settings({micrositeInfo}) {
    const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
        console.log(micrositeInfo);
    },[])
    return (
            <>
            <Head title="Ajustes de micrositio" />

 <Box className="bg-white w-full" sx={{ maxWidth: { xs: 300, sm: '100%' } }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList 
            className='text-salmon'
            onChange={handleChange} 
            variant="scrollable"
            scrollButtons="auto"
            textColor="inherit"
            indicatorColor="secondary"
            allowScrollButtonsMobile
            >
            <Tab label="General" value="1" />
            <Tab label="Experiencias" value="2" />
            <Tab label="Rutas Túristicas" value="3" />
            <Tab label="Sitios de intere's" value="4" />
            <Tab label="Sitios de intere's" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">General</TabPanel>
        <TabPanel value="2">Experiencas</TabPanel>
        <TabPanel value="3">turs</TabPanel>
        <TabPanel value="4">Sitios de interes interesantes</TabPanel>
        <TabPanel value="5">Sitios de interes interesantes</TabPanel>
      </TabContext>
    </Box>
            </>
    );
}