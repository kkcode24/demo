// 引入gulp
var gulp = require('gulp');

//==========引入组件=======start===========//
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref'); // 合并文件
var uglify = require('gulp-uglify'); // js压缩
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css'); // css压缩
var imagemin = require('gulp-imagemin'); // 图片压缩
var cache = require('gulp-cache');
var del = require('del'); // 删除旧文件
var runSequence = require('run-sequence'); // 按照顺序执行任务
//==========引入组件======end==================//


/*=====================Development Tasks======================= */
// Start browserSync server
gulp.task('browserSync',function(){
	browserSync({
		server: {baseDir: 'app'}
	})
});

gulp.task('sass',function(){
	return gulp.src('app/scss/**/*.scss')
		   .pipe(sass())
		   .pipe(gulp.dest('app/css'))
		   // 自动刷新浏览器
		   .pipe(browserSync.reload({
		   	stream: true
		   }))
});

// Watchers
gulp.task('watch',['browserSync','sass'],function(){
	gulp.watch('app/scss/**/*.scss',['sass']);
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/*.html',browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);
});
/*=====================Development Tasks======================= */

/*>>>>>>>>>>>>>>>开发过程和发布过程任务分割线<<<<<<<<<<<<<<<<<<<<<*/

/*=====================Optimization Tasks ======================= */

// Optimizing CSS and JavaScrip
gulp.task('html', function(){
  return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('css', function(){
  return gulp.src('app/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function(){
  return gulp.src('app/js/*.js')
        .pipe( uglify() )
        .pipe(gulp.dest('dist/js'))
});

// Optimizing Images 
gulp.task('images', function(){
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
  })))
  .pipe(gulp.dest('dist/img'))
});

// Copying mp3
gulp.task('mp3', function() {
  return gulp.src('app/mp3/**/*')
    .pipe(gulp.dest('dist/mp3'))
})

// 在某些时候我们还是需要清除图片，所以clean任务我们还需要保留。
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

// 这个任务会删除，除了img/文件夹，dist下的任意文件。
gulp.task('clean:dist', function(){
  return del(['dist/**/*', '!dist/img', '!dist/img/**/*']);
});

/*=====================Optimization Tasks ======================= */


// 默认任务是开发过程，编译Sass，监听文件，刷新浏览器。
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],callback);
})

// 发布构建任务，优化CSS,JavaScript,压缩图片，并把资源从app移动到dist。
gulp.task('build', function (callback) {
  runSequence('clean:dist',['sass', 'html', 'css','js','images'],callback);
})
