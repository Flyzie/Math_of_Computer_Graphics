const Vector3D = require('./vectors');

class Quaternion {
    constructor(w, x, y, z) {
      this.w = w || 1;
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
    }
  
    // Static method to create a quaternion from an axis and an angle (in radians)
    static fromAxisAngle(axis, angle) {
      const halfAngle = angle / 2;
      const sinHalfAngle = Math.sin(halfAngle);
      const cosHalfAngle = Math.cos(halfAngle);
  
      return new Quaternion(
        cosHalfAngle,
        axis.x * sinHalfAngle,
        axis.y * sinHalfAngle,
        axis.z * sinHalfAngle
      );
    }
  
    add(q) {
      return new Quaternion(this.w + q.w, this.x + q.x, this.y + q.y, this.z + q.z);
    }
  
    // Method to perform quaternion subtraction
    subtract(q) {
      return new Quaternion(this.w - q.w, this.x - q.x, this.y - q.y, this.z - q.z);
    }
  
    // Method to perform quaternion division
    divide(q) {
      // Assuming q is not a zero quaternion
      const conjugate = new Quaternion(q.w, -q.x, -q.y, -q.z);
      const denominator = Quaternion.multiply(q, conjugate);
      const w = this.w / denominator.w;
      const x = this.x / denominator.w;
      const y = this.y / denominator.w;
      const z = this.z / denominator.w;
  
      return new Quaternion(w, x, y, z);
    }

    multiply (q2) {
      const w = this.w * q2.w - this.x * q2.x - this.y * q2.y - this.z * q2.z;
      const x = this.w * q2.x + this.x * q2.w + this.y * q2.z - this.z * q2.y;
      const y = this.w * q2.y - this.x * q2.z + this.y * q2.w + this.z * q2.x;
      const z = this.w * q2.z + this.x * q2.y - this.y * q2.x + this.z * q2.w;
  
      return new Quaternion(w, x, y, z);
    }
  
    // Method to normalize the quaternion
    normalize() {
      const magnitude = Math.sqrt(this.w ** 2 + this.x ** 2 + this.y ** 2 + this.z ** 2);
  
      this.w /= magnitude;
      this.x /= magnitude;
      this.y /= magnitude;
      this.z /= magnitude;
  
      return this;
    }

    //sprzeżenie kwaternionu
    conjugate() {
      return new Quaternion(this.w, -this.x, -this.y, -this.z);
    }

    
  }

  function rotatePointAroundAxis(point, angleDegrees) {
    
    const angleRadians = (angleDegrees * Math.PI) / 180;

    // Choose axis (for example, x-axis)
    const axis = new Vector3D(1, 0, 0).normalize(); // Assuming you have a normalize method in your Vector3D class
    const rotationQuaternion = Quaternion.fromAxisAngle(axis, angleRadians).normalize();
  
    // Convert point (vector) to quaternion
    const pointQuaternion = new Quaternion(0, point.x, point.y, point.z);
  
    // Rotate point by quaternion
    const rotatedPointQuaternion = rotationQuaternion.multiply(pointQuaternion).multiply(rotationQuaternion.conjugate());
  
    // Extract the x, y, z components
    return new Vector3D(rotatedPointQuaternion.x, rotatedPointQuaternion.y, rotatedPointQuaternion.z);
  }
  
  
  // Example usage:
  const quaternion1 = new Quaternion(1, 2, 3, 4);
  const quaternion2 = new Quaternion(5, 6, 7, 8);
  const testPoint = new Vector3D(-1,-1,-1)

  const rotatedPoint = rotatePointAroundAxis(testPoint, 270);

  console.log("Original Point:", testPoint);
  console.log("Rotated Point:", rotatedPoint);
  
  
  console.log(quaternion1.multiply(quaternion2));
  console.log(quaternion2.multiply(quaternion1));