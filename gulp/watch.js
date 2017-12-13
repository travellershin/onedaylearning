var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){

  browserSync.init({
    notify: false,
    server:{
      baseDir: "app/public"
    }
  })

  watch('./app/public/**/*.html', function(){
    browserSync.reload();
  });

  watch('./app/public/scripts/*.js', function(){
    browserSync.reload();
  });

  watch('./app/styles/**/*.css', function(){
    gulp.start('cssInject');
  })

  watch('./app/public/edu/scripts/*.js', function(){
    browserSync.reload();
  });

  watch('./app/edustyle/**/*.css', function(){
    gulp.start('eduCssInject');
  })


})

gulp.task('cssInject', ['styles'], function(){
  return gulp.src('./app/public/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('eduCssInject', ['edustyles'], function(){
  return gulp.src('./app/public/edu/styles.css')
    .pipe(browserSync.stream());
});
