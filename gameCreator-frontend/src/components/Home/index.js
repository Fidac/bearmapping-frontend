import React from "react";

import LayoutWrapper from "../LayoutWrapper";
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../bearmapping-logo.png';

export function Home() {

    return (
        <div className="body-content">
            <div></div>
            <img src={logo} className="bearmapping-logo" alt="logo" />
            {/*<p>*/}
            {/*    Where all the games begin*/}
            {/*</p>*/}
            {/*<a*/}
            {/*    className="App-link"*/}
            {/*    href="https://reactjs.org"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*>*/}
            {/*    Learn React*/}
            {/*</a>*/}
        </div>
    )
}

const WrappedHome = LayoutWrapper(Home);
export default WrappedHome;
