import Vector3D from './vectors.js';
import Matrix3D from './matrix.js';
import Quaternion from './quaternion.js';
import Line3D from './line.js';
import Plane3D from './plane.js';
import Section3D from './section.js';

const camPos = new Vector3D(0, -15, 0);
const pointsWidth = 10;
const camDistance = 5;

class Camera3D{
    constructor(position){
        this.position = position;
        
        const linesArray = [];
        for (let i = 0; i < 60; i++) {
            const row = [];
            for (let j = 0; j < 60; j++) {

                const line = new Line3D(j - 30, camPos.y, i - 30, 0, 0, 1);
                row.push(line);
            }
            linesArray.push(row);
        }

        this.lines = linesArray;
    }
    
}

export default Camera3D;