import Vector3D from './vectors.js';
import Matrix3D from './matrix.js';
import Quaternion from './quaternion.js';
import Line3D from './line.js';
import Plane3D from './plane.js';
import Section3D from './section.js';



const POINTS_CAM_DIST = 5;
const POINTS_WIDTH = 10;
const START_POS = new Vector3D(0, -15, 0);


class Camera {
    constructor() {
        this.position = START_POS;
        this.viewPoints = Array(60).fill().map(() => Array(60).fill());
        this.reset();
    }

    rotatePoint(point, roll, pitch, yaw) {
        // Assuming Quaternion is a class with similar functionality to the C++ version
        let p = new Quaternion(0, point);
        let u = -roll;
        let v = -pitch;
        let w = yaw;
        let q = new Quaternion(
            Math.cos(u / 2) * Math.cos(v / 2) * Math.cos(w / 2) + Math.sin(u / 2) * Math.sin(v / 2) * Math.sin(w / 2),
            Math.sin(u / 2) * Math.cos(v / 2) * Math.cos(w / 2) - Math.cos(u / 2) * Math.sin(v / 2) * Math.sin(w / 2),
            Math.cos(u / 2) * Math.sin(v / 2) * Math.cos(w / 2) + Math.sin(u / 2) * Math.cos(v / 2) * Math.sin(w / 2),
            Math.cos(u / 2) * Math.cos(v / 2) * Math.sin(w / 2) - Math.sin(u / 2) * Math.sin(v / 2) * Math.cos(w / 2)
        );
        let qinverted = q.conjugate();
        let pnew = qinverted.multiply(p).multiply(q);
        return new Vector3D(pnew.b, pnew.c, pnew.d);
    }

    rotate(roll, pitch, yaw) {
        this.position = this.rotatePoint(this.position, roll, pitch, yaw);

        for (let i = 0; i < 60; i++) {
            for (let j = 0; j < 60; j++) {
                this.viewPoints[i][j] = this.rotatePoint(this.viewPoints[i][j], roll, pitch, yaw);
            }
        }
    }

    zoom(distance) {
        let v = new Vector3D(0, 0, 0);
        v = v.subtract(this.position);
        let length = v.calculateLength();
        v.scalardDivide(length);
        v.scalarMultiply(distance);
        for (let i = 0; i < 60; i++) {
            for (let j = 0; j < 60; j++) {
                this.viewPoints[i][j] = this.viewPoints[i][j].add(v);
            }
        }
    }

    rayCasting(cube) {
        let result = "";
        for (let i = 0; i < 60; i++) {
            for (let j = 0; j < 60; j++) {
                let v = this.viewPoints[i][j];
                v = v.subtract(this.position);
                let line = new Line3D(this.viewPoints[i][j], v);
                if (cube.checkIntersection(line)) {
                    result += '0';
                } else {
                    result += '.';
                }
            }
            result += "\n";
        }
        return result;
    }

    reset() {
        this.position = START_POS;

        for (let i = 0; i < 60; i++) {
            for (let j = 0; j < 60; j++) {
                this.viewPoints[i][j] = new Vector3D(
                    (j - 30) * Camera.POINTS_WIDTH / 60,
                    START_POS.y + Camera.POINTS_CAM_DIST,
                    (i - 30) * Camera.POINTS_WIDTH / 60
                );
            }
        }
    }

    changeTransform(roll, pitch, yaw, z) {
        this.reset();
        this.rotate(roll, pitch, yaw);
        this.zoom(z);
    }
}

export default Camera;