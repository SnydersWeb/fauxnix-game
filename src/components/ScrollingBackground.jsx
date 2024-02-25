import React from 'react';
import { scaleCoords } from '../utils/functions';

const ScrollingBackground = () => {
    const starStyle = {
        display: 'inline',
        fill: '#0004d6',
    };
    const starPath = scaleCoords('-0.26148,4.07365 -4.066423,0.35761 4.073653,0.26148 0.3576,4.06642 0.26148,-4.07366 4.06642,-0.3576 -4.07365,-0.26148 z');
                    
    const circleStar = {
        display: 'inline',
        fill: '#0004d6',
    };
    const circleStarR = scaleCoords(0.75077206);

    const bgWidth = scaleCoords(201.29155);
    const bgHeight = scaleCoords(206.86189);
    const bgOffsetX = 0 - (bgWidth/2);
    const bgOffsetY = 0 - bgHeight;

    const getRandomInt = (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
    };

    const xMax = Number(bgOffsetX) + Number(bgWidth) - 20;
    const aryRandomPathStars = [];
    for(let i = 0, j = 25; i < j; i++) {
        aryRandomPathStars.push({
            x: getRandomInt(bgOffsetX, xMax),
            y: getRandomInt(bgOffsetY + 100, -100)
        });
    }
    const aryRandomCircleStars = [];
    for(let i = 0, j = 50; i < j; i++) {
        aryRandomCircleStars.push({
            x: getRandomInt(bgOffsetX, xMax),
            y: getRandomInt(bgOffsetY + 100, -100)
        });
    }

    return (
        <g id="starryBackGround">
            { aryRandomPathStars.map((starCoords, index) => (
                <path d={`m ${starCoords.x},${starCoords.y} ${starPath}`} style={starStyle} key={`pointStar${index}`} id={`pointStar${index}`} />
            ))}

            { aryRandomCircleStars.map((starCoords, index) => (
                <circle cx={starCoords.x} cy={starCoords.y} r={circleStarR} style={circleStar} key={`circleStar${index}`} id={`circleStar${index}`} />
            ))}
        </g>
    );
};

export default ScrollingBackground;