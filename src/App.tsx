import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./modules/container/Homepage";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"}><Homepage/></Route>
                    </Switch>
                </BrowserRouter>
            </header>
        </div>
    );
};

export default App;