export type EventConfigType = {
  setThemeConfig?: { type: EventConfigActiveType; value: string };
  chooseThemeConfig?: { type: EventConfigActiveType; value: string };
  toggleThemeDefaultConfig?: { type: EventConfigActiveType; value: string };
  toggleThemeCustomConfig?: { type: EventConfigActiveType; value: string };
};

export type ThemeContextType = {
  isLoadedTheme: boolean;
  theme: string;
  setTheme: (theme: string) => void;
  toggleThemeDefault: () => void;
  toggleThemeDefaultDOM: () => void;
  toggleThemeCustom: (theme: string[]) => void;
  toggleThemeCustomDOM: (theme: string[]) => void;
  EventConfig?: EventConfigType;
};

export type EventConfigActiveType = 'attribute' | 'class' | 'name' | 'id';

export type ConfigType = {
  DefaultTheme?: string;
  StorageKey?: string;
  DocumentAttributeKey?: string;
  EventConfig?: EventConfigType;
  LoadingScreen?: React.FC;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
  config: ConfigType;
};
