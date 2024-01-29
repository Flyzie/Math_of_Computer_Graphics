#include <iostream>

#include "lib/Cube.h"
#include "lib/Camera.h"
#include <cmath>

int main() {

Cube cube(5);
Camera camera;

float fifteen = M_PI / 12;

float roll = 0, pitch = 0, yaw = 0, zoom = 0;
float rollR = 0, pitchR = 0, yawR = 0;

	for (;;)
	{
		system("CLS");
		std::cout << camera.rayCasting(cube);
		std::cout << std::endl << "rotX: " << roll << " rotY: " << pitch << " rotZ: " << yaw << std::endl;

		std::cout << std::endl << std::endl;

		std::cout << "Podaj obrot wokol X w stopniach: ";
		std::cin >> roll;
        std::cout << "Podaj obrot wokol Y w stopniach: ";
		std::cin >> pitch;
		std::cout << "Podaj obrot wokol Z w stopniach: ";
		std::cin >> yaw;
		std::cout << "Podaj zoom:";
		std::cin >> zoom;

		rollR = M_PI * roll / 180;
		pitchR = M_PI * pitch / 180;
		yawR = M_PI * -yaw / 180;
		camera.changeTransform(rollR, pitchR, yawR, zoom);
	}
}

