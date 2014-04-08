module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      common: {
        src: ['js/loadLibrary.js', 'js/plugins.js', 'js/common.js'],
        dest: 'js/build/common.min.js'
      },
      contact: {
        src: ['js/model/ContactModel.js', 'js/view/ContactView.js', 'js/controller/ContactController.js'],
        dest: 'js/build/contact.min.js'
      },
      company: {
        src: ['js/view/CompanyView.js', 'js/controller/CompanyController.js'],
        dest: 'js/build/company.min.js'
      },
      helpdesk: {
        src: ['js/model/HelpDeskModel.js', 'js/view/HelpDeskView.js', 'js/controller/HelpDeskController.js'],
        dest: 'js/build/helpdesk.min.js'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'js/main.js',
        'js/common.js',
        'js/loadLibrary.js',
        'js/plugins.js'
      ],
      test: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },
    cssmin: {
      combine: {
        files: {
          'css/output.css': ['css/normalize.css', 'css/main.css', 'css/style.css']
        }
      }
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'img/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'img/build'              // Destination path prefix
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  // Default task(s).
  grunt.registerTask('default', ['jshint','uglify','cssmin','imagemin']);

};