import Vector3D from './vectors';
import Matrix3D from './matrix';
import Quaternion from './quaternion';
import Line3D from './line';
import Plane3D from './plane';
import Section3D from './section';
import Orb3D from './orb';
import Cube3D from './cube';

let ctx = document.querySelector("canvas").getContext("2d");
let center = new Vector3D(0, 0, 0);
let cube = new Cube3D(center, 200);

      let height = document.documentElement.clientHeight;
      let width = document.documentElement.clientWidth;

      let projectionMatrix = new Matrix3D([
        [1, 0, 0],
        [0, 1, 0]
    ]);
    function convertVector(Vector){
        return new Matrix3D(4,1, Vector.x, Vector.y, Vector.z, 1);
    }

      function loop() {
        ctx.clearRect(0, 0, width, height);

    // Rotate the cube
        cube.rotateY(angle);
        cube.rotateX(angle);

        // Project the vertices onto the 2D canvas
        let projectedVertices = cube.vertices.map(vertex => {
            let rotatedVertex = vertex.rotateY(angle).rotateX(angle);
            return projectionMatrix.multiplyVector(rotatedVertex);
        });

        // Draw the edges of the cube
        ctx.beginPath();
        for (let i = 0; i < cube.edges.length; i++) {
            let edge = cube.edges[i];
            let v1 = projectedVertices[edge[0]];
            let v2 = projectedVertices[edge[1]];
            ctx.moveTo(v1.x + width / 2, -v1.y + height / 2);
            ctx.lineTo(v2.x + width / 2, -v2.y + height / 2);
        }
        ctx.stroke();

        // Increase the angle for the next frame
        angle += 0.01;

        // Call the loop function again for the next frame
        requestAnimationFrame(loop);

      }

      loop();