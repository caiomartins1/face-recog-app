import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Singin from './components/Singin/Singin';
import Logo from './components/logo/Logo';
import Register from './components/Register/Register';
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
      imageUrl: '',
      box: {},
      route: 'singin',
      isSingnedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box})
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onRouteChange = (route) => {
    if (route === 'singout') {
      this.setState({isSingnedIn: false});
    } else if (route === 'home') {
      this.setState({isSingnedIn: true});
    }
    this.setState({route});
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input
    )
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }

  render() {
    const { isSingnedIn, imageUrl, route, box } = this.state;
    return(
      <div className="app">
        <Particles className="particles" params = {particlesConfig} />
        <Navigation isSingnedIn={isSingnedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
          ? <div> 
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl}/>    
            </div>
          : route === 'singin' 
          ? <Singin onRouteChange={this.onRouteChange}/> : <Register onRouteChange={this.onRouteChange}/>
        }
      </div>
    )
  }
}

export default App;


