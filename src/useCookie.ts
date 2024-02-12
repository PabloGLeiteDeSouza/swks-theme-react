import { useCookies } from 'react-cookie';

const useCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const getCookie = (key: string) => cookies[key];
  return { cookies, getCookie, setCookie, removeCookie };
};

export default useCookie;
