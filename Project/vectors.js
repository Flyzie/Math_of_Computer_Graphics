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
    if(k != 0){
        return new Vector3D(this.x / k, this.y / k, this.z / k);
    }else{
        return console.log("Cannot divide by 0");
    }
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

module.exports = Vector3D;