gulp                 = require 'gulp'
webserver            = require 'gulp-webserver'
coffee               = require 'gulp-coffee'
gutil                = require 'gulp-util'
rename               = require 'gulp-rename'
browserify           = require 'gulp-browserify'
vueify               = require 'vueify'

###
* build scripts public
###
gulp.task 'build', () -> 
    gulp.src './demo/main.coffee', read: false
    .pipe browserify
      transform: ['coffeeify', [{_flags: {debug: true}}, vueify]],
      extensions: ['.coffee'],
      debug : true
    .pipe rename extname: '.js'
    .pipe gulp.dest './demo'
    .on 'error', gutil.log


gulp.task 'demo', () -> 
    gulp.src './demo'
    .pipe webserver
        host:'localhost',
        port:'3000',
        livereload: true,
        directoryListing: true,
        open: true
        directoryListing: 
            enable: true,
            path: 'index.html'

