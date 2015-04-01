module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			js: {
			  	options: {
			    // define a string to put between each file in the concatenated output
			    separator: ';'
			  	},

			    // the files to concatenate
			    src: [
			    	'js/vendor/*.js',
			    	'js/game/data/*.js',
			    	'js/game/static/*.js',
			    	'js/game/utilities/util.js',
			    	'js/game/utilities/*.js',
			    	'js/game/entities/*.js',
			    	'js/game/*.js',
			    	'js/*.js'
			    	],
			    // the location of the resulting JS file
			    dest: 'build/app.js'
			  }
		},

		uglify: {
			оptions: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      	},
	     	build: {
				src: 'build/app.js',
	        	dest: 'build/app.js'
	      	}
	    },

	    cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'build/style.css': ['styles/*.css']
		    }
		  }
		  // copyfile: {
		  // 	'index.html': 'build/index.html'
		  // }
}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-concat');
  	grunt.loadNpmTasks('grunt-contrib-cssmin');

  	

  	// grunt.registerMultyTask('copyfile', function (){
  	// 	if (!file){
  	// 		grunt.fatal('Provede a file path, to copyfile')
  	// 	}
  	// 	grunt.file.copy(this.target, this.data);
  		
  	// });

  	 grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
}
