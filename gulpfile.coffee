gulp                 = require 'gulp'
webserver            = require 'gulp-webserver'
coffee               = require 'gulp-coffee'
gutil                = require 'gulp-util'
rename               = require 'gulp-rename'
browserify           = require 'gulp-browserify'
clean                = require 'gulp-clean'
vueify               = require 'vueify'
 
###
* Clean
###
gulp.task 'clean', () -> 
    gulp.src './dist/', read: false
    .pipe clean()

###
* build scripts public
###
gulp.task 'build', () -> 
    gulp.src './main.coffee', read: false
    .pipe browserify
      transform: ['coffeeify', [{_flags: {debug: true}}, vueify]],
      extensions: ['.coffee'],
      debug : true
    .pipe rename extname: '.js'
    .pipe gulp.dest './'
    .on 'error', gutil.log


gulp.task 'webserver', () -> 
    gulp.src './'
    .pipe webserver
        host:'localhost',
        port:'3000',
        livereload: true,
        directoryListing: true,
        #open: true
        directoryListing: 
            enable: true,
            #path: 'index.html'

