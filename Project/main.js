const Vector3D = require('./vectors');
const Matrix3D = require('./matrix');
const Quaternion = require('./quaternion');
const Line3D = require('./line');
const Plane3D = require('./plane')
const Section3D = require('./section')


const line1 = new Line3D(new Vector3D(-2, 4, 0), new Vector3D(3, 1, 5));
const line2 = new Line3D(new Vector3D(-2, 4, 0), new Vector3D(1, -5, 3));
//Intersection between lines
const intersectionp = line1.linesIntersection(line2);

console.log('intersection of two lines: ',intersectionp);
//angle between lines
console.log('angle between two lines: ', line1.AngleBetweenLines(line2));

//Intersection of line and a plane

const line3 = new Line3D(new Vector3D(-2,2,-1), new Vector3D(3, -1, 2));
const plane = new Plane3D(2,3,3,-8);

console.log('intersection point between plane and line: ',line3.intersectionWithPlane(plane));

//angle between line and plane
console.log('angle between plane and line: ', line3.anglePlane(plane));

//intersection of two planes
const plane2 = new Plane3D(2,-1,1,-8);
const plane3 = new Plane3D(4,3,1,14);

console.log('intersection between planes: ', plane2.intersectionWithPlane(plane3));

//angle between two planes
console.log('angle between planes: ', plane2.angleWithPlane(plane3));

//intersection between two sections

const section1 = new Section3D(new Vector3D(5,5,4), new Vector3D(10, 10, 6));
const section2 = new Section3D(new Vector3D(5,5,4), new Vector3D(10, 10, 3));

console.log('intersection of sections: ', section1.intersectionWithSection(section2));