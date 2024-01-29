#ifndef MATGRAFKOMP5_PLANE_H
#define MATGRAFKOMP5_PLANE_H

#include "Vector.h"
#include "Line.h"

class Line;

class Plane {
public:
    float a, b, c, d;
    Vector normal;
    Plane();
    Plane(float a, float b, float c, float d);

    // Added new constructor
    Plane(Vector A, Vector B, Vector C, Vector D);

    Line IntersectionWithPlane(Plane plane);
    float AnglePlane(Plane plane);
};

std::ostream& operator<<(std::ostream& strm, const Plane& plane);

#endif //MATGRAFKOMP5_PLANE_H
