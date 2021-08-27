import { Switch, Route } from 'react-router-dom';

//pages
import Posts from './pages/Posts';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Posts />
      </Route>
      <Route path="/post/:id" exact>
        <SinglePost />
      </Route>
    </Switch>
  );
}

export default App;
