const Vector3D = require('./vectors').default;
const Line3D = require('./line').default;

class Orb3D {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }

    intersectionWithLine(line) {
           // Calculate the direction vector of the line
    let direction = line.dir;

    // Calculate the vector from the center of the orb to the point on the line
    let centerToPoint = line.p.subtract(this.center);

    // Calculate the terms of the quadratic equation
    let a = direction.dotProduct(direction);
    let b = 2 * centerToPoint.dotProduct(direction);
    let c = centerToPoint.dotProduct(centerToPoint) - this.radius * this.radius;

    // Calculate the discriminant
    let discriminant = b * b - 4 * a * c;

    // If the discriminant is less than zero, the line does not intersect the orb
    if (discriminant < 0) {
        return null;
    }

    // Calculate the two points of intersection
    let t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    let t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

    // Return the points of intersection
    return [line.p.add(direction.scalarMultiply(t1)), line.p.add(direction.scalarMultiply(t2))];
        
    }
}

module.exports = Orb3D;