import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';

class App extends Component {
    componentDidMount() {
        document.title = 'WebChat'
    }

    render() {
        return (
            <Layout/>
        );
    }
}

export default App;
