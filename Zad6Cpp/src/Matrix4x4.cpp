#include <cstring>
#include "../lib/Matrix4x4.h"

Matrix4x4::Matrix4x4(float e0, float e1, float e2, float e3, float e4, float e5, float e6, float e7, float e8, float e9,
                     float e10, float e11, float e12, float e13, float e14, float e15) {
    entries[0] = e0;
    entries[1] = e1;
    entries[2] = e2;
    entries[3] = e3;
    entries[4] = e4;
    entries[5] = e5;
    entries[6] = e6;
    entries[7] = e7;
    entries[8] = e8;
    entries[9] = e9;
    entries[10] = e10;
    entries[11] = e11;
    entries[12] = e12;
    entries[13] = e13;
    entries[14] = e14;
    entries[15] = e15;
}

Matrix4x4 Matrix4x4::addMatrix(Matrix4x4 &mat) {
    return Matrix4x4(entries[0] + mat.entries[0],
                     entries[1] + mat.entries[1],
                     entries[2] + mat.entries[2],
                     entries[3] + mat.entries[3],
                     entries[4] + mat.entries[4],
                     entries[5] + mat.entries[5],
                     entries[6] + mat.entries[6],
                     entries[7] + mat.entries[7],
                     entries[8] + mat.entries[8],
                     entries[9] + mat.entries[9],
                     entries[10] + mat.entries[10],
                     entries[11] + mat.entries[11],
                     entries[12] + mat.entries[12],
                     entries[13] + mat.entries[13],
                     entries[14] + mat.entries[14],
                     entries[15] + mat.entries[15]);
}

Matrix4x4 Matrix4x4::matrixScalarMul(float f) {
    return Matrix4x4(entries[0] * f,
                     entries[1] * f,
                     entries[2] * f,
                     entries[3] * f,
                     entries[4] * f,
                     entries[5] * f,
                     entries[6] * f,
                     entries[7] * f,
                     entries[8] * f,
                     entries[9] * f,
                     entries[10] * f,
                     entries[11] * f,
                     entries[12] * f,
                     entries[13] * f,
                     entries[14] * f,
                     entries[15] * f);
}

Matrix4x4 Matrix4x4::matrixMul(Matrix4x4 &mat) {
        return Matrix4x4(     entries[0] * mat.entries[0] + entries[1] * mat.entries[4] + entries[2] * mat.entries[8] + entries[3] * mat.entries[12],
                              entries[0] * mat.entries[1] + entries[1] * mat.entries[5] + entries[2] * mat.entries[9] + entries[3] * mat.entries[13],
                              entries[0] * mat.entries[2] + entries[1] * mat.entries[6] + entries[2] * mat.entries[10] + entries[3] * mat.entries[14],
                              entries[0] * mat.entries[3] + entries[1] * mat.entries[7] + entries[2] * mat.entries[11] + entries[3] * mat.entries[15],
                              entries[4] * mat.entries[0] + entries[5] * mat.entries[4] + entries[6] * mat.entries[8] + entries[7] * mat.entries[12],
                              entries[4] * mat.entries[1] + entries[5] * mat.entries[5] + entries[6] * mat.entries[9] + entries[7] * mat.entries[13],
                              entries[4] * mat.entries[2] + entries[5] * mat.entries[6] + entries[6] * mat.entries[10] + entries[7] * mat.entries[14],
                              entries[4] * mat.entries[3] + entries[5] * mat.entries[7] + entries[6] * mat.entries[11] + entries[7] * mat.entries[15],
                              entries[8] * mat.entries[0] + entries[9] * mat.entries[4] + entries[10] * mat.entries[8] + entries[11] * mat.entries[12],
                              entries[8] * mat.entries[1] + entries[9] * mat.entries[5] + entries[10] * mat.entries[9] + entries[11] * mat.entries[13],
                              entries[8] * mat.entries[2] + entries[9] * mat.entries[6] + entries[10] * mat.entries[10] + entries[11] * mat.entries[14],
                              entries[8] * mat.entries[3] + entries[9] * mat.entries[7] + entries[10] * mat.entries[11] + entries[11] * mat.entries[15],
                              entries[12] * mat.entries[0] + entries[13] * mat.entries[4] + entries[14] * mat.entries[8] + entries[15] * mat.entries[12],
                              entries[12] * mat.entries[1] + entries[13] * mat.entries[5] + entries[14] * mat.entries[9] + entries[15] * mat.entries[13],
                              entries[12] * mat.entries[2] + entries[13] * mat.entries[6] + entries[14] * mat.entries[10] + entries[15] * mat.entries[14],
                              entries[12] * mat.entries[3] + entries[13] * mat.entries[7] + entries[14] * mat.entries[11] + entries[15] * mat.entries[15]);

}

