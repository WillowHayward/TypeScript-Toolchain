module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    expand: true,
                    src: ['dist/*.js', '!dist/*.min.js'],
                    dest: './',
                    cwd: '.',
                    rename: function (dst, src) {
                        // To keep the source js files and make new files as `*.min.js`:
                        return dst + '/' + src.replace('.js', '.min.js');
                    }
                }]
            }
        },
        exec: {
            tsc: './node_modules/typescript/bin/tsc',
            webpack: './node_modules/.bin/webpack'
        },
        tslint: {
            options: {
                rulesDirectory: 'node_modules/tslint-microsoft-contrib',
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: ['src/*.ts']
            }
        },
        clean: {
            build: ['build'],
            dist: ['dist']
        }
    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-clean');



    // Default task(s).
    grunt.registerTask('build', ['tslint', 'exec', 'clean:build', 'uglify'])
    grunt.registerTask('default', ['build']);
  };