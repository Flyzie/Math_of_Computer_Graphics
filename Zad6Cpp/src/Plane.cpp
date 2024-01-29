#include "../lib/Plane.h"

Plane::Plane() {}

Plane::Plane(float a, float b, float c, float d)
{
    this->a = a;
    this->b = b;
    this->c = c;
    this->d = d;
    Vector vec{a,b,c};
    normal = vec;
}

Plane::Plane(Vector A, Vector B, Vector C, Vector D) {
    Vector v1 = B;
    v1.sub(A);
    Vector v2 = C;
    v2.sub(B);
    normal = v1.cross(v2);
    normal.mul( - 1);
    Vector negativeNormal = normal;
    negativeNormal.mul(-1);
    a = normal.x;
    b = normal.y;
    c = normal.z;
    d = negativeNormal.dotProduct(A);
}

Line Plane::IntersectionWithPlane(Plane plane) {
    Line line;
    line.direction = normal.cross(plane.normal);

    float dirLen = line.direction.length() * line.direction.length();
    if (dirLen == 0.0f) {
        return Line({0,0,0},{0,0,0});
    }

    float value = (plane.b * this->d - this->b * plane.d) / (this->b * plane.c - plane.b * this->c);
    line.point.x = 0;
    line.point.y = (-this->c * value - this->d) / this->b;
    line.point.z = value;

    return line;
}


float Plane::AnglePlane(Plane plane) {
    Vector v4(normal.x, normal.y, normal.z);
    Vector v5(plane.normal.x, plane.normal.y, plane.normal.z);

    v4.normalize();
    v5.normalize();

    float dotProduct = v4.dotProduct(v5);

    float angleRad = std::acos(dotProduct);
    float angle = 180 - angleRad * 180 / M_PI;

    return angle;
}

std::ostream& operator<<(std::ostream& strm, const Plane& plane) {

    return strm << plane.a << " " <<plane.b << " " << plane.c << " " << plane.d;
}