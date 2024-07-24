import  { createContext, useContext, useState } from 'react';

const MicrositeInfoContext = createContext();

export const useMicrositeInfo = () => {
  return useContext(MicrositeInfoContext);
};

export const MicrositeInfoProvider = ({ children,microsite }) => {
  const [micrositeInfo, setMicrositeInfo] = useState(microsite);

  return (
    <MicrositeInfoContext.Provider value={{ micrositeInfo,setMicrositeInfo  }}>
      {children}
    </MicrositeInfoContext.Provider>
  );
};
