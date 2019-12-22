import React, { Component } from "react";
import AppHeader from './AppHeader';
import AppLayout from './AppLayout';
import '../css/App.scss';

class App extends Component{
    render(){
        return(
            <div>
                <AppHeader />
                <AppLayout />
            </div>
        )
    }
}

export default App;
