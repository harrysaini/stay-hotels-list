import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Listing from './pages/listing/Listing';
import Details from './pages/details/Details';
import Bookings from './pages/bookings/Bookings';

interface Props {
}
interface State {
  user: any;
  isLoaded: boolean;
}
class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      user: null,
      isLoaded: false
    }
  }

  componentDidMount = async () => {
  }

  render(){

    return (
      <Router>
        <div className="App">
          <header className="App-header">
              <div>
                <Link to= '/'><div className="logo">Stay Hotel</div></Link>
              </div>
              <div className="header-btns">
                <Link to='/bookings'>
                  <button type="button" className="btn btn-outline-primary">Bookings</button>
                </Link>
              </div>
          </header>
          <div className="container">
            <Switch>
              <Route exact path='/'>
                <Listing />
              </Route>
              <Route exact path='/bookings'>
                <Bookings />
              </Route>
              <Route exact path='/details/:id'>
                <Details />
              </Route>
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
