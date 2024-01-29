#ifndef MATGRAFKOMP2_QUATERNION_H
#define MATGRAFKOMP2_QUATERNION_H

#include "Vector.h"

class Quaternion {
public:
    float a, b, c, d;
    Vector vector;

    Quaternion(); // Empty quaternion
    Quaternion(float a); // Scalar quaternion
    Quaternion(float a, float b, float c, float d); // Quaternion with 4 values (a + bi + cj + dk)
    Quaternion(float a, const Vector &v); // Quaternion with scalar and vector part (a + bi + cj + dk)

    // Mathematical operations
    Quaternion operator+(const Quaternion &q2) const; // Quaternion addition
    Quaternion operator-(const Quaternion &q2) const; // Quaternion subtraction
    Quaternion operator*(const Quaternion &q2) const; // Quaternion multiplication
    Quaternion operator*(float f) const; // Quaternion scalar multiplication
    Quaternion operator/(const Quaternion &q2) const; // Quaternion division

    // Logical operations
    bool operator==(const Quaternion &q2) const; // Quaternion equality
    bool operator!=(const Quaternion &q2) const; // Quaternion inequality


    Quaternion rotationQuaternion(float angle, Vector axis); // Rotation quaternion
    Quaternion invertRotationQuaternion(float angle, Vector axis); // Invert rotation quaternion
    Vector rotateOnAxis(Vector point, float angle, Vector axis); // Rotate point on axis
    Quaternion conjugate();

    ~Quaternion();
};


#endif //MATGRAFKOMP2_QUATERNION_H
