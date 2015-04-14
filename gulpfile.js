var gulp = require('gulp'), 
    path = require('path'),
    jshint = require('gulp-jshint'),
    refresh = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    open = require ('gulp-open');

//lint performs a jshint on a directory
gulp.task('lint', function() {
  return gulp.src(['./**/*.js', '!./node_modules/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('webserver', function() {
  gulp.src( './' )
    .pipe(webserver({
        host:             'localhost',
        port:             8080,
        livereload:       true,
        fallback: 'index.html'
    }));
});

// Watch Task (watches for changes)
gulp.task('watch', function(){
    gulp.watch('./**/*.js', ['lint']);
});

// Open Task (starts app automatically)
gulp.task("open", function(){
    var options = {
        url: "http://localhost:8080",
        app: "Chrome"
    };
    gulp.src("dist/index.html")
        .pipe(open("", options));
});

gulp.task('default', ['lint', 'webserver', 'watch']);