import Vector3D from './vectors.js';
import Matrix3D from './matrix.js';
import Quaternion from './quaternion.js';
import Line3D from './line.js';
import Plane3D from './plane.js';
import Section3D from './section.js';


class Cube3D{
    constructor(centerPoint, size){
        this.size = size;
        this.centerPoint = centerPoint;

        size *= 0.5;

        this.vertices = [new Vector3D(centerPoint.x - size, centerPoint.y - size, centerPoint.z - size),
            new Vector3D(centerPoint.x + size, centerPoint.y - size, centerPoint.z - size),
            new Vector3D(centerPoint.x + size, centerPoint.y + size, centerPoint.z - size),
            new Vector3D(centerPoint.x - size, centerPoint.y + size, centerPoint.z - size),
            new Vector3D(centerPoint.x - size, centerPoint.y - size, centerPoint.z + size),
            new Vector3D(centerPoint.x + size, centerPoint.y - size, centerPoint.z + size),
            new Vector3D(centerPoint.x + size, centerPoint.y + size, centerPoint.z + size),
            new Vector3D(centerPoint.x - size, centerPoint.y + size, centerPoint.z + size)];
        
        this.planes = [
            new Plane3D(this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]), // Front face
            new Plane3D(this.vertices[0], this.vertices[4], this.vertices[5], this.vertices[1]), // Right face
            new Plane3D(this.vertices[1], this.vertices[5], this.vertices[6], this.vertices[2]), // Back face
            new Plane3D(this.vertices[3], this.vertices[2], this.vertices[6], this.vertices[7]), // Left face
            new Plane3D(this.vertices[0], this.vertices[3], this.vertices[7], this.vertices[4]), // Top face
            new Plane3D(this.vertices[4], this.vertices[7], this.vertices[6], this.vertices[5])  // Bottom face
        ];

        this.planesToDraw = [[0, 1, 2, 3], [0, 4, 5, 1], [1, 5, 6, 2], [3, 2, 6, 7], [0, 3, 7, 4], [4, 7, 6, 5]];
    }
    
    updatePlanes() {
        for (let i = 0; i < this.planes.length; i++) {
            let plane = this.planes[i];
            let planesVerts = this.planesToDraw[i];

            let p1 = this.vertices[planesVerts[0]];
            let p2 = this.vertices[planesVerts[1]];
            let p3 = this.vertices[planesVerts[2]];

            // Calculate the normal vector of the plane
            let v1 = new Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
            let v2 = new Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
            let normal = v1.crossProduct(v2);

            // Calculate the distance from the plane to the origin
            let d = -normal.dotProduct(p1);

            // Update the plane equation
            plane.a = normal.x;
            plane.b = normal.y;
            plane.c = normal.z;
            plane.d = d;
        }
    }

    rotateCubeX(radian) {
        let cosine = Math.cos(radian);
        let sine = Math.sin(radian);

        for (let index = this.vertices.length - 1; index > -1; --index) {
            let p = this.vertices[index];

            let y = (p.y - this.centerPoint.y) * cosine - (p.z - this.centerPoint.z) * sine;
            let z = (p.y - this.centerPoint.y) * sine + (p.z - this.centerPoint.z) * cosine;

            p.y = y + this.centerPoint.y;
            p.z = z + this.centerPoint.z;
        }
        this.updatePlanes();
    }

    rotateCubeY(radian) {
        let cosine = Math.cos(radian);
        let sine = Math.sin(radian);

        for (let index = this.vertices.length - 1; index > -1; --index) {
            let p = this.vertices[index];

            let x = (p.z - this.centerPoint.z) * sine + (p.x - this.centerPoint.x) * cosine;
            let z = (p.z - this.centerPoint.z) * cosine - (p.x - this.centerPoint.x) * sine;

            p.x = x + this.centerPoint.x;
            p.z = z + this.centerPoint.z;
        }
        this.updatePlanes();
    }
}

function convertVector(Vector){
    return new Matrix3D(4,1, Vector.x, Vector.y, Vector.z, 1);
}

export default Cube3D;