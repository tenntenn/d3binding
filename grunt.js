/*global module:false*/
module.exports = function(grunt) {

        grunt.loadNpmTasks('grunt-requirejs');
        grunt.loadNpmTasks('grunt-contrib-yuidoc');

        // Project configuration.
        grunt.initConfig({
                pkg: '<json:package.json>',
                meta: {
                        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
                },
                requirejs: {
                        baseUrl: ".",
                        paths: {
                                "almond":"lib/almond",
                                "d3binding":"src/d3binding"
                        },
                        include: [
                                "almond",
                                "d3binding/main"
                        ],
                        exclude: [],
                        out: "dist/build.js",
                        wrap: {
                                startFile: "wrap/wrap.start",
                                endFile: "wrap/wrap.end"
                        },
                        skipModuleInsertion: false,
                        optimizeAllPluginResources: true,
                        findNestedDependencies: true
                },
                lint: {
                        files: [
                                'src/d3binding/*.js',
                        ]
                },
                min: {
                       dist: {
                                src: ['<banner:meta.banner>','<config:requirejs.out>'],
                                dest: 'dist/<%= pkg.name %>.min.js'
                        }
                },
                watch: {
                        files: '<config:lint.files>',
                        tasks: 'doc lint requirejs min'
                },
                jshint: {
                        options: {
                                curly: true,
                                eqeqeq: true,
                                immed: true,
                                latedef: true,
                                newcap: true,
                                noarg: true,
                                sub: true,
                                undef: true,
                                boss: true,
                                eqnull: true,
                                browser: true
                        },
                        globals: {
                                "console":true,
                                "sb": true,
                                "d3": true,
                                "define": true
                        }
                },
                yuidoc: {
                        compile: {
                                "name": '<%= pkg.title || pkg.name %>',
                                "description": '<%= pkg.description %>',
                                "version": '<%= pkg.version %>',
                                "logo": '../img/logo.png',
                                "url": '<%= pkg.homepage %>',
                                options: {
                                        paths: '<config:requirejs.baseUrl>',
                                        outdir: 'docs',
                                        blockHelper: true
                                }
                        }
                }
        });

        // Create API documnet
        grunt.registerTask('doc', 'yuidoc');

        // Default task.
        grunt.registerTask('default', 'lint requirejs min doc');

};
