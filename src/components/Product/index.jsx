import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import ProductListPage from './Pages/ListPage';

function ProductFeature() {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={match.url} exact component={ProductListPage} />
      </Switch>
    </div>
  );
}

export default ProductFeature;
