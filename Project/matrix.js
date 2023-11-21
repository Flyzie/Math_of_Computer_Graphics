class Matrix{
    constructor (rows, cols, ...parameters){
        this.rows = rows;
        this.cols = cols;
        this.elements = parameters;
    }

    matrixCheck(){

        if(this.elements.length == 9 && this.rows == this.cols){
            return 9;

        }else if(this.elements.length == 16 && this.rows == this.cols){
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

    matrixScalar(k){
        if(this.matrixCheck() === 9){

        return new Matrix(  this.elements[0] * k,
                            this.elements[1] * k,
                            this.elements[2] * k,
                            this.elements[3] * k,
                            this.elements[4] * k,
                            this.elements[5] * k,
                            this.elements[6] * k,
                            this.elements[7] * k,
                            this.elements[8] * k)

        }else if(this.matrixCheck === 16){

        return new Matrix(  this.elements[0] * k,
                            this.elements[1] * k,
                            this.elements[2] * k,
                            this.elements[3] * k,
                            this.elements[4] * k,
                            this.elements[5] * k,
                            this.elements[6] * k,
                            this.elements[7] * k,
                            this.elements[8] * k,
                            this.elements[9] * k,
                            this.elements[10] * k,
                            this.elements[11] * k,
                            this.elements[12] * k,
                            this.elements[13] * k,
                            this.elements[14] * k,
                            this.elements[15] * k);
        }else{
            return 0;
        }
    }

    matrixMultiply(Matrix2){

        const rows1 = this.rows
        const cols1 = this.cols;
        const rows2 = Matrix2.rows
        const cols2 = Matrix2.cols;

        if (cols1 !== rows2) {
            console.error("Matrix multiplication not supported for the given dimensions.");
            return 0;
        }

        const result = [];

        for (let i = 0; i < rows1; i++) {
            for (let j = 0; j < cols2; j++) {
                let sum = 0;
                for (let k = 0; k < cols1; k++) {
                    sum += this.elements[i * cols1 + k] * Matrix2.elements[k * cols2 + j];
                }
                result.push(sum);
            }
        }

            return new Matrix(rows1, cols2, ...result);
        }

     matrixTranspose() {

        const result = [];

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                result.push(this.elements[j * this.cols + i]);
            }
        }

        return new Matrix(this.rows, this.cols , ...result);
    }    
    
    
}

    function identityMatrix(rows, cols){
    
    if (cols !== rows) {
        console.error("Matrix multiplication not supported for the given dimensions.");
        return 0;
    }

    const result = []
    let k = 0;

        for(let i = 0; i < rows; i++){
            for(let j =0; j < cols; j++){
                if(k == 0 || (k % (rows + 1)) == 0){
                    result[k] = 1;
                }else{
                    result[k] = 0;
                }
                k++
            }
        }
        return new Matrix(rows, cols, ...result)
    }
/*
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
*/

const identytyMat = identityMatrix(3, 3);
const matrix1 = new Matrix(2,3,   2,1,4,3,5,1);
const matrix2 = new Matrix(3,2,   1, 4, 6, 8, 2, 4);
const matrix3 = matrix1.matrixMultiply(matrix2);
console.log(matrix1); 
console.log(matrix3); 
console.log(identytyMat);
console.log(matrix1.matrixTranspose())