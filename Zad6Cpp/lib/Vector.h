#ifndef MATGRAFKOMP2_VECTOR_H
#define MATGRAFKOMP2_VECTOR_H

#include <iostream>
#include <cmath>

class Vector {
public:
    float x;
    float y;
    float z;

    Vector();
    Vector(float x, float y, float z);
    ~Vector();

    void add(Vector v);
    Vector operator+(Vector v)
    {
        add(v);
        return *this;
    }

    void sub(Vector v);
    Vector operator-(Vector v)
    {
        sub(v);
        return *this;
    }

    void div(float f);
    Vector operator/(float f)
    {
        div(f);
        return *this;
    }

    void mul(float f);
    Vector operator*(float f)
    {
        mul(f);
        return *this;
    }

    float length();
    void normalize();

    Vector dot(Vector v);
    float dotProduct(Vector v);

    Vector cross(Vector v);

    int findAngle(Vector v);
};

std::ostream& operator<<(std::ostream& strm, const Vector& v);

#endif //MATGRAFKOMP2_VECTOR_H
