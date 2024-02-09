import { EventConfigActiveType, EventConfigType } from './provider/types';

export type StartProps = {
  setTheme: (theme: string) => void;
  toggleThemeDefault: () => void;
  toggleThemeCustom: (theme: string[]) => void;
  EventConfig?: EventConfigType;
};

function startToggleThemeDefault(
  toggle: () => void,
  config?: { type: EventConfigActiveType; value: string }
) {
  const cfg: { type: EventConfigActiveType; value: string } = config
    ? config
    : { type: 'attribute', value: 'data-toggle-default-theme' };
  switch (cfg.type) {
    case 'attribute':
      document.querySelectorAll(`[${cfg.value}]`).forEach(e => {
        e.addEventListener('click', () => {
          toggle();
        });
      });

      break;
    case 'class':
      document.querySelectorAll(`.${cfg.value}`).forEach(e => {
        e.addEventListener('click', () => {
          toggle();
        });
      });

      break;

    case 'name':
      document.getElementsByName(cfg.value).forEach(e => {
        e.addEventListener('click', () => {
          toggle();
        });
      });
      break;

    default:
      document.querySelectorAll(`#${cfg.value}`).forEach(e => {
        e.addEventListener('click', () => {
          toggle();
        });
      });

      break;
  }
}

function startToggleThemeCustom(
  toggle: (themes: string[]) => void,
  config?: { type: EventConfigActiveType; value: string }
) {
  const cfg: { type: EventConfigActiveType; value: string } = config
    ? config
    : { type: 'attribute', value: 'data-toggle-default-theme' };
  switch (cfg.type) {
    case 'attribute':
      document.querySelectorAll(`[${cfg.value}]`).forEach(e => {
        e.addEventListener('click', () => {
          const valor = e.getAttribute('value');
          toggle(valor ? valor.split(',') : ['light', 'dark']);
        });
      });
      break;
    case 'class':
      document.querySelectorAll(`.${cfg.value}`).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          toggle(value ? value.split(',') : ['light', 'dark']);
        });
      });
      break;

    case 'name':
      document.getElementsByName(cfg.value).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          toggle(value ? value.split(',') : ['light', 'dark']);
        });
      });
      break;

    default:
      document.querySelectorAll(`#${cfg.value}`).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          toggle(value ? value.split(',') : ['dark', 'light']);
        });
      });

      break;
  }
}
function startSetTheme(
  set: (theme: string) => void,
  config?: { type: EventConfigActiveType; value: string }
) {
  const cfg: { type: EventConfigActiveType; value: string } = config
    ? config
    : { type: 'attribute', value: 'data-set-theme' };
  switch (cfg.type) {
    case 'attribute':
      document.querySelectorAll(`[${cfg.value}]`).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          if (value) {
            set(value);
          }
        });
      });

      break;
    case 'class':
      document.querySelectorAll(`.${cfg.value}`).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          if (value) {
            set(value);
          }
        });
      });
      break;

    case 'name':
      document.getElementsByName(cfg.value).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          if (value) {
            set(value);
          }
        });
      });
      break;

    default:
      document.querySelectorAll(`#${cfg.value}`).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          if (value) {
            set(value);
          }
        });
      });
      break;
  }
}
function startChooseTheme(
  choose: (theme: string) => void,
  config?: { type: EventConfigActiveType; value: string }
) {
  const cfg: { type: EventConfigActiveType; value: string } = config
    ? config
    : { type: 'attribute', value: 'data-choose-theme' };
  switch (cfg.type) {
    case 'attribute':
      document.querySelectorAll(`[${cfg.value}]`).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          if (value) {
            choose(value);
          }
        });
      });

      break;
    case 'class':
      document.querySelectorAll(`.${cfg.value}`).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          if (value) {
            choose(value);
          }
        });
      });

      break;

    case 'name':
      document.getElementsByName(cfg.value).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          if (value) {
            choose(value);
          }
        });
      });
      break;

    default:
      document.querySelectorAll(`#${cfg.value}`).forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute('value');
          if (value) {
            choose(value);
          }
        });
      });
      break;
  }
}

export function Start(ThemeObject: StartProps) {
  const {
    setTheme,
    toggleThemeDefault,
    toggleThemeCustom,
    EventConfig,
  } = ThemeObject;

  startToggleThemeDefault(
    toggleThemeDefault,
    EventConfig?.toggleThemeDefaultConfig
  );
  startToggleThemeCustom(
    toggleThemeCustom,
    EventConfig?.toggleThemeCustomConfig
  );
  startChooseTheme(setTheme, EventConfig?.chooseThemeConfig);
  startSetTheme(setTheme, EventConfig?.setThemeConfig);
}
