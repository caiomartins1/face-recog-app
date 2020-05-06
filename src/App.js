import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '7b9ce1292c564d528f31da190d48e21c'
});

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
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input
    )
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
      
      }
    );
  }

  render() {
    return(
      <div className="app">
        <Particles className="particles" params = {particlesConfig} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange}
         onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={ this.state.imageUrl }/>
      </div>
    )
  }
}

export default App;
