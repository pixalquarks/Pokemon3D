import internal from "stream";

class Vector3 {
    x: number;
    y: number;
    z: number;
    angle: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, angle = false) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    magnitude() {
        if (this.angle) return -1;
        return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2), 0.5);
    }

    normalized() {
        if (this.angle) return -1;
        let mag = this.magnitude();
        return new Vector3(this.x / mag, this.y / mag, this.z / mag);
    }
}


function GetAngleFromVector(dir : Vector3) : Vector3 {
    let angle = new Vector3(0,0,0, true);
    let mag = dir.magnitude();
    angle.x = Math.acos(dir.x / mag);
    angle.y = Math.acos(dir.x / mag);
    angle.z = Math.acos(dir.z / mag);
    return angle;
}