# swks-theme-react

Uma bilioteca de temas voltada para [React](https://www.npmjs.com/package/react), [Nextjs](https://nextjs.org/) e demais estruturas, frameworks UI's com suporte ao React.

### Nota

Esta biblioteca atende a diversos tipos de UI's, mas sempre recomendamos validar se a UI escolhida ja tem suporte a gerenciamento de temas.
Pois cada UI tem a sua maneira de tratar os temas, prove-los e gerencia-los (Caso haja um provedor de temas).

## Para usar

Para usar nossa biblioteca é muito simples basta dentro da pasta de seu projeto executar o comando no Terminal do seu sistema operacional.
```bash
npm i swks-theme-react
```

## Uso em sua aplicação

Para usar nossa biblioteca é necessário que na raiz de sua aplicação seja incluido o component `<ThemeProvider>` . <br>
Para atribuir o valor de config recomundamos usar o ThemeConfig para passar o valor da constante que recebera a configuração destinada ao `<ThemeProvider>`.

```
    // config.ts or config.js

    const config = ThemeConfig({});
    
    export default config;
```


```
    // _app.tsx(_app.jsx) or app.tsx(app.jsx) in next app router

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