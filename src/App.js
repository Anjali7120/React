import Main from './Component/main';
import Navbar from './Component/NavBar';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import Cart from './Component/Cart';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar></Navbar>
     
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/cart" component={Cart} />
      </Switch>

    </div>
</BrowserRouter>
      );
}

export default App;
