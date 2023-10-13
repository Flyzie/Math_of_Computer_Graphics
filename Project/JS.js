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
    
}


function main(){

const VectorOne = new Vector3D(2, 3 ,4);
const VectorTwo = new Vector3D(2, 3 ,4);

const VectorSum = VectorOne.add(VectorTwo);
const VectorMul = VectorOne.scalarMultiply(2);
const VectorLen1 = VectorOne.calculateLength();

//console.log(VectorMul);
//console.log(VectorLen1);
console.log(VectorOne);
console.log(VectorOne.calculateLength());
const VectorNorm = VectorOne.normalize();
console.log(VectorNorm);
console.log(VectorNorm.calculateLength());

}

main();