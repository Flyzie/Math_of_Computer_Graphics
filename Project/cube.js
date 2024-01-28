const Vector3D = require('./vectors').default;
const Matrix3D = require('./matrix').default;
const Quaternion = require('./quaternion').default;
const Line3D = require('./line');
const Plane3D = require('./plane').default
const Section3D = require('./section').default;
const Orb3D = require('./orb');

class Cube3D{
    constructor(centerPoint, size){
        this.size = size;
        this.centerPoint = centerPoint;

        this.vertices = [new Vector3D(centerPoint.x - size, centerPoint.y - size, centerPoint.z - size),
            new Vector3D(centerPoint.x + size, centerPoint.y - size, centerPoint.z - size),
            new Vector3D(centerPoint.x + size, centerPoint.y + size, centerPoint.z - size),
            new Vector3D(centerPoint.x - size, centerPoint.y + size, centerPoint.z - size),
            new Vector3D(centerPoint.x - size, centerPoint.y - size, centerPoint.z + size),
            new Vector3D(centerPoint.x + size, centerPoint.y - size, centerPoint.z + size),
            new Vector3D(centerPoint.x + size, centerPoint.y + size, centerPoint.z + size),
            new Vector3D(centerPoint.x - size, centerPoint.y + size, centerPoint.z + size)];
        
        this.planes = [
            new Plane3D(...this.calculatePlaneCoefficients(this.vertices[0], this.vertices[1], this.vertices[2])), // Front face
            new Plane3D(...this.calculatePlaneCoefficients(this.vertices[1], this.vertices[5], this.vertices[6])), // Right face
            new Plane3D(...this.calculatePlaneCoefficients(this.vertices[5], this.vertices[4], this.vertices[7])), // Back face
            new Plane3D(...this.calculatePlaneCoefficients(this.vertices[4], this.vertices[0], this.vertices[3])), // Left face
            new Plane3D(...this.calculatePlaneCoefficients(this.vertices[3], this.vertices[2], this.vertices[6])), // Top face
            new Plane3D(...this.calculatePlaneCoefficients(this.vertices[0], this.vertices[1], this.vertices[5]))  // Bottom face
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

module.exports = Cube3D;