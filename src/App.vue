<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <h2>Controls</h2>
          <v-slider name="name" label="Number of Points" thumb-label="always" max="360" v-model="numPoints" ></v-slider>
          <v-slider name="name" step=".25" thumb-label="always" max="30" label="Multiplier" v-model="multiplier" ></v-slider>
          <v-slider name="name" step="1" thumb-label="always" max="300" label="Radius" v-model="radius" ></v-slider>
          <v-btn @click="play">Play</v-btn>
        </v-flex>
        <v-flex xs12 sm8 text-xs-center>
          <iris-svg ref="svg" :num-points="numPoints" :radius="radius" :multiplier="multiplier"></iris-svg>
        </v-flex>
        {{ $refs.playing }}
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import IrisSvg from './components/IrisSvg'

export default {
  name: 'App',
  components: {
    IrisSvg
  },
  data () {
    return {
      numPoints : 180,
      multiplier : 2,
      radius : 200,
    }
  },
  computed : {
    
  },
  methods: {
    play : function(){
      this.$refs.svg.play();
    }
  }
}
</script>
