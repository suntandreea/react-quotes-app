import {Redirect, Route, Switch} from 'react-router-dom';
import New from './pages/New';
import List from './pages/List';
import Detail from './pages/Detail';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/quotes' exact>
          <List />
        </Route>
        <Route path='/quotes/:quoteId'>
          <Detail />
        </Route>
        <Route path='/new' exact>
          <New />
        </Route>
        <Route path='/' exact>
          <Redirect to='/quotes' />
        </Route>
        <Route path='*' >
          <p>Page not found!</p>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
