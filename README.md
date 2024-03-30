# swks-theme-react

Uma bilioteca de temas voltada para [React](https://www.npmjs.com/package/react), pode ser usada em [Nextjs](https://nextjs.org/) e demais estruturas, frameworks UI's com suporte ao React.

## Nota

Esta biblioteca atende a diversos tipos de UI's, mas sempre recomendamos validar se a UI escolhida ja tem suporte a gerenciamento de temas.
Pois cada UI tem a sua maneira de tratar os temas, prove-los e gerencia-los (Caso haja um provedor de temas).

Vale destacar que esta biblioteca faz o salvamento dos temas usando `localStorage` e não os cookies, por inicialmente a estrutura da biblioteca ser feita com apenas o react, então vale ressaltar que no caso de uso do [Nextjs](https://nextjs.org) por ele realizar a renderização no servidor é necessario algumas abordagens caso haja problemas relacionado ao uso do tema padrão do dispositivo, que é o padrão caso não seja informado um tema padrão.


## Para usar

Para usar nossa biblioteca é muito simples basta dentro da pasta de seu projeto executar o comando no Terminal do seu sistema operacional.
```bash
npm i swks-theme-react
```

## Uso em sua aplicação

Para usar nossa biblioteca é necessário que na raiz de sua aplicação seja incluido o component `ThemeProvider` . <br>
Para atribuir o valor de config recomundamos usar o ThemeConfig para passar o valor da constante que recebera a configuração destinada ao `ThemeProvider`.<br>


```TS
    // config.ts or config.js

    const config = ThemeConfig({});
    
    export default config;
```

Inserção do provider dentro da raiz da aplicação: 

```TSX
    // this exemple using next pages _app.tsx(.jsx)

    export default function App({ Component pageProps }: AppProps) {
        return (
            <ThemeProvider
                config={config}
            >
                <Component {...pageProps} />
                <ChangeTheme/>
            </ThemeProvider>
        );
    }
```

Configuração dos eventos DOM, esta biblioteca usa como parametros para eventos de componentes: `name`, `class`, `id`, `attribute`.
As configurações padrões são para todos os tipos de troca de tema em attributo, para ativar a ultilização desses padrões que devem ser estabelecidos na contante config do `ThemeProvider` basta chamar a função start passando o ObjetoTema, cujo mesmo e retorno da função `useThemeObject` isso dentro do `useEffect`, segue o exemplo abaixo:

```TSX
    export default function toggleTheme(){
        const ThemeObject = useThemeObject();

        useEffect(() => {
            Start(ThemeObject)
        }, []);

        return (<button data-toggle-default-theme ></button>);
    }
```
## Observação
A função Start é necessária apenas quando se vai usar a troca de tema atraves do name id attributo ou classe.

Pode ser usado também os métodos providos pelo `useTheme`, sendo os métodos: `setTheme`, `toggleThemeDefault`, `toggleThemeCustom`.<br>
Segue o exemplo abaxio:
```TSX
    export default function toggleTheme() {
        const {toggleDefaultTheme, theme} = useTheme();

        return(
            <button onclick={toggleDefaultTheme} >
                {theme}
            </button>
        )
    }
```