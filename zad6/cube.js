import Vector3D from './vectors.js';
import Matrix3D from './matrix.js';
import Quaternion from './quaternion.js';
import Line3D from './line.js';
import Plane3D from './plane.js';
import Section3D from './section.js';


class Cube3D{
    constructor(distance){
        this.distance = distance;

        this.vertices = [new Vector3D(-distance, -distance, -distance), //-+- 
            new Vector3D(distance, -distance, -distance), //++-
            new Vector3D(distance, -distance, distance), //+++
            new Vector3D(-distance, -distance, distance), //-++
            new Vector3D(-distance, distance, distance), //--+
            new Vector3D(distance, distance, distance), //+-+
            new Vector3D(distance, distance, -distance), //+--
            new Vector3D(-distance, distance, -distance),] //---];
        
        this.planes = [
            new Plane3D(this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]), // Front face
            new Plane3D(this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]), // Right face
            new Plane3D(this.vertices[6], this.vertices[7], this.vertices[4], this.vertices[5]), // Back face
            new Plane3D(this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]), // Left face
            new Plane3D(this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]), // Top face
            new Plane3D(this.vertices[0], this.vertices[1], this.vertices[6], this.vertices[7])  // Bottom face
        ];
    }

    checkIntersection(line) {
        let intersection = line.intersectionWithPlane(this.planes[0]);
        if (intersection.x >= this.vertices[0].x && intersection.x <= this.vertices[1].x &&
            intersection.z >= this.vertices[0].z && intersection.z <= this.vertices[3].z) {
            return true;
        }
    
        intersection = line.intersectionWithPlane(this.planes[1]);
        if (intersection.y <= this.vertices[6].y && intersection.y >= this.vertices[1].y &&
            intersection.z >= this.vertices[1].z && intersection.z <= this.vertices[2].z) {
            return true;
        }
    
        intersection = line.intersectionWithPlane(this.planes[2]);
        if (intersection.x >= this.vertices[7].x && intersection.x <= this.vertices[6].x &&
            intersection.z >= this.vertices[6].z && intersection.z <= this.vertices[5].z) {
            return true;
        }
    
        intersection = line.intersectionWithPlane(this.planes[3]);
        if (intersection.y <= this.vertices[7].y && intersection.y >= this.vertices[0].y &&
            intersection.z >= this.vertices[0].z && intersection.z <= this.vertices[3].z) {
            return true;
        }
    
        intersection = line.intersectionWithPlane(this.planes[4]);
        if (intersection.x >= this.vertices[3].x && intersection.x <= this.vertices[2].x &&
            intersection.y <= this.vertices[4].y && intersection.y >= this.vertices[3].y) {
            return true;
        }
    
        intersection = line.intersectionWithPlane(this.planes[5]);
        if (intersection.x >= this.vertices[0].x && intersection.x <= this.vertices[1].x &&
            intersection.y <= this.vertices[7].y && intersection.y >= this.vertices[0].y) {
            return true;
        }
    
        return false;
    }
}


export default Cube3D;