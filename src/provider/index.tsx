import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ThemeContextType, ThemeProviderProps } from './types';
import { Start } from '../Start';
import useCookie from '../useCookie';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleThemeDefault: () => {},
  toggleThemeCustom: () => {},
  EventConfig: {
    setThemeConfig: { type: 'attribute', value: 'data-set-theme' },
    chooseThemeConfig: { type: 'attribute', value: 'data-choose-theme' },
    toggleThemeDefaultConfig: {
      type: 'attribute',
      value: 'data-toggle-default-theme',
    },
    toggleThemeCustomConfig: {
      type: 'attribute',
      value: 'data-toggle-custom-theme',
    },
  },
});

export function ThemeProvider({ children, config }: ThemeProviderProps) {

  const [theme, SetTheme] = useState('light'),
    DefaultTheme = config.DefaultTheme,
    { getCookie, setCookie } = useCookie(),
    cookieIsActive = config.cookieIsActive ? config.cookieIsActive : false,
    StorageKey = config.StorageKey ? config.StorageKey : 'theme',
    DocumentAttributeKey = config.DocumentAttributeKey
      ? config.DocumentAttributeKey
      : 'data-theme',
    EventConfig = config.EventConfig;

  const setTheme = useCallback(
    (theme: string) => {
      if (cookieIsActive) {
        setCookie(StorageKey, theme);
      } else {
        localStorage.setItem(StorageKey, theme);
      }
      document.documentElement.setAttribute(DocumentAttributeKey, theme);
      SetTheme(theme);
    },
    [StorageKey, DocumentAttributeKey, cookieIsActive, setCookie]
  );

  const toggleThemeDefault = useCallback(() => {
    if (cookieIsActive) {
      return setTheme(getCookie(StorageKey) === 'light' ? 'dark' : 'light');
    }
    return setTheme(
      localStorage.getItem(StorageKey) === 'light' ? 'dark' : 'light'
    );
  }, [StorageKey, cookieIsActive, setTheme, getCookie]);

  const toggleThemeCustom = useCallback(
    (themes: string[]) => {
      const index = themes.findIndex(e => {
        if (cookieIsActive) {
          return e === getCookie(StorageKey);
        }
        return e === localStorage.getItem(StorageKey);
      });

      if (index + 1 < themes.length) {
        setTheme(themes[index + 1]);
      } else {
        setTheme(themes[0]);
      }
    },
    [StorageKey, cookieIsActive, setTheme, getCookie]
  );

  const StartEventsCallback = useCallback(() => {
    Start({ setTheme, toggleThemeCustom, toggleThemeDefault, EventConfig });
  }, [setTheme, toggleThemeCustom, toggleThemeDefault, EventConfig]);
  const startCallback = useCallback(() => {
    const StoredTheme = localStorage.getItem(StorageKey);
    const DocumentTheme = document.documentElement.getAttribute(
      DocumentAttributeKey
    );
    if (StoredTheme) {
      setTheme(StoredTheme);
    }
    if (DefaultTheme) {
      setTheme(DefaultTheme);
      return;
    }
    if (DocumentTheme) {
      setTheme(DocumentTheme);
      return;
    }
    setTheme('light');
  }, [DefaultTheme, setTheme, StorageKey, DocumentAttributeKey]);

  useEffect(() => {
    StartEventsCallback();
    startCallback();
  }, [startCallback, StartEventsCallback]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleThemeDefault,
        toggleThemeCustom,
        EventConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
