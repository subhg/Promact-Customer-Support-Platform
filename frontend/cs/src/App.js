import React from 'react';
import { BrowserRouter as Router,  Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import LeftNavbar from './components/LeftNavbar';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
        <LeftNavbar />
          <Routes>
            {/*<Route path="/" exact component={Home} />
            <Route path="/dashboard" component={Dashboard} />
  <Route path="/profile" component={Profile} /> */}
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