void Matrix4x4::loadIdentityMatrix() {
    memset(entries, 0, 16*sizeof(float));
    entries[0] = 1.0f;
    entries[5] = 1.0f;
    entries[10] = 1.0f;
    entries[15] = 1.0f;
}

void Matrix4x4::setTranslationPart(Vector &translation) {
    entries[12] = translation.x;
    entries[13] = translation.y;
    entries[14] = translation.z;
}

void Matrix4x4::setScale(Vector &scaleFactor) {
    entries[0] = scaleFactor.x;
    entries[5] = scaleFactor.y;
    entries[10] = scaleFactor.z;
}

void Matrix4x4::setUniformScale(float scaleFactor) {
    loadIdentityMatrix();

    entries[0] = entries[5] = entries[10] = scaleFactor;
}

void Matrix4x4::setRotationAxis(double angle, Vector &axis) {
    axis.normalize();
    Vector u = axis;

    float sinAngle = (float)sin(M_PI * angle / 180);
    float cosAngle = (float)cos(M_PI * angle / 180);
    float oneMinusCosAngle = 1.0f - cosAngle;

    loadIdentityMatrix();

    entries[0] = (u.x) * (u.x) + cosAngle * (1 - (u.x) * (u.x));
    entries[4] = (u.x) * (u.y) * (oneMinusCosAngle) - sinAngle * u.z;
    entries[8] = (u.x) * (u.z) * (oneMinusCosAngle) + sinAngle * u.y;

    entries[1] = (u.x) * (u.y) * (oneMinusCosAngle) + sinAngle * u.z;
    entries[5] = (u.y) * (u.y) + cosAngle * (1 - (u.y) * (u.y));
    entries[9] = (u.y) * (u.z) * (oneMinusCosAngle) + sinAngle * u.x;

    entries[2] = (u.x) * (u.z) * (oneMinusCosAngle) - sinAngle * u.y;
    entries[6] = (u.y) * (u.z) * (oneMinusCosAngle) + sinAngle * u.x;
    entries[10] = (u.z) * (u.z) + cosAngle * (1 - (u.z) * (u.z));
}

void Matrix4x4::setRotationX(double angle) {
    loadIdentityMatrix();

    entries[5] = (float)cos(M_PI * angle / 180);
    entries[6] = (float)sin(M_PI * angle / 180);

    entries[9] = -entries[6];
    entries[10] = entries[0];
}

void Matrix4x4::setRotationY(double angle) {
    loadIdentityMatrix();

    entries[0] = (float)cos(M_PI * angle / 180);
    entries[2] = -(float)sin(M_PI * angle / 180);

    entries[8] = -entries[2];
    entries[10] = entries[0];
}

void Matrix4x4::setRotationZ(double angle) {
    loadIdentityMatrix();

    entries[0] = (float)cos(M_PI * angle / 180);
    entries[1] = (float)sin(M_PI * angle / 180);

    entries[4] = -entries[1];
    entries[5] = entries[0];
}

void Matrix4x4::printMatrix() {
    for (int i = 0; i < 16; ++i) {
        std::cout << entries[i] << " ";
        if ((i + 1) % 4 == 0) {
            std::cout << std::endl;
        }
    }
}
