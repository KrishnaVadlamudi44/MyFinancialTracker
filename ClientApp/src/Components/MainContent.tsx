import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Accounts from './Accounts';
import Dashboard from './Dashboard';

const MainContent = () => {
  return (
    <div>
      <Switch>
        <Route path='/accounts' component={Accounts}></Route>
        <Route path='/' component={Dashboard}></Route>
      </Switch>
    </div>
  );
};

export default MainContent;
