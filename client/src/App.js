import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { UsuarioProvider } from './context/ParentContext';
import LoginAndRegister from './views/LoginAndRegister';
import MainScreen from './views/MainScreen';
import TaskData from './views/TaskData';
import ChildMode from './views/ChildMode';
import { NavGeneral } from './components/NavGeneral';
import Footer from './components/Footer';

function App() {
return(
    <div className="App">
      <UsuarioProvider>
      <Router>
      <NavGeneral />
        <Switch>
          <Route exact path='/login'>
          <LoginAndRegister />
          </Route>
          <Route exact path='/register'>
        <LoginAndRegister />
          </Route>
          <Route exact path='/'>
        <MainScreen />
          </Route>
          <Route exact path= '/create'>
          <TaskData />
          </Route>
          <Route exact path= '/task/:id'>
          <TaskData />
          </Route>
          <Route exact path ='/child-mode'>
            <ChildMode />
          </Route>
        </Switch>
      </Router>
      </UsuarioProvider>
      <Footer />
    </div>
  )
};
export default App;
