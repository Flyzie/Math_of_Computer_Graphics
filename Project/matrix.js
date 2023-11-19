class Matrix{
    constructor (...parameters){
        this.elements = parameters;
    }

    matrixCheck(){

        if(this.elements.length == 9){
            return 9;

        }else if(this.elements.length == 16){
            return 16;

        }else{
            return console.log("This matrix has wrong dimensions. It has to be eather 3z3 or 4x4");
        }
    }

    matrixAdd(Matrix2){
       if(this.matrixCheck() === 9 && Matrix2.matrixCheck() === 9){

        return new Matrix(  this.elements[0] + Matrix2.elements[0],
                            this.elements[1] + Matrix2.elements[1],
                            this.elements[2] + Matrix2.elements[2],
                            this.elements[3] + Matrix2.elements[3],
                            this.elements[4] + Matrix2.elements[4],
                            this.elements[5] + Matrix2.elements[5],
                            this.elements[6] + Matrix2.elements[6],
                            this.elements[7] + Matrix2.elements[7],
                            this.elements[8] + Matrix2.elements[8]);

        }else if(this.matrixCheck === 16 && Matrix2.matrixCheck === 16){

        return new Matrix(  this.elements[0] + Matrix2.elements[0],
                            this.elements[1] + Matrix2.elements[1],
                            this.elements[2] + Matrix2.elements[2],
                            this.elements[3] + Matrix2.elements[3],
                            this.elements[4] + Matrix2.elements[4],
                            this.elements[5] + Matrix2.elements[5],
                            this.elements[6] + Matrix2.elements[6],
                            this.elements[7] + Matrix2.elements[7],
                            this.elements[8] + Matrix2.elements[8],
                            this.elements[9] + Matrix2.elements[9],
                            this.elements[10] + Matrix2.elements[10],
                            this.elements[11] + Matrix2.elements[11],
                            this.elements[12] + Matrix2.elements[12],
                            this.elements[13] + Matrix2.elements[13],
                            this.elements[14] + Matrix2.elements[14],
                            this.elements[15] + Matrix2.elements[15]);
        }else{
            return 0;
        }
    }
}

/*
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
*/

const matrix1 = new Matrix(1, 1, 1, 1 ,1 , 1, 1, 1 ,1);
const matrix2 = new Matrix(2, 2, 2, 2, 2, 2, 2, 2, 2);
const matrix3 = matrix1.matrixAdd(matrix2);
console.log(matrix1); 
console.log(matrix3); 