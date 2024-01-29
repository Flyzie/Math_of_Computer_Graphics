//
// Created by Grzegorz Bednarek on 03/01/2024.
//

#include "../lib/Camera.h"

Camera::Camera()
{
	this->position = CENTER_POS;

	for (int i = 0; i < 60; i++) {
		for (int j = 0; j < 60; j++) {
			viewPoints[i][j].x = (j - 30) * POINTS_WIDTH / 60;
			viewPoints[i][j].y = CENTER_POS.y + POINTS_CAM_DIST;
			viewPoints[i][j].z = (i - 30) * POINTS_WIDTH / 60;
		}
	}
}

Vector Camera::rotatePoint(Vector point, float roll, float pitch, float yaw)
{
	Quaternion p(0, point);
	float u = -roll;
	float v = -pitch;
	float w = yaw;
	Quaternion q;
	q.a = cos(u / 2)*cos(v/2)*cos(w/2) + sin(u / 2)*sin(v/2)*sin(w/2);
	q.b = sin(u/2)*cos(v/2)*cos(w / 2) - cos(u/2)*sin(v/2)*sin(w / 2);
	q.c = cos(u/2)*sin(v/2)*cos(w / 2) + sin(u/2)*cos(v/2)*sin(w / 2);
	q.d = cos(u/2)*cos(v/2)*sin(w / 2) - sin(u/2)*sin(v/2)*cos(w / 2);
	Quaternion qinverted = q.conjugate(); // dodane conjugate
	Quaternion pnew = qinverted * p * q;
	Vector result;
	result.x = pnew.b;
	result.y = pnew.c;
	result.z = pnew.d;
	return result;
}

void Camera::rotate(float roll, float pitch, float yaw)
{
	position = rotatePoint(position, roll, pitch, yaw);

	for (int i = 0; i < 60; i++) {
		for (int j = 0; j < 60; j++) {
			viewPoints[i][j] = rotatePoint(viewPoints[i][j], roll, pitch, yaw);
		}
	}
}

void Camera::zoom(float distance)
{
	Vector v(0, 0, 0);
	v = v - position; // zmiana
	float length = v.length();
	v.div(length);
	v.mul(distance);
	for (int i = 0; i < 60; i++) {
		for (int j = 0; j < 60; j++) {
			viewPoints[i][j] = viewPoints[i][j] + v; // zmiana
		}
	}

}

std::string Camera::rayCasting(Cube cube)
{
	std::string result = "";
	for (int i = 0; i < 60; i++) {
		for (int j = 0; j < 60; j++) {
			Vector v = viewPoints[i][j];
			v = v - position; // zmiana
			Line line(viewPoints[i][j], v);
			if (cube.intersectPoints(line))
			{
				result += '0';
			}
			else {
				result += '.';
			}
		}
		result += "\n";
	}
	return result;
}


void Camera::reset()
{
	this->position = CENTER_POS;

	for (int i = 0; i < 60; i++) {
		for (int j = 0; j < 60; j++) {
			viewPoints[i][j].x = (j - 30) * POINTS_WIDTH / 60;
			viewPoints[i][j].y = CENTER_POS.y + POINTS_CAM_DIST;
			viewPoints[i][j].z = (i - 30) * POINTS_WIDTH / 60;
		}
	}
}

void Camera::changeTransform(float roll, float pitch, float yaw, float z)
{
	reset();
	rotate(roll, pitch, yaw);
	zoom(z);
}
