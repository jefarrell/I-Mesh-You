var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var sass = require('gulp-sass');

var path = {
	HTML: 'views/index.html',
	SASS: './public/sass/style.scss',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'bundle.js',
	DEST: 'dist',
	DEST_SRC: 'dist/src',
	DEST_BUILD: 'dist/build',
	ENTRY_POINT: './public/javascripts/src/app.jsx'
};

gulp.task('js', function(){
    browserify(path.ENTRY_POINT)
        .transform(babelify, {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('styles', function() {
    gulp.src(path.SASS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.DEST_SRC))
});

gulp.task('watch', function() {
	gulp.watch('public/javascripts/src/**/*.jsx', ['js']);
	gulp.watch(path.SASS,['styles']);
	console.log(" ~ Gulp updated ~ ");
})



gulp.task('default', ['js', 'styles', 'watch']);






// gulp.task('copy', function(){
//   gulp.src(path.HTML)
//     .pipe(gulp.dest(path.DEST));
// });

// gulp.task('watch', function() {
// 	gulp.watch([path.HTML, path.ENTRY_POINT],  ['copy']);

// 	var watcher = watchify(browserify({
// 		entries: [path.ENTRY_POINT],
// 		debug: true,
// 		cache: {}, packageCache: {}, fullPaths: true
// 	}).transform(babelify, {presets: ['es2015', 'react']}));

// 	return watcher.on('update', function() {
// 		watcher.bundle()
// 			.pipe(source(path.OUT))
// 			.pipe(gulp.dest(path.DEST_SRC))
// 			console.log(" ~ Gulp updated ~ ");
// 	})
// 	.bundle().on('error', function(err) {
// 		console.log(err.message);
// 	})
// 	.pipe(source(path.OUT))
// 	.pipe(gulp.dest(path.DEST_SRC));
// });

// gulp.task('default', ['watch'], function() {
// 	console.log(" ~~ Gulp completed ~~ ");
// });