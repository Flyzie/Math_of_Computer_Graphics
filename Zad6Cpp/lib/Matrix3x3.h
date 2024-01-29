#ifndef MATGRAFKOMPMATRIX_MATRIX3X3_H
#define MATGRAFKOMPMATRIX_MATRIX3X3_H

#include <iostream>
#include <cmath>
#include <cstring>

class Matrix3x3{
public:
    float matrixData[9] = {0.0};

    Matrix3x3();

    Matrix3x3(float m0, float m1, float m2,
              float m3, float m4, float m5,
              float m6, float m7, float m8);

    ~Matrix3x3();

    void setMatrixAsInverseOfGivenMatrix (Matrix3x3& m);

    Matrix3x3 getInvertedMatrix ();

    void invertMatrix();

    void setMatrixAsTransposeOfGivenMatrix (const Matrix3x3& m);

    Matrix3x3 getTransposedMatrix () const;

    void transposeMatrix ();

    void printMatrix();
};

#endif //MATGRAFKOMPMATRIX_MATRIX3X3_H