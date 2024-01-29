#include "../lib/Section.h"

Section::Section(const Vector& startPoint, const Vector& endPoint)
{
    this->startPoint = startPoint;
    this->endPoint = endPoint;
}

Vector Section::IntersectionWithSection(Section section) {
    Vector qMinusP = section.startPoint;
    qMinusP = qMinusP - startPoint;
    Vector s = section.endPoint;
    s = s - section.startPoint;
    Vector r = endPoint;
    r = r - startPoint;

    Vector result = startPoint;
    r.mul(qMinusP.cross(s).length() / r.cross(s).length());
    result = result + r;
    return result;
}