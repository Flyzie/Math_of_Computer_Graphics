import Vector3D from './vectors.js';
import Matrix3D from './matrix.js';
import Quaternion from './quaternion.js';
import Line3D from './line.js';
import Plane3D from './plane.js';
import Section3D from './section.js';
import Cube3D from './cube.js';
import Camera from './camera.js';

import readlineLib from 'readline';
const readline = readlineLib.createInterface({
    input: process.stdin,
    output: process.stdout
});

const cube = new Cube3D(5);
const camera = new Camera();

let roll = 0, pitch = 0, yaw = 0, zoom = 0;
let rollR = 0, pitchR = 0, yawR = 0;

async function main() {
    while (true) {
        console.clear();
        console.log(camera.rayCasting(cube));
        console.log(`\nrotX: ${roll} rotY: ${pitch} rotZ: ${yaw}\n\n`);
        console.log(" |Z");
        console.log(" |   /Y");
        console.log(" |  / ");
        console.log(" | / ");
        console.log(" |/______ X\n\n");

        roll = await new Promise(resolve => readline.question("Enter rotation around X in degrees: ", resolve));
        pitch = await new Promise(resolve => readline.question("Enter rotation around Y in degrees: ", resolve));
        yaw = await new Promise(resolve => readline.question("Enter rotation around Z in degrees: ", resolve));
        zoom = await new Promise(resolve => readline.question("Enter zoom: ", resolve));

        rollR = Math.PI * roll / 180;
        pitchR = Math.PI * pitch / 180;
        yawR = Math.PI * -yaw / 180;
        camera.changeTransform(rollR, pitchR, yawR, zoom);
    }
}

main();