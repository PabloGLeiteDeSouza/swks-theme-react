import { useContext } from 'react';
import { ThemeContext } from './provider';

export default function useThemeObject() {
  const context = useContext(ThemeContext);
  return {
    theme: context.theme,
    setTheme: context.setTheme,
    toggleThemeDefault: context.toggleThemeDefaultDOM,
    toggleThemeCustom: context.toggleThemeCustomDOM,
    EventConfig: context.EventConfig,
  };
}
