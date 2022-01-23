import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import DetailPage from './Pages/DetailPage';
import ProductListPage from './Pages/ListPage';

function ProductFeature() {
  const match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={match.url} exact component={ProductListPage} />
        <Route path={`${match.url}/:productId`} component={DetailPage} />
      </Switch>
    </div>
  );
}

export default ProductFeature;
