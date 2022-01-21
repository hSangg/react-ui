import {createTheme, ThemeProvider} from '@material-ui/core';
import 'App.scss';
import Header from 'components/Header';
import ProductFeature from 'components/Product';
import {Route, Switch} from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontWeightLight: '400',
    fontWeightRegular: '500',
    fontWeightMedium: '600',
    fontWeightBold: '700',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/products" component={ProductFeature} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
