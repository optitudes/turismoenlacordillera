import { Eye, EyeSlash } from '@phosphor-icons/react';
import React, { useState } from 'react';

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const action = () => setVisible(!visible);

  const Icon = visible ? <EyeSlash size={'26px'} onClick={action}/> : <Eye size={'26px'} onClick={action}/>;

  const InputType = visible ? 'text' : 'password';

  return [
    InputType,
    Icon
  ]
}

export default usePasswordToggle;
