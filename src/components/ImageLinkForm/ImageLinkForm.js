import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 tc">
        {'This Magic Brain will detect faces in your pictures. Git it a try'}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input type="text" className="f4 pa2 w-70 center tc" onChange={onInputChange}/>
          <button className=" tc w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;