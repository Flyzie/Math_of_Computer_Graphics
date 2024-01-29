import Vector3D from './vectors.js';
import Matrix3D from './matrix.js';
import Quaternion from './quaternion.js';
import Line3D from './line.js';
import Plane3D from './plane.js';
import Section3D from './section.js';
import Cube3D from './cube.js';

let ctx = document.querySelector("canvas").getContext("2d");
let height = ctx.canvas.height = document.documentElement.clientHeight;
let width = ctx.canvas.width = document.documentElement.clientWidth;

const Point2D = function(x, y) { this.x = x; this.y = y; };

let center = new Vector3D(0, 0, 400);
let cube = new Cube3D(center, 200);
let pointer = new Point2D(0, 0);

function convertVector(Vector){
    return new Matrix3D(4,1, Vector.x, Vector.y, Vector.z, 1);
}

function project(vertices, width, height){

    let points2d = new Array(vertices.length);
    let focalLength = 200;

    for (let i = vertices.length - 1; i > -1; i--){
        let p = vertices[i];
        let x = p.x * (focalLength / p.z) + width / 2;
        let y = p.y * (focalLength / p.z) + height / 2;

        points2d[i] = new Point2D(x, y);
    }

    return points2d;
}  

function loop() {
    ctx.clearRect(0, 0, width, height); // clear canvas

    ctx.fillRect(0, 0, 50, 50); 
    ctx.canvas.height = document.documentElement.clientHeight;
    ctx.canvas.width = document.documentElement.clientWidth;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#ffffff";

    cube.rotateCubeX(pointer.y * 0.001);
    cube.rotateCubeY(-pointer.x * 0.001);

    ctx.fillStyle = "#0080f0";

    let vertices = project(cube.vertices, width, height);

    for (let i = cube.planesToDraw.length - 1; i > -1; -- i) {

        let face = cube.planesToDraw[i];

        let p1 = cube.vertices[face[0]];
        let p2 = cube.vertices[face[1]];
        let p3 = cube.vertices[face[2]];

        let v1 = new Vector3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
        let v2 = new Vector3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);

        let n  = new Vector3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);

        if (-p1.x * n.x + -p1.y * n.y + -p1.z * n.z <= 0) {

          ctx.beginPath();
          ctx.moveTo(vertices[face[0]].x, vertices[face[0]].y);
          ctx.lineTo(vertices[face[1]].x, vertices[face[1]].y);
          ctx.lineTo(vertices[face[2]].x, vertices[face[2]].y);
          ctx.lineTo(vertices[face[3]].x, vertices[face[3]].y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

        }
        //console.log(cube.vertices);
        //console.log(cube.planes);

    }
    window.requestAnimationFrame(loop);
}

window.addEventListener("click", (event) => {

    pointer.x = event.pageX - width * 0.5;
    pointer.y = event.pageY - height * 0.5;

});


console.log(cube.planes[1]);
console.log(cube.vertices);
loop();