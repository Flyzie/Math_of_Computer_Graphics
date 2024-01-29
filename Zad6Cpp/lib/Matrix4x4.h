#ifndef MATGRAFKOMPMATRIX_MATRIX_H
#define MATGRAFKOMPMATRIX_MATRIX_H

#include <iostream>
#include <cmath>
#include "Vector.h"

class Matrix4x4
{
public:
    float entries[16];

    Matrix4x4() {}

    Matrix4x4(float e0, float e1, float e2, float e3,
              float e4, float e5, float e6, float e7,
              float e8, float e9, float e10, float e11,
              float e12, float e13, float e14, float e15);

    ~Matrix4x4() {}


    /**
     * adds two matrices
     * @param mat another 4x4 matrix
     */
    Matrix4x4 addMatrix (Matrix4x4 &mat);

    /**
     * multiplicates matrix by a scalar
     * @param f scalar
     */
    Matrix4x4 matrixScalarMul (float f);

    /**
     * multiplicates matrix by a matrix
     * @param mat another 4x4 matrix
     */
    Matrix4x4 matrixMul (Matrix4x4 &mat);

    /**
     * loads identity matrix
     */
    void loadIdentityMatrix ();

    void setTranslationPart (Vector & translation);

    void setScale (Vector & scaleFactor);

    void setUniformScale (float scaleFactor);

    void setRotationAxis (double angle, Vector & axis);

    void setRotationX (double angle);

    void setRotationY (double angle);

    void setRotationZ (double angle);

    void printMatrix();

};

#endif //MATGRAFKOMPMATRIX_MATRIX_H