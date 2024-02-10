import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ThemeContextType, ThemeProviderProps } from './types';
import { useCookies } from 'react-cookie';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleThemeDefault: () => {},
  toggleThemeDefaultDOM: () => {},
  toggleThemeCustom: () => {},
  toggleThemeCustomDOM: () => {},
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
    [cookies, setCookie] = useCookies(),
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
    return setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  const toggleThemeDefaultDOM = useCallback(() => {
    if (cookieIsActive) {
      return setTheme(cookies[StorageKey] === 'light' ? 'dark' : 'light');
    }
    return setTheme(
      localStorage.getItem(StorageKey) === 'light' ? 'dark' : 'light'
    );
  }, [StorageKey, cookieIsActive, setTheme, cookies]);

  const toggleThemeCustom = useCallback(
    (themes: string[]) => {
      const index = themes.findIndex(e => {
        return e === theme;
      });

      if (index + 1 < themes.length) {
        setTheme(themes[index + 1]);
      } else {
        setTheme(themes[0]);
      }
    },
    [setTheme, theme]
  );

  const toggleThemeCustomDOM = useCallback(
    (themes: string[]) => {
      const index = themes.findIndex(e => {
        if (cookieIsActive) {
          return e === cookies[StorageKey];
        }
        return e === localStorage.getItem(StorageKey);
      });

      if (index + 1 < themes.length) {
        setTheme(themes[index + 1]);
      } else {
        setTheme(themes[0]);
      }
    },
    [StorageKey, cookieIsActive, setTheme, cookies]
  );

  const startCallback = useCallback(() => {
    const StoredTheme = cookieIsActive
      ? cookies[StorageKey]
      : localStorage.getItem(StorageKey);
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
  }, [
    DefaultTheme,
    setTheme,
    StorageKey,
    DocumentAttributeKey,
    cookieIsActive,
    cookies,
  ]);

  useEffect(() => {
    startCallback();
  }, [startCallback]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleThemeDefault,
        toggleThemeDefaultDOM,
        toggleThemeCustom,
        toggleThemeCustomDOM,
        EventConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
