var gulp    = require('gulp'), 
	connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-clean-css'),
  concat = require('gulp-concat');
var startFolder = 'src/';

gulp.task('connect', function() {
  connect.server({
    root: startFolder,
    port:process.env.PORT || 8080,
    livereload: true,
    livereloadPort: 3000,
    middleware:function(connect){
    return[connect().use("/bower_components", connect.static("bower_components"))];	
   

    }
  });
});

gulp.task('html', function() {
    gulp.src(startFolder + '**.html'+ 'modules/**/**/**.html')
    .pipe(connect.reload());
});
gulp.task('sass', function() {
  return gulp.src(startFolder + 'sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(startFolder + 'css/'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
 
  gulp.watch(startFolder + '**.html',['html']);
  gulp.watch(startFolder + 'sass/**/**.*', ['sass']);
});
gulp.task('build', ['html','sass'],function() {

});

gulp.task('default',['connect','watch','build']);


