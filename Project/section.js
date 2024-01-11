const Vector3D = require('./vectors');

class Section3D {
    constructor(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    intersectionWithSection(section) {
        let qMinusP = section.startPoint.subtract(this.startPoint);
        let s = section.endPoint.subtract(section.startPoint);
        let r = this.endPoint.subtract(this.startPoint);

        let crossProductQPS = qMinusP.crossProduct(s);
        let crossProductRS = r.crossProduct(s);

        let lengthCrossProductRS = crossProductRS.calculateLength();

        if (lengthCrossProductRS === 0) {
            // Lines are parallel or coincident, return some default value
            return new Vector3D(0, 0, 0);
        }

        let scaleFactor = crossProductQPS.calculateLength() / lengthCrossProductRS;

        let intersectionPoint = this.startPoint.add(r.scalarMultiply(scaleFactor));
        return intersectionPoint;
    }
}
module.exports = Section3D;