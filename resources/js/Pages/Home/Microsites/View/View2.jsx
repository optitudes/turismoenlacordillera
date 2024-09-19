import { useEffect, useState } from "react";
import {Head } from '@inertiajs/react';
import Video from "@/Components/Video";
import Image from "@/Components/Image";
import MicrositeInfo from '@/Pages/Home/Microsites/View/Components/MicrositeInfo1';
import Experiences2 from '@/Pages/Home/Microsites/View/Components/Experiences2';

export default function View2({ information }) {
  const [microsite, setMicrosite] = useState(information.microsite);
  const [theme, setTheme] = useState(information.theme);
  const [venture, setVenture] = useState(information.venture);
  const [user, setUser] = useState(information.user);
  const [experiences] = useState(information.experiences);

  useEffect(() => {
    console.log(experiences);
  }, []);

  return (
    <>
      <Head title={venture.name} />
      <Video isBanner={true} videoId="NKealNqjWR8" />
      <MicrositeInfo bannerUrl={microsite.bannerImageUrl} name={venture.name} description={microsite.description} />
      <Experiences2 experienceList={experiences}/>
    </>
  );
}
