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
      const attribute_components = document.querySelectorAll(`[${cfg.value}]`);
      if (attribute_components.length > 1) {
        attribute_components.forEach(e => {
          e.addEventListener('click', () => {
            toggle();
          });
        });
      } else {
        document
          .querySelector(`[${cfg.value}]`)
          ?.addEventListener('click', () => {
            toggle();
          });
      }

      break;
    case 'class':
      const class_components = document.querySelectorAll(`.${cfg.value}`);
      if (class_components.length > 1) {
        class_components.forEach(e => {
          e.addEventListener('click', () => {
            toggle();
          });
        });
      } else {
        document
          .querySelector(`.${cfg.value}`)
          ?.addEventListener('click', () => {
            toggle();
          });
      }

      break;

    case 'name':
      document.getElementsByName(cfg.value).forEach(e => {
        e.addEventListener('click', () => {
          toggle();
        });
      });

      break;

    default:
      const id_components = document.querySelectorAll(`#${cfg.value}`);
      if (id_components.length > 1) {
        id_components.forEach(e => {
          e.addEventListener('click', () => {
            toggle();
          });
        });
      } else {
        document.getElementById(cfg.value)?.addEventListener('click', () => {
          toggle();
        });
      }

      break;
  }
}

function startToggleThemeCustom(
  toggle: (themes: string[]) => void,
  config?: { type: EventConfigActiveType; value: string }
) {
  const cfg: { type: EventConfigActiveType; value: string } = config
    ? config
    : { type: 'attribute', value: 'data-toggle-custom-theme' };
  switch (cfg.type) {
    case 'attribute':
      const components_attribute: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
        `[${cfg.value}]`
      );
      components_attribute.forEach(e => {
        e.addEventListener('click', () => {
          const valor = e.getAttribute(cfg.value);
          if (valor) {
            toggle(valor.split(','));
          }
        });
      });
      break;
    case 'class':
      const components_class: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
        `.${cfg.value}`
      );
      components_class.forEach(e => {
        e.addEventListener('click', () => {
          toggle(e.value.split(','));
        });
      });

      break;

    case 'name':
      const components_name = document.getElementsByName(
        cfg.value
      ) as NodeListOf<HTMLButtonElement>;
      components_name.forEach(e => {
        e.addEventListener('click', () => {
          toggle(e.value.split(','));
        });
      });

      break;

    default:
      const components_id: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
        `#${cfg.value}`
      );
      components_id.forEach(e => {
        e.addEventListener('click', () => {
          toggle(e.value.split(','));
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
      const components_attribute: NodeListOf<HTMLSelectElement> = document.querySelectorAll(
        `[${cfg.value}]`
      );
      components_attribute.forEach(e => {
        e.addEventListener('click', () => {
          const value = e.getAttribute(cfg.value);
          if (value) {
            set(value);
          }
        });
      });

      break;
    case 'class':
      const components_class: NodeListOf<HTMLSelectElement> = document.querySelectorAll(
        `.${cfg.value}`
      );
      components_class.forEach(e => {
        e.addEventListener('click', () => {
          set(e.value);
        });
      });
      break;

    case 'name':
      const components_name = document.getElementsByName(
        cfg.value
      ) as NodeListOf<HTMLButtonElement>;
      components_name.forEach(e => {
        e.addEventListener('click', () => {
          set(e.value);
        });
      });
      break;

    default:
      const components_id: NodeListOf<HTMLSelectElement> = document.querySelectorAll(
        `#${cfg.value}`
      );
      components_id.forEach(e => {
        e.addEventListener('click', () => {
          set(e.value);
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
      const components_attribute: NodeListOf<HTMLSelectElement> = document.querySelectorAll(
        `[${cfg.value}]`
      );
      components_attribute.forEach(e => {
        e.addEventListener('change', () => {
          choose(e.value);
        });
      });

      break;
    case 'class':
      const components_class: NodeListOf<HTMLSelectElement> = document.querySelectorAll(
        `.${cfg.value}`
      );
      components_class.forEach(e => {
        e.addEventListener('change', () => {
          choose(e.value);
        });
      });

      break;

    case 'name':
      const components_name = document.getElementsByName(
        cfg.value
      ) as NodeListOf<HTMLButtonElement>;
      components_name.forEach(e => {
        e.addEventListener('change', () => {
          choose(e.value);
        });
      });
      break;

    default:
      const components_id: NodeListOf<HTMLSelectElement> = document.querySelectorAll(
        `#${cfg.value}`
      );
      components_id.forEach(e => {
        e.addEventListener('change', () => {
          choose(e.value);
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
