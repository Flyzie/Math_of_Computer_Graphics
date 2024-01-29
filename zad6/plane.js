import Vector3D from './vectors.js';
import Matrix3D from './matrix.js';
import Quaternion from './quaternion.js';
import Line3D from './line.js';

class Plane3D{
    
    constructor(a, b, c, d){
        if (arguments.length === 4 && typeof a === 'object' && a instanceof Vector3D) {
            let v1 = new Vector3D();
            v1 = b;
            v1.subtract(a);
            let v2 = new Vector3D();
            v2 = c;
            v2.subtract(b);
            this.normal = v1.crossProduct(v2).normalize();
            let negativeNormal = new Vector3D();
            negativeNormal.scalarMultiply(-1);

            this.a = this.normal.x;
            this.b = this.normal.y;
            this.c = this.normal.z;
            this.d = negativeNormal.dotProduct(a);
            
        } else {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.normal = new Vector3D(a, b, c);
        }
    }
    
    intersectionWithPlane(plane) {
        const line = new Line3D();
        line.dir = this.normal.crossProduct(plane.normal);

        const dirLen = line.dir.calculateLength() * line.dir.calculateLength();
        if (dirLen === 0.0) {
            return new Line3D(new Vector3D(0, 0, 0), new Vector3D(0, 0, 0));
        }

        const value = (plane.b * this.d - this.b * plane.d) / (this.b * plane.c - plane.b * this.c);
        line.p = new Vector3D(0,0,0);
        line.p.x = 0;
        line.p.y = (-this.c * value - this.d) / this.b;
        line.p.z = value;

        return line;
    }

    angleWithPlane(plane) {
        const v4 = new Vector3D(this.normal.x, this.normal.y, this.normal.z).normalize();
        const v5 = new Vector3D(plane.normal.x, plane.normal.y, plane.normal.z).normalize();

        const dotProduct = v4.dotProduct(v5);
        const magnitudeProduct = v4.calculateLength() * v5.calculateLength();

        if (magnitudeProduct === 0) {
            console.log("One of the planes has zero magnitude.");
            return null;
        }

        const angleRad = Math.acos(dotProduct);
        const angle = 180 - (180 / Math.PI) * angleRad;

        return angle;
    }

    toString() {
        return `${this.a} ${this.b} ${this.c} ${this.d}`;
    }
}

export default Plane3D;