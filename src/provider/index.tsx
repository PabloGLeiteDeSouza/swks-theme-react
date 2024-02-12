import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ThemeContextType, ThemeProviderProps } from './types';
import useCookie from '../useCookie';

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
  const [theme, SetTheme] = useState<string>('light'),
    [isLoading, setIsLoading] = useState<boolean>(true),
    DefaultTheme = config.DefaultTheme,
    { setCookie, getCookie } = useCookie(),
    cookieIsActive = config.cookieIsActive ? config.cookieIsActive : false,
    StorageKey = config.StorageKey ? config.StorageKey : 'theme',
    DocumentAttributeKey = config.DocumentAttributeKey
      ? config.DocumentAttributeKey
      : 'data-theme',
    EventConfig = config.EventConfig;

  const setTheme = useCallback(
    (theme: string) => {
      if (theme) {
        if (cookieIsActive) {
          setCookie(StorageKey, theme);
        } else {
          localStorage.setItem(StorageKey, theme);
        }
        document.documentElement.setAttribute(DocumentAttributeKey, theme);
        SetTheme(theme);
      } else {
        let tema: string | null;
        if (cookieIsActive) {
          tema = getCookie(StorageKey);
        } else {
          tema = localStorage.getItem(StorageKey);
        }
        if (tema) {
          document.documentElement.setAttribute(DocumentAttributeKey, tema);
          SetTheme(tema);
        }
      }
    },
    [
      StorageKey,
      SetTheme,
      DocumentAttributeKey,
      cookieIsActive,
      getCookie,
      setCookie,
    ]
  );

  const setThemeDOM = (theme: string) => {
    if (theme) {
      if (cookieIsActive) {
        console.log('setando o tema: ' + theme);
        setCookie(StorageKey, theme);
      } else {
        localStorage.setItem(StorageKey, theme);
      }
      document.documentElement.setAttribute(DocumentAttributeKey, theme);
      SetTheme(theme);
    } else {
      let tema: string | null;
      if (cookieIsActive) {
        tema = getCookie(StorageKey);
      } else {
        tema = localStorage.getItem(StorageKey);
      }
      if (tema) {
        document.documentElement.setAttribute(DocumentAttributeKey, tema);
        SetTheme(tema);
      }
    }
  };

  const toggleThemeDefault = useCallback(() => {
    return setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

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
    [theme, setTheme]
  );

  const toggleThemeDefaultDOM = () => {
    const theme = cookieIsActive
      ? getCookie(StorageKey) === 'light'
        ? 'dark'
        : 'light'
      : localStorage.getItem(StorageKey) === 'light'
      ? 'dark'
      : 'light';
    setThemeDOM(theme);
  };

  const toggleThemeCustomDOM = (themes: string[]) => {
    const index = themes.findIndex(e => {
      if (cookieIsActive) {
        return e === getCookie(StorageKey);
      }
      return e === localStorage.getItem(StorageKey);
    });
    if (index + 1 < themes.length) {
      setThemeDOM(themes[index + 1]);
      console.log(themes[index + 1]);
    } else {
      setThemeDOM(themes[0]);
      console.log('2');
    }
  };

  useEffect(() => {
    function Start() {
      const StoredTheme = cookieIsActive
        ? getCookie(StorageKey)
        : localStorage.getItem(StorageKey);
      const DocumentTheme = document.documentElement.getAttribute(
        DocumentAttributeKey
      );
      console.log(cookieIsActive);
      if (StoredTheme) {
        setTheme(StoredTheme);
        setIsLoading(false);
        return;
      }
      if (DefaultTheme) {
        setTheme(DefaultTheme);
        setIsLoading(false);
        return;
      }
      if (DocumentTheme) {
        setTheme(DocumentTheme);
        setIsLoading(false);
        return;
      }
      setTheme('light');
      setIsLoading(false);
      return;
    }
    if (isLoading) {
      Start();
    }
  }, [
    DefaultTheme,
    DocumentAttributeKey,
    StorageKey,
    cookieIsActive,
    setTheme,
    getCookie,
    isLoading,
    setIsLoading,
  ]);

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
