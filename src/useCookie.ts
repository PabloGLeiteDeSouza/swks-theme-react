import { useState } from 'react';

const useCookie = () => {
  const [cookie, SetCookie] = useState<string>(document.cookie);

  const setCookie = (key: string, value: string) => {
    let cookieset = JSON.parse(cookie);
    cookieset[key] = value;
    SetCookie(JSON.stringify(cookieset));
  };

  const getCookie = (key: string) => {
    return JSON.parse(cookie)[key];
  };
  return { setCookie, getCookie };
};

export default useCookie;
