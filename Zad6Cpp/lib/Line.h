#ifndef MATGRAFKOMP5_LINE_H
#define MATGRAFKOMP5_LINE_H

#include "Vector.h"
#include "Plane.h"

class Plane;

class Line {
public:
public:
    Vector direction;
    Vector point;

    Line();
    Line(const Vector& point, const Vector& direction);

    Vector IntersectionWithLine(Line line);
    Vector IntersectionWithPlane(Plane plane);

    float AngleLine(Line line);
    float AnglePlane(Plane plane);
};

std::ostream& operator<<(std::ostream& strm, const Line& line);

#endif //MATGRAFKOMP5_LINE_H
