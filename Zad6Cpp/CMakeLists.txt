cmake_minimum_required(VERSION 3.21)
project(matGrafKomp6)

set(CMAKE_CXX_STANDARD 17)

add_executable(MatGrafKompMatrix main.cpp
        lib/Matrix4x4.h
        src/Matrix4x4.cpp
        lib/Matrix3x3.h
        src/Matrix3x3.cpp
        lib/Vector.h
        src/Vector.cpp
        src/Quaternion.cpp
        lib/Quaternion.h
        src/Line.cpp
        lib/Line.h
        src/Plane.cpp
        lib/Plane.h
        src/Section.cpp
        lib/Section.h
        src/Camera.cpp
        lib/Camera.h
        src/Cube.cpp
        lib/Cube.h
)
