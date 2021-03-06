import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name='application-name' content='Move.it' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='Move.it' />
                    <meta name='description' content='Best PWA App in the world' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    {/* <meta name='msapplication-TileColor' content='#f2f3f5' /> */}
                    {/* <meta name='msapplication-tap-highlight' content='no' /> */}
                    <meta name='theme-color' content='#5965e0' />
                            
                    {/* <link rel='apple-touch-icon' sizes='180x180' href='/static/icons/apple-touch-icon.png' /> */}
                    {/* <link rel='icon' type='image/png' sizes='32x32' href='/static/icons/favicon-32x32.png' /> */}
                    {/* <link rel='icon' type='image/png' sizes='16x16' href='/static/icons/favicon-16x16.png' /> */}
                    <link rel='manifest' href='/manifest.json' />
                    {/* <link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' /> */}
                    <link rel='shortcut icon' href='/favicon.ico' />
                    {/* <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' /> */}
                        
                    {/* <meta name='twitter:card' content='summary' />
                    <meta name='twitter:url' content='https://yourdomain.com' />
                    <meta name='twitter:title' content='PWA App' />
                    <meta name='twitter:description' content='Best PWA App in the world' />
                    <meta name='twitter:image' content='https://yourdomain.com/static/icons/android-chrome-192x192.png' />
                    <meta name='twitter:creator' content='@DavidWShadow' />
                    <meta property='og:type' content='website' />
                    <meta property='og:title' content='PWA App' />
                    <meta property='og:description' content='Best PWA App in the world' />
                    <meta property='og:site_name' content='PWA App' />
                    <meta property='og:url' content='https://yourdomain.com' />
                    <meta property='og:image' content='https://yourdomain.com/static/icons/apple-touch-icon.png' /> */}

                    {/* <link rel="shortcut icon" href="favicon.png" type="image/png"/> */}

                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}