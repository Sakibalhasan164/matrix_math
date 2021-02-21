let angle = 30;
let coOrdinates;
let lineCoOrdinates;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(250);
  for (i = 0; i < 100; i += 10) {
    // for (j = 0; j < 20; j += 5) {
    //   for (k = 0; k < 20; k += 10) {
    //     for (l = 0; l < 50; l += 5) {
    //       for (m = 0; m < 40; m += 5) {
    //         for (n = 0; n < 50; n += 5) {
    //           for (o = 0; o < 30; o += 3) {
    coOrdinates = [
      [-i, -i, -i],
      [-i, -i, i],
      [-i, i, -i],
      [-i, i, i],
      [i, -i, -i],
      [i, -i, i],
      [i, i, -i],
      [i, i, i],
      //                 [-j, -j, -j],
      //                 [-j, -j, j],
      //                 [-j, j, -j],
      //                 [-j, j, j],
      //                 [j, -j, -j],
      //                 [j, -j, j],
      //                 [j, j, -j],
      //                 [j, j, j],
      //                 [-k, -k, -0],
      //                 [-k, -k, 0],
      //                 [-k, k, -0],
      //                 [-k, k, 0],
      //                 [k, -k, -0],
      //                 [k, -k, 0],
      //                 [k, k, -0],
      //                 [k, k, 0],
      //                 [-l, -l, 0],
      //                 [-l, -l, 0],
      //                 [-l, l, -0],
      //                 [-l, l, 0],
      //                 [l, l, -0],
      //                 [l, -l, 0],
      //                 [l, l, -0],
      //                 [l, l, 0],
      //                 [-0, -m, m],
      //                 [-0, -m, m],
      //                 [-0, m, -m],
      //                 [-0, m, m],
      //                 [0, m, -m],
      //                 [0, -m, m],
      //                 [0, m, -m],
      //                 [0, m, m],
      //                 [-n, -0, 0],
      //                 [-n, -0, 0],
      //                 [-n, 0, -0],
      //                 [-n, 0, 0],
      //                 [n, 0, -0],
      //                 [n, -0, 0],
      //                 [n, 0, -0],
      //                 [n, 0, 0],
      //                 [-n, -0, o],
      //                 [-n, -o, o],
      //                 [-n, o, -o],
      //                 [-n, o, o],
      //                 [n, o, -o],
      //                 [n, -o, o],
      //                 [n, o, -o],
      //                 [n, o, o],
    ];
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
}

const projection = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

function draw() {
  console.log(mouseX, mouseY);
  let size = 1;

  const scalerMatrix = [
    [size, 0, 0],
    [0, size, 0],
    [0, 0, size],
  ];
  background(250);
  // angle += 0.3;
  // console.log(angle);
  translate(width / 2, height / 2);

  //rotation matrices
  const rotateMatrixZ = [
    [Math.cos(angle), -Math.sin(angle), 0],
    [Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 1],
  ];
  const rotateMatrixX = [
    [1, 0, 0],
    [0, Math.cos(angle), -Math.sin(angle)],
    [0, Math.sin(angle), Math.cos(angle)],
  ];
  const rotateMatrixY = [
    [Math.cos(angle), 0, Math.sin(angle)],
    [0, 1, 1],
    [-Math.sin(angle), 0, Math.cos(angle)],
  ];

  //linier transformation
  for (i = 0; i < coOrdinates.length; i++) {
    stroke(255, 0, 0);
    strokeWeight(2);
    // matrix Stuff
    let scaled = mult(coOrdinates[i], scalerMatrix);
    let rotated = mult(scaled, rotateMatrixX);
    rotated = mult(rotated, rotateMatrixY);
    rotated = mult(rotated, rotateMatrixZ);
    const projected = mult(rotated, projection);
    //drawing the cube
    fill(255, 0, 0);
    // noFill();
    strokeWeight(2);
    // noStroke();
    line(projected[0], projected[1], 0, 0);
    // line(coOrdinates[0],coOrdinates[])
  }
  //  noLoop()
  lineCoOrdinates = [
    [100, 100, 0],
    [100, 200, 0],
    [100, -100, 0],
  ];
  for (i = 0; i < lineCoOrdinates.length; i++) {
    let lineRotation = mult(lineCoOrdinates[i], rotateMatrixX);
    lineRotation = mult(lineRotation, rotateMatrixY);
    lineRotation = mult(lineRotation, rotateMatrixZ);
    // console.log(lineRotation);
    let r = mult(lineRotation, projection);
    // fill(255, 0, 0);
    stroke(255, 0, 0, 100);
    strokeWeight(1);

    line(r[0], r[1], 200, 200);
    line(r[0], r[1], -200, 200);
    line(r[0], r[1], 200, -200);
    line(r[0], r[1], -200, -200);
  }
  angle += 0.02;
}

function mult(a, b) {
  const n = math.multiply(a, b);
  return n;
}
// console.log(matrix);
function transpose(a) {
  const result = math.transpose(a);
  return result;
}
let press = false;
function mousePressed() {
  press = !press;
  press ? noLoop() : loop();
}
