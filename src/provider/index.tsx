import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ThemeContextType, ThemeProviderProps } from './types';

export const ThemeContext = createContext<ThemeContextType>({
  isLoadedTheme: false,
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
    [isLoadedTheme, setIsLoadedTheme] = useState<boolean>(false),
    DefaultTheme = config.DefaultTheme,
    StorageKey = config.StorageKey ? config.StorageKey : 'theme',
    DocumentAttributeKey = config.DocumentAttributeKey
      ? config.DocumentAttributeKey
      : 'data-theme',
    EventConfig = config.EventConfig;

  const setTheme = useCallback(
    (theme: string) => {
      localStorage.setItem(StorageKey, theme);
      document.documentElement.setAttribute(DocumentAttributeKey, theme);
      SetTheme(theme);
    },
    [StorageKey, DocumentAttributeKey]
  );

  const toggleThemeDefault = useCallback(() => {
    return setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  const toggleThemeDefaultDOM = useCallback(
    () =>
      setTheme(localStorage.getItem(StorageKey) === 'light' ? 'dark' : 'light'),
    [StorageKey, setTheme]
  );

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
        return e === localStorage.getItem(StorageKey);
      });

      if (index + 1 < themes.length) {
        setTheme(themes[index + 1]);
      } else {
        setTheme(themes[0]);
      }
    },
    [StorageKey, setTheme]
  );

  const startCallback = useCallback(() => {
    const StoredTheme = localStorage.getItem(StorageKey);
    const DocumentTheme = document.documentElement.getAttribute(
      DocumentAttributeKey
    );
    if (StoredTheme) {
      setTheme(StoredTheme);
      return;
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
    if (!isLoadedTheme) {
      startCallback();
      setIsLoadedTheme(true);
    }
  }, [startCallback, isLoadedTheme]);

  if (!isLoadedTheme) {
    return config.LoadingScreen ? (
      <config.LoadingScreen />
    ) : (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        isLoadedTheme,
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
