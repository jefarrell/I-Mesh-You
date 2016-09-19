var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var glob = require('glob');

var path = {
	HTML: 'views/index.html',
	SASS: './public/styles/style.scss',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'bundle.js',
	DEST: 'dist',
	DEST_SRC: 'dist/src',
	DEST_BUILD: 'dist/build',
	ENTRY_POINT: './public/javascripts/src/app.jsx'
};

gulp.task('js', function() {
	var js_files = glob.sync('./public/javascripts/src/*.js');
	var file_arr = [js_files, path.ENTRY_POINT]

    browserify({entries: [file_arr] })
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
