#ifndef MATGRAFKOMP5_SECTION_H
#define MATGRAFKOMP5_SECTION_H

#include "Vector.h"

class Section {
public:
    Vector startPoint;
    Vector endPoint;

    Section(const Vector& startPoint, const Vector& endPoint);

    Vector IntersectionWithSection(Section section);
};


#endif //MATGRAFKOMP5_SECTION_H
