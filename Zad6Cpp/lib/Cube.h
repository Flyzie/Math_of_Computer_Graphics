#ifndef MATGRAFKOMP6_CUBE_H
#define MATGRAFKOMP6_CUBE_H

#include "Vector.h"
#include "Plane.h"

class Cube {
public:
    Vector points[8];
    Plane planes[6];
    int pointsInPlane[6][4] = { 0, 1, 2, 3, 1, 6, 5, 2, 6, 7, 4, 5, 7, 0, 3, 4, 3, 2, 5, 4, 0, 1, 6, 7 };

    Cube(float size);

    bool intersectPoints(Line line);
};


#endif //MATGRAFKOMP6_CUBE_H
