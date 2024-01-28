import Vector3D from './vectors';
import Matrix3D from './matrix';
import Quaternion from './quaternion';
import Line3D from './line';

class Plane3D{
    constructor(a, b, c, d){
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;

        const vec = new Vector3D(a,b,c);
        this.normal = vec;
    }

    calculatePlaneCoefficients(v1, v2, v3) {
        // Calculate two vectors that lie on the plane
        let vec1 = v2.subtract(v1);
        let vec2 = v3.subtract(v1);

        // Calculate the cross product of these vectors
        let normal = vec1.cross(vec2);

        // The coefficients a, b, c are the components of the normal vector
        let a = normal.x;
        let b = normal.y;
        let c = normal.z;

        // The coefficient d can be calculated using one of the points on the plane
        let d = -(a * v1.x + b * v1.y + c * v1.z);

        return [a, b, c, d];
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