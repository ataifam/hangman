import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// import Home component
import Intro from "./components/Intro.js";
// import About component
import Game from "./components/Game.js";
// import ContactUs component
import EndGame from "./components/EndGame.js";

function App() {
  return (
      <>
          {/* This is the alias of BrowserRouter i.e. Router */}
          <Router>
              <Routes>
                  {/* This route is for home component 
        with exact path "/", in component props 
        we passes the imported component*/}
                  <Route
                      exact
                      path="/hangman-intro"
                      element={<Intro />}
                  />

                  {/* This route is for about component 
        with exact path "/about", in component 
        props we passes the imported component*/}
                  <Route
                      path="/hangman-game"
                      element={<Game />}
                  />

                  {/* This route is for contactus component
        with exact path "/contactus", in 
        component props we passes the imported component*/}
                  <Route
                      path="/hangman-endgame"
                      element={<EndGame />}
                  />

                  {/* If any route mismatches the upper 
        route endpoints then, redirect triggers 
        and redirects app to home component with to="/" */}
                  {/* <Redirect to="/" /> */}
                  <Route
                      path="*"
                      element={<Navigate to="/hangman-intro" />}
                  />
              </Routes>
          </Router>
      </>
  );
}

export default App;