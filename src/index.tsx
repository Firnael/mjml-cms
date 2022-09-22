import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProvider from '@chakra-ui/core/dist/ThemeProvider'
import { CSSReset } from '@chakra-ui/core/dist'
import { appTheme } from './theme'
import { App } from './app'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={appTheme}>
            <CSSReset />
            <App />
        </ThemeProvider>
    </React.StrictMode>
)