import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/canvasFunctions';

class ShipTopLeftPylon extends Component {
    constructor(props) {
        super(props);

        this.basePartName = 'topLeftPylon';
        this.rPylonStyle = {
            fill: '#ff0000',
            stroke: 'none',
        };
        this.wPylonStyle = {
            fill: '#ffffff',
            stroke: 'none',
        };

        this.rPylonPath = scaleCoords('-4.607,-4.651 v 2.565 l 4.747,4.846');
        this.rPlyonXBase = scaleCoords(1.362);
        this.rPlyonYBase = scaleCoords(4.686);
        this.wPylonW = scaleCoords(0.783);
        this.wPylonH = scaleCoords(4.477);
        this.wPylonXBase = scaleCoords(-3.655);
        this.wPylonYBase = scaleCoords(0.001);
    }

    render() {       
        const { x:basePositionX } = this.props.position;        
        const { y:basePositionY } = this.props.position;
        return (
            <g id={this.basePartName} data-testid={`${this.basePartName}`}>
                <path style={this.rPylonStyle} d={`m ${basePositionX + this.rPlyonXBase},${basePositionY + this.rPlyonYBase} ${this.rPylonPath} z`} id={`${this.basePartName}Red`} />
                <rect style={this.wPylonStyle} id={`${this.basePartName}White`} width={this.wPylonW} height={this.wPylonH} x={basePositionX + this.wPylonXBase} y={basePositionY + this.wPylonYBase} />
            </g>
        );
    }
};

ShipTopLeftPylon.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default ShipTopLeftPylon;
