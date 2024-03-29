import React from 'react';
import PropTypes from 'prop-types';
import { getCanvas, scaleCoords } from '../utils/canvasFunctions';

const StartGame = props => {
    const canvas = getCanvas();
    const { mobile } = props;
    const textCenterH = canvas.x / 2;
    const instText = {
        textAnchor: 'middle', // center
        x: textCenterH, // center relative to X axis
        y: canvas.y - canvas.y * .26,
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: scaleCoords(4),
            fill: '#e3e3e3',
        }
    };
    
    const instTextSpacing = canvas.y / 32;

    const text = {
        textAnchor: 'middle', // center
        x: textCenterH, // center relative to X axis
        y: canvas.y - canvas.y * .15,
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: scaleCoords(4),
            fill: '#FC0',
        },
    };

    return (
        <g filter='url(#shadow)' data-testid={`startgame`}>
            {
                mobile === false &&
                <g>
                    <text {...instText}>
                        <tspan x={textCenterH} dx={0}>A or ⬅️ moves left</tspan>
                        <tspan x={textCenterH} dx={0} dy={instTextSpacing}>D or ➡️ moves right</tspan>
                        <tspan x={textCenterH} dx={0} dy={instTextSpacing}>Space or ⬆️ fires</tspan>                
                    </text>
                    <text {...text}>                
                        Press Fire to Start!
                    </text>
                </g>
            }
            {
                mobile === true &&
                <g onClick={props.onClick}>
                    <text {...text}>                
                        Tap Here to Start!
                    </text>
                </g>
            }
        </g>
    );
};

StartGame.propTypes = {
    mobile: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default StartGame;