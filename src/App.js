import {StateProvider} from 'store/provider.js'

import HomeRoute from 'routes/home-route'

import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom'

function App(props) {
  return (
    <StateProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/"><HomeRoute/></Route>
        </Switch>
      </HashRouter>
    </StateProvider>
  );
}

export default App;
