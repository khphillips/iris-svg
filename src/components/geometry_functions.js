const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = ( 2 * PI ) / 3;
const c5 = ( 2 * PI ) / 4.5;

import e from './easing_functions';

const geometryFunctions = {
	findPointOnCircle(originX, originY , radius, angleDegrees) {
		var angleRadians = PI * 2 * angleDegrees / 360;
        var newX = (radius * Math.cos(angleRadians) + originX);
        var newY = (radius * Math.sin(angleRadians) + originY);
        return {"x" : newX, "y" : newY}
	},
	findPointOnCircleRadians(originX, originY , radius, angleRadians) {
        var newX = (radius * Math.cos(angleRadians) + originX);
        var newY = (radius * Math.sin(angleRadians) + originY);
        return {"x" : newX, "y" : newY}
	},
	findAngleOfPointOnCircle(x, y, cx, cy){
		var angle = Math.atan2(cy - y, x - cx);
    	return angle;
	},
	findDistance(x1, y1, x2, y2){
		return Math.sqrt(((x2 - x1)*(x2 - x1)) + ((y2 - y1)*(y2 - y1)));
	},

	radiansToDegrees(r){
		return r * 180/Math.PI
	},
	degreesToRadians(d){
		return d * Math.PI/180;
	},

	find_angle(A,B_center,C) { //returns radians
	    var AB = Math.sqrt(Math.pow(B_center.x-A.x,2)+ Math.pow(B_center.y-A.y,2));    
	    var BC = Math.sqrt(Math.pow(B_center.x-C.x,2)+ Math.pow(B_center.y-C.y,2)); 
	    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
	    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
	},

	findRadiusWithWidthHeight(w, h){
		return (h/2) + ((w / 2) / (8 * H));
	},

	findCircleCenter(x1, y1, x2, y2, r, neg){
		//find X candidates
		var radius2 = r * r;
		var q = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
		var x3 = (x1 + x2) / 2;
		var y3 = (y1 + y2) / 2;
		if (neg){
			var c_x = x3 + Math.sqrt(radius2 - ((q / 2) * (q / 2))) * ((y1 - y2) / q);
			var c_y = y3 + Math.sqrt(radius2 - ((q / 2) * (q / 2))) * ((x2 - x1) / q);
		}else{
			c_x = x3 - Math.sqrt(radius2 - ((q / 2) * (q / 2))) * ((y1 - y2) / q);
			c_y = y3 - Math.sqrt(radius2 - ((q / 2) * (q / 2))) * ((x2 - x1) / q);
		}
		return {x:c_x, y:c_y};
	},

	

    //order in counter clockwise fashion.
    //rewrite so that we set up a index of all vertices and then set the faces to reference the index of the verices within the array
    //so we are duplicating the vertices... might smooth out the oddness. 
	createVerticesFromPaths(path1, path2){
		var v = []
		for (var i = 0; i < path1.length - 1; i++){

			v.push(path1[i + 1].x);
			v.push(path1[i + 1].y);
			v.push(path1[i + 1].z);

			v.push(path1[i].x);
			v.push(path1[i].y);
			v.push(path1[i].z);

			v.push(path2[i].x);
			v.push(path2[i].y);
			v.push(path2[i].z);

			v.push(path1[i + 1].x);
			v.push(path1[i + 1].y);
			v.push(path1[i + 1].z);

			v.push(path2[i].x);
			v.push(path2[i].y);
			v.push(path2[i].z);

			v.push(path2[i + 1].x);
			v.push(path2[i + 1].y);
			v.push(path2[i + 1].z);

			
		}
		return v;
	},

	

};

export default geometryFunctions;