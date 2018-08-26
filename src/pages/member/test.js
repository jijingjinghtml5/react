let a = [4,5];
let b = [1,2,3];
let c = [...a,...b];
c.reverse();	
console.log(c);
function points(x,y){
	this.a = x;
	this.b = y;
	this.dist = function(){
	 	var p1 = this.a;
	 	console.log(p1);
	 	var p2 = this.b;
	 	return Math.sqrt(p1*p1+p2*p2);
	}
}
points.prototype.r = function(){
	return Math.sqrt(this.a*this.a+this.b*this.b);
}
var point = new points(1,1);

var d = point.r();
console.log(d);
