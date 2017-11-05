import React, { Component } from 'react';
import Routes from './routes';
import Navigation from './components/Navigation';

class App extends Component {

    render() {
        return (
            <div>
                <Navigation />
                <Routes />
            </div>
        );
    }
}

export default App;
