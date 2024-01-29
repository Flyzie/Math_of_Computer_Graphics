#include "../lib/Quaternion.h"

Quaternion::Quaternion() {
    this -> a = 0;
    this -> b = 0;
    this -> c = 0;
    this -> d = 0;
    this -> vector = Vector(0, 0, 0);
}

Quaternion::Quaternion(float a) {
    this -> a = a;
    this -> b = 0;
    this -> c = 0;
    this -> d = 0;
    this -> vector = Vector(0, 0, 0);
}

Quaternion::Quaternion(float a, float b, float c, float d) {
    this -> a = a;
    this -> b = b;
    this -> c = c;
    this -> d = d;
    this -> vector = Vector(b, c, d);
}

Quaternion::Quaternion(float a, const Vector &v) {
    this -> a = a;
    this -> b = v.x;
    this -> c = v.y;
    this -> d = v.z;
    this -> vector = v;
}

Quaternion Quaternion::operator+(const Quaternion &q2) const {
    return Quaternion{a + q2.a, b + q2.b, c + q2.c, d + q2.d};
}

Quaternion Quaternion::operator-(const Quaternion &q2) const {
    return Quaternion{a - q2.a, b - q2.b, c - q2.c, d - q2.d};
}

Quaternion Quaternion::operator*(const Quaternion &q2) const {
    Quaternion tmp;

    tmp.a = a * q2.a - b * q2.b - c * q2.c - d * q2.d;
    tmp.b = a * q2.b + b * q2.a + c * q2.d - d * q2.c;
    tmp.c = a * q2.c + c * q2.a + d * q2.b - b * q2.d;
    tmp.d = a * q2.d + d * q2.a + b * q2.c - c * q2.b;

    return tmp;
}

Quaternion Quaternion::operator*(float f) const {
    return Quaternion{f * a, f * b, f * c, f * d};
}

Quaternion Quaternion::operator/(const Quaternion &q2) const {
    Quaternion tmp;

    tmp.a = (a * q2.a + b * q2.b + c * q2.c + d * q2.d) / (q2.a * q2.a + q2.b * q2.b + q2.c * q2.c + q2.d * q2.d);
    tmp.b = (b * q2.a - a * q2.b - c * q2.d + d * q2.c) / (q2.a * q2.a + q2.b * q2.b + q2.c * q2.c + q2.d * q2.d);
    tmp.c = (c * q2.a + a * q2.c - d * q2.b - b * q2.d) / (q2.a * q2.a + q2.b * q2.b + q2.c * q2.c + q2.d * q2.d);
    tmp.d = (d * q2.a - a * q2.d + b * q2.c - c * q2.b) / (q2.a * q2.a + q2.b * q2.b + q2.c * q2.c + q2.d * q2.d);

    return tmp;
}


bool Quaternion::operator==(const Quaternion &q2) const {
    if (a == q2.a && b == q2.b && c == q2.c && d == q2.d) {
        return true;
    } else {
        return false;
    }
}

bool Quaternion::operator!=(const Quaternion &q2) const {
    if (a != q2.a || b != q2.b || c != q2.c || d != q2.d) {
        return true;
    } else {
        return false;
    }
}

Quaternion Quaternion::rotationQuaternion(float angle, Vector axis) {
    float angleRad = angle * (float) M_PI / 180;
    axis.normalize();
    axis.mul((float) sin(angleRad / 2));

    return Quaternion{(float) cos(angleRad / 2), axis};
}

Quaternion Quaternion::invertRotationQuaternion(float angle, Vector axis) {
    float angleRad = angle * (float) M_PI / 180;
    axis.normalize();
    axis.mul(-(float) sin(angleRad / 2));

    return Quaternion{(float) cos(angleRad / 2), axis};
}

Vector Quaternion::rotateOnAxis(Vector point, float angle, Vector axis) {
    Quaternion q1 = Quaternion::rotationQuaternion(angle, axis);
    Quaternion q2 = Quaternion::invertRotationQuaternion(angle, axis);

    Quaternion p = Quaternion(0, point);

    Quaternion result = q1 * p * q2;

    return {result.b, result.c, result.d};
}

Quaternion Quaternion::conjugate()
{
	Quaternion q;
	q.a = a;
	q.b = -b;
	q.c = -c;
	q.d = -d;
	return q;
}

Quaternion::~Quaternion() = default;
