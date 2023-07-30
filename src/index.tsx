import React from 'react';
import './index.css';
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {green, lime} from "@material-ui/core/colors";
import {AppWithRedux} from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {createRoot} from "react-dom/client";


// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
// export const store = legacy_createStore(rootReducer, composeEnhancers());

const theme = createTheme( {
    palette: {
        type: "dark",
        primary: green,
        secondary: lime,
    }
});

const root = createRoot (
    document.getElementById('root') as HTMLElement
);
    root.render(
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline/>
                <AppWithRedux />
            </Provider>
        </ThemeProvider>,
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
//reportWebVitals()


