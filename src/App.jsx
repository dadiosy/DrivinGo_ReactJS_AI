import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import I18nProvider from './providers/I18nProvider';
import AuthProvider from './providers/AuthProvider';
import store from './store';
import Router from './routes';

const theme = createTheme({
  palette: {
    primary: {
      main: "#F56200"
    },
    secondary: {
      main: "#white"
    }
  }
});

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* <AuthProvider> */}
              <Router />
            {/* </AuthProvider> */}
          </ThemeProvider>
        </Provider>
      </I18nProvider>
    </BrowserRouter>
  );
}