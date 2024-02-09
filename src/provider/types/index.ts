export type EventConfigType = {
  setThemeConfig?: { type: EventConfigActiveType; value: string };
  chooseThemeConfig?: { type: EventConfigActiveType; value: string };
  toggleThemeDefaultConfig?: { type: EventConfigActiveType; value: string };
  toggleThemeCustomConfig?: { type: EventConfigActiveType; value: string };
};

export type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  toggleThemeDefault: () => void;
  toggleThemeCustom: (theme: string[]) => void;
  EventConfig?: EventConfigType;
};

export type EventConfigActiveType = 'attribute' | 'class' | 'name' | 'id';

export type ConfigType = {
  DefaultTheme?: string;
  cookieIsActive?: boolean;
  StorageKey?: string;
  DocumentAttributeKey?: string;
  EventConfig?: EventConfigType;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
  config: ConfigType;
};
