import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import GamePage from "./components/GamePage";
import Home from "./components/Home";
import {GameListPage} from "./components/GameListPage";
import {LoginPage} from "./components/LoginPage";
import {RegisterPage} from "./components/RegisterPage";
import {PrivateRoute} from "./components/_components";
import {Provider} from "react-redux";
import {store} from "./components/_helpers";

import { configureFakeBackend } from './components/_helpers';
import {MSPage} from "./components/MSPage";
import MSList from "./components/MSList";
// configureFakeBackend();

export default function RouterConfig() {
    return (
        <BrowserRouter>
            <Switch>
                {/*<PrivateRoute exact path="/" component={Home} />*/}
                <Route exact path="/" key={1} component={Home}/>
                <Route exact path="/creation" key={2} component={MSPage} />
                <Route exact path="/list" key={3} component={MSList} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Switch>
        </BrowserRouter>
    );
}
