class Vector3D{
    constructor (x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
}

add(Vector2){
    return new Vector3D(this.x + Vector2.x, this.y + Vector2.y, this.z + Vector2.z);
}

subtract(Vector2){
    return new Vector3D(this.x - Vector2.x, this.y - Vector2.y, this.z - Vector2.z);
}

scalarMultiply(k){
    return new Vector3D(this.x * k, this.y * k, this.z * k);
}

scalardDivide(k){
    return new Vector3D(this.x / k, this.y / k, this.z / k);
}

dotProduct(Vector2){
    return this.x * Vector2.x + this.y * Vector2.y + this.z * Vector2.z;
}

calculateLength(){
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
}

normalize(){
    const l = this.calculateLength();
    if(l==0){
        return console.log("Cannot divide by 0");
    }else{
       return this.scalardDivide(l);
    }
}

crossProduct(Vector2){ //iloczyn skalarny 
    return new Vector3D((this.y * Vector2.z) - (this.z * Vector2.y) , (this.z * Vector2.x) - (this.x * Vector2.z), (this.x * Vector2.y) - (this.y * Vector2.x));
}

degreeCalculator(Vector2){

    let x =  this.dotProduct(Vector2);
    return "kąt miedzy wektorami: ", Math.acos(x / (this.calculateLength() * Vector2.calculateLength())) * (180 / Math.PI);
}

    
}


function main(){

const VectorOne = new Vector3D(0, 3, 0);
const VectorTwo = new Vector3D(5, 5, 0);
const VectorThree = new Vector3D(4, 5 ,1);
const VectorFour = new Vector3D(4, 1 ,3);

console.log("dodawanie wektórów 1: ", (VectorOne.add(VectorTwo)));
console.log("dodawanie wektórów 2: ", (VectorTwo.add(VectorOne)));
console.log("kąt między wektorami: ", VectorOne.degreeCalculator(VectorTwo));

console.log("//////////////////////////////////////////////////////////////////////////////////////////")

const VectorCross = VectorThree.crossProduct(VectorFour);
console.log("Wektor prostopadły: ", VectorCross);
const VectorNorm = VectorCross.normalize();
console.log("Wektor znormalizowany: ", VectorNorm, "jego długość: ", VectorNorm.calculateLength());

}

main();