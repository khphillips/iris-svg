module.exports = process.env.NODE_ENV === 'development' ? {
	filenameHashing : false,
	runtimeCompiler : true
  }
  : 
  {
  	  transpileDependencies : ["cssprefix"],
	  runtimeCompiler : true,
	  //outputDir: 'dist/_assets/vendor/vue-iris/',
	  chainWebpack: config => {
	    config.plugins.delete('copy')
	  },
	  css: {
	    extract: {
	      filename: 'css/[name].css',
	      chunkFilename: 'css/[name].css'
	    }
	  },
	  configureWebpack: {
	  	devtool: "source-map",
	  	mode: 'production',
	    output: {
	      filename: 'js/[name].js',
	      chunkFilename: 'js/[name].js'
	    }
	  }
  }