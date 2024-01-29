#include "../lib/Matrix3x3.h"

Matrix3x3::Matrix3x3(float m0, float m1, float m2, float m3, float m4, float m5, float m6, float m7, float m8) {
    matrixData[0] = m0;
    matrixData[1] = m1;
    matrixData[2] = m2;
    matrixData[3] = m3;
    matrixData[4] = m4;
    matrixData[5] = m5;
    matrixData[6] = m6;
    matrixData[7] = m7;
    matrixData[8] = m8;
}

Matrix3x3::Matrix3x3() {}

Matrix3x3::~Matrix3x3() {}

void Matrix3x3::setMatrixAsInverseOfGivenMatrix(Matrix3x3 &m) {
    float t1 = m.matrixData[0] * m.matrixData[4];
    float t2 = m.matrixData[0] * m.matrixData[7];
    float t3 = m.matrixData[3] * m.matrixData[1];
    float t4 = m.matrixData[6] * m.matrixData[1];
    float t5 = m.matrixData[3] * m.matrixData[2];
    float t6 = m.matrixData[6] * m.matrixData[2];

    float det = (t1 * m.matrixData[8]-t2*m.matrixData[5]-t3*m.matrixData[8]+t4*m.matrixData[5]+t5*m.matrixData[7]-t6*m.matrixData[4]);

    if (det == 0.0) {
        std::cout <<"det = 0";
    }


    float invd = 1.0f/det;

    float m0 = (m.matrixData[4] * m.matrixData[8] - m.matrixData[7] * m.matrixData[5]) * invd;
    float m3 = -(m.matrixData[3] * m.matrixData[8] - m.matrixData[6] * m.matrixData[5]) * invd;
    float m6 = (m.matrixData[3] * m.matrixData[7] - m.matrixData[6] * m.matrixData[4]) * invd;
    float m1 = (m.matrixData[4] * m.matrixData[8] - m.matrixData[7] * m.matrixData[5]) * invd;
    float m4 = (m.matrixData[0] * m.matrixData[8] - t6) * invd;
    float m7 = -(t2 - t4) * invd;
    float m2 = (m.matrixData[1] * m.matrixData[5] - m.matrixData[4] * m.matrixData[2]) * invd;
    float m5 = -(m.matrixData[0] * m.matrixData[5] - t5) * invd;
    float m8 = (t1 - t3) * invd;

    matrixData[0] = m0;
    matrixData[3] = m3;
    matrixData[6] = m6;

    matrixData[1] = m1;
    matrixData[4] = m4;
    matrixData[7] = m7;

    matrixData[2] = m2;
    matrixData[5] = m5;
    matrixData[8] = m8;
}

Matrix3x3 Matrix3x3::getInvertedMatrix() {
    Matrix3x3 result;
    result.setMatrixAsInverseOfGivenMatrix(*this);
    return result;
}

void Matrix3x3::invertMatrix() {
    setMatrixAsInverseOfGivenMatrix(*this);
}

void Matrix3x3::setMatrixAsTransposeOfGivenMatrix(const Matrix3x3 &m) {
    Matrix3x3 copy = m;
    matrixData[0] = copy.matrixData[0];
    matrixData[3] = copy.matrixData[1];
    matrixData[6] = copy.matrixData[2];

    matrixData[1] = copy.matrixData[3];
    matrixData[4] = copy.matrixData[4];
    matrixData[7] = copy.matrixData[5];

    matrixData[2] = copy.matrixData[6];
    matrixData[5] = copy.matrixData[7];
    matrixData[8] = copy.matrixData[8];
}

Matrix3x3 Matrix3x3::getTransposedMatrix() const{
    Matrix3x3 result;
    result.setMatrixAsTransposeOfGivenMatrix(*this);
    return result;
}

void Matrix3x3::transposeMatrix() {
    setMatrixAsTransposeOfGivenMatrix(*this);
}

void Matrix3x3::printMatrix() {
    for (int i = 0; i < 9; ++i) {
        std::cout << matrixData[i] << " ";
        if ((i + 1) % 3 == 0) {
            std::cout << std::endl;
        }
    }
}

