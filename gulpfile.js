// load the plugins
var gulp         = require('gulp');
var stylus       = require('gulp-stylus');
var minifyCSS    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var include      = require('gulp-include');
var livereload   = require('gulp-livereload')
var nodemon      = require('gulp-nodemon');
var jade         = require('gulp-jade');
var jeet         = require('jeet');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function(done) {
  return gulp.src('assets/css/*.css.styl')
    .pipe( stylus({ errors: true, use: [jeet()] }) )
    .pipe( autoprefixer({ cascade: false }) )
    .pipe( minifyCSS() )
    .pipe( rename(function(path){
      path.basename = path.basename.replace('.css', '');
      path.extname = '.min.css';
    }))
    .pipe( gulp.dest('public/assets') )
    .pipe( livereload() );
    //.on('end', done);
});

gulp.task('js', function(done) {
  gulp.src('assets/js/*.js')
    .pipe(include())
    .pipe(gulp.dest('public/assets'))
    .pipe(livereload())
    .on('end', done);
});

gulp.task('jade', function(done) {
  gulp.src('assets/views/**/*.jade')
    .pipe(jade())
    .pipe(rename(function (path) {
      path.extname = '.html';
    }))
    .pipe(gulp.dest('public/assets'))
    .pipe(livereload())
    .on('end', done);
});

gulp.task('reload', function(){
  livereload.reload();
})

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('assets/css/**/*.styl', ['css']);
  gulp.watch('assets/js/**/*.js', ['js']);
  gulp.watch('assets/views/**/*.jade', ['jade']);
  gulp.watch('modules/**/*.jade', ['reload']);
});

gulp.task('build', ['css', 'js', 'jade']);

gulp.task('nodemon', function() {
  nodemon().on('restart', function() {
    console.log('Server restarted!');
  });
});

gulp.task('default', ['nodemon', 'watch']);
