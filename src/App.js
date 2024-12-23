import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Canvas from './components/Canvas';
import { getIsMobile } from './utils/miscFunctions';
import { storeCanvas } from './utils/canvasFunctions';
import { widthHeightRatio, updateInterval } from './utils/constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.keyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const self = this;
    setInterval(() => {
        self.props.moveObjects();
    }, updateInterval);
    window.onresize = () => {
      const cnv = document.getElementById('fauxnix-canvas');
      const { innerHeight } = window;
      const canvasHeight = innerHeight;
      const canvasWidth = canvasHeight * widthHeightRatio;
      storeCanvas({
          x: canvasWidth,
          y: canvasHeight
      });
      cnv.style.width = `${canvasWidth}px`;
      cnv.style.height = `${canvasHeight}px`;
    };
    window.onresize();
  };

  handleKeyDown(command) {
    if (/shoot/.test(command)) {
      this.props.shoot();
    } else if (/right|left|none/.test(command)) {
      this.props.moveShip(command);
    } else if (/start/.test(command)) {
      this.props.startGame();
    } 
  };

  render() {
    const { started } = this.props.gameState;
    window.onkeydown = (e) => {
      switch (e.key) {
        case "d":
        case "ArrowRight":
          this.handleKeyDown("right");
          break;
        case "a":
        case "ArrowLeft":
          this.handleKeyDown("left");
          break;
        case " ":
        case "ArrowUp":
          started ? this.handleKeyDown("shoot") : this.handleKeyDown("start");
          break;
        default:
      }
    };
    
    window.onkeyup = (e) => {
      switch (e.key) {
        case "d":
        case "ArrowRight":
          this.handleKeyDown("none");
          break;
        case "a":
        case "ArrowLeft":
          this.handleKeyDown("none");
          break;
        default:
          break;
      }
    };

    //General catch all so when we lift our finger on touch devices to stop moving
    window.onTouchEnd = (e) => {
      this.handleKeyDown("none");
    };

    return (
      <div className="App" data-testid="fauxnix-app">
        <Canvas 
          isMobile={getIsMobile()}
          gameState={this.props.gameState}
          startGame={this.props.startGame}
          moveShip={this.props.moveShip}
          shoot={this.props.shoot}
        />
      </div>
    );
  }

}

App.propTypes = {
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    shotsRemaining: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    highScore: PropTypes.number.isRequired,
    shipPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    shipMoving: PropTypes.oneOf(['left', 'right', 'none']).isRequired,
    shipFire: PropTypes.arrayOf(PropTypes.shape({
      position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
      }).isRequired,
      sound: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
    birds: PropTypes.arrayOf(PropTypes.shape({
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
        sound: PropTypes.bool.isRequired,
        soundType: PropTypes.oneOf(['struck', 'wing', 'none']).isRequired,
        id: PropTypes.number.isRequired,
        fltDir: PropTypes.oneOf(['left', 'right']).isRequired,
        status: PropTypes.oneOf(['normal', 'flee', 'enter', 'struck', 'gone']).isRequired,
        fleeStatus: PropTypes.number.isRequired,
        statusTime: PropTypes.number.isRequired,
        wings: PropTypes.shape({ //Scaler value for wing if hit. 1 is full scale
            left: PropTypes.number.isRequired,
            right: PropTypes.number.isRequired,
            statusTime: PropTypes.number.isRequired,
        }).isRequired,
    })).isRequired,
  }).isRequired,
  moveShip: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired,
  moveObjects: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default App;