<template>
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 400" xml:space="preserve" :style="getResponsiveStyle">
    <circle :r="radius" cx="200" cy="200" class="circle"></circle>
    <circle v-for="i in numPoints" r="2" :cx="radial_points(i).x" :cy="radial_points(i).y" class="circle"></circle>
    <line v-if="!playing" v-for="line in lines" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" class="line" />
    <line v-if="playing" v-for="line in playing_lines" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" class="line" />
  </svg>
</template>

<script>
  import g from './geometry_functions';

  export default {
    props : ['radius', 'numPoints', 'multiplier'],
    data: () => ({
      //radius : 190
      playing : false,
      anim_lines : 0,
      timeline : null
    }),
    methods : {
      radial_points : function(i){
        var angle = (i / this.numPoints) * 360;
        return this.findPointOnCircle(200, 200, this.radius, angle);
      },
      line_points : function(i){
        var angle = (1 / this.numPoints) * 360;
        var p1 = this.findPointOnCircle(200, 200, this.radius, angle * i);
        var p2 = this.findPointOnCircle(200, 200, this.radius, (angle * i) * this.multiplier);
        return {
          x1 : p1.x, 
          y1 : p1.y, 
          x2 : p2.x, 
          y2 : p2.y,
          a1 : (angle * i) % 360,
          a2 : ((angle * i) * this.multiplier) % 360
        };
      },
      findPointOnCircle(originX, originY , radius, angleDegrees) {
        var angleRadians = Math.PI * 2 * angleDegrees / 360;
        var newX = (radius * Math.cos(angleRadians) + originX);
        var newY = (radius * Math.sin(angleRadians) + originY);
        return {"x" : newX, "y" : newY}
      },
      play : function(){
        var g = this;
        clearInterval(this.timeline)
        this.anim_lines = 0
        this.playing = true;
        var num_lines = this.lines.length;

        this.timeline = setInterval(function(){
          if (g.anim_lines >= num_lines){
            clearInterval(g.timeline)
            g.playing = false;
          }else{
            g.anim_lines++;
          }
        }, 25)
      }
    },
    computed : {
      //creates an array of line points used for drawing. 
      lines : function(){
        var r = [];
        var dupes = [];
        var i = 1;
        //removes duplicates and also keeps the number of lines under a reasonable number. 
        while (i < 1000){
          var pts = this.line_points(i);
          var a1 = Math.round(pts.a1 * 100) / 100;
          var a2 = Math.round(pts.a2 * 100) / 100;
          if (!dupes.includes(a1 + "--" + a2) &&  !dupes.includes(a2 + "--" + a1)){
            r.push(pts);
            dupes.push(a1 + "--" + a2);
          }
          i++;
        }
        return r;
      },
      playing_lines : function(){
        if (this.anim_lines.length >= this.lines.length){
          this.playing = false;
          clearInterval(this.timeline)
        }
        return this.lines.slice(0, this.anim_lines);
      },
      getResponsiveStyle : function(){
        if (this.$vuetify.breakpoint.name != 'xs'){
          return "height:400px; max-width: 100%; max-height:450px; enable-background:new -50 -50 300 300";
        }else{
          return "height:300px; max-width: 100%; max-height:250px; enable-background:new -50 -50 300 300";
        }
      },
    }
  }
</script>

<style>
.circle {
  fill:none;
  stroke:#aaaaaa;
  stroke-width: .25px;
  stroke-miterlimit:10;
}
.line {
  fill:none;
  stroke:#3333ff;
  stroke-width: .25px;
  stroke-miterlimit:10;
}
</style>
