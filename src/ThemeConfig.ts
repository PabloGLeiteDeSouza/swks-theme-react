import { ConfigType } from './provider/types';

export default function ThemeConfig(config: ConfigType) {
  return config ? config : {};
}
