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
            new Plane3D(this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]), // Right face
            new Plane3D(this.vertices[6], this.vertices[7], this.vertices[4], this.vertices[5]), // Back face
            new Plane3D(this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]), // Left face
            new Plane3D(this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]), // Top face
            new Plane3D(this.vertices[0], this.vertices[1], this.vertices[6], this.vertices[7])  // Bottom face
        ];
    }

    rotateCubeY(angle) {
        const rotationMatrix = new Matrix3D().rotateY(angle);
    
        for (let i = 0; i < this.vertices.length; i++) {
            // Convert the vertex to a matrix
            let vertexMatrix = convertVector(this.vertices[i]);
    
            // Apply the rotation
            vertexMatrix = rotationMatrix.matrixMultiply(vertexMatrix);
    
            // Convert the result back to a vector
            this.vertices[i] = vertexMatrix.vectorFromMatrix();
        }
    }
    
    rotateCubeX(angle) {
        const rotationMatrix = new Matrix3D().rotateX(angle);
    
        for (let i = 0; i < this.vertices.length; i++) {
            // Convert the vertex to a matrix
            let vertexMatrix = convertVector(this.vertices[i]);
    
            // Apply the rotation
            vertexMatrix = rotationMatrix.matrixMultiply(vertexMatrix);
    
            // Convert the result back to a vector
            this.vertices[i] = vertexMatrix.vectorFromMatrix();
        }
    }
}

function convertVector(Vector){
    return new Matrix3D(4,1, Vector.x, Vector.y, Vector.z, 1);
}

export default Cube3D;