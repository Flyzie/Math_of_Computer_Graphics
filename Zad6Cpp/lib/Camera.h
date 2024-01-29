//
// Created by Grzegorz Bednarek on 03/01/2024.
//

#ifndef MATGRAFKOMP6_CAMERA_H
#define MATGRAFKOMP6_CAMERA_H

#include "Vector.h"
#include "Quaternion.h"
#include "Cube.h"
#include <cstdio>
#include <cmath>
#include <sstream>

class Camera
{
	const float POINTS_CAM_DIST = 5;
	const float POINTS_WIDTH = 10;
	const Vector CENTER_POS = Vector(0, -15, 0);

public:

	Vector position;
	Camera();
	Vector rotatePoint(Vector point, float roll, float pitch, float yaw);
	void rotate(float roll, float pitch, float yaw);
	void zoom(float distance);
	Vector viewPoints[60][60];
	std::string rayCasting(Cube cube);
	void reset();
	void changeTransform(float roll, float pitch, float yaw, float z);

};


#endif //MATGRAFKOMP6_CAMERA_H
