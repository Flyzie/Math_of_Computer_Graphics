
const Matrix3D = require('./matrix');
const Quaternion = require('./quaternion');
const Vector3D = require('./vectors');

class Line3D{
    constructor(p, dir){
        this.p = p;
        this.dir = dir;
    }

    linesIntersection(line2){
        const crossProduct = this.dir.crossProduct(line2.dir);

        const epsilon = 1e-10;

        if (Math.abs(crossProduct.calculateLength()) < epsilon) {
            console.log("Lines are parallel or coincident.");
            return null;
        }
        //punkt przecięcia na prostej (długość jakby przez to mnożymy)
        const t = line2.dir.crossProduct(this.p.subtract(line2.p)).dotProduct(crossProduct) / crossProduct.calculateLength();

        const intersectionp = this.p.add(this.dir.scalarMultiply(t));

        return intersectionp;
    }
    
    AngleBetweenLines(otherLine) {
        const dotProduct = this.dir.dotProduct(otherLine.dir);
        const magnitudeProduct = this.dir.calculateLength() * otherLine.dir.calculateLength();

        if (magnitudeProduct === 0) {
            console.log("One of the lines has zero magnitude.");
            return null;
        }

        const cosineTheta = dotProduct / magnitudeProduct;
        const angleRad = Math.acos(cosineTheta);
        const angleDegrees = (180 / Math.PI) * angleRad;

        return angleDegrees;
    }

    intersectionWithPlane(plane) {
        const ts = plane.a * this.dir.x + plane.b * this.dir.y + plane.c * this.dir.z;
        const values = -plane.d - (plane.a * this.p.x + plane.b * this.p.y + plane.c * this.p.z);
        const t = values / ts;

        return new Vector3D(
            this.p.x + this.dir.x * t,
            this.p.y + this.dir.y * t,
            this.p.z + this.dir.z * t
        );
    }

    anglePlane(plane) {
        const v4 = new Vector3D(plane.normal.x, plane.normal.y, plane.normal.z).normalize();
        const v5 = new Vector3D(this.dir.x, this.dir.y, this.dir.z).normalize();

        const dotProduct = v4.dotProduct(v5);
        const angleRad = Math.acos(dotProduct);
        const angle = angleRad * (180 / Math.PI);
        const result = 90 - angle;

        return result;
    }
    
}
module.exports = Line3D;