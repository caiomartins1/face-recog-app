import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const particlesConfig = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
}
class App extends Component {
  render() {
    return(
      <div className="app">
        <Particles className="particles" params = {particlesConfig} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* {<FaceRecognition />} */}
      </div>
    )
  }
}

export default App;
