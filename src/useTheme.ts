import { useContext } from 'react';
import { ThemeContext } from './provider';

export default function useTheme() {
  return useContext(ThemeContext);
}
