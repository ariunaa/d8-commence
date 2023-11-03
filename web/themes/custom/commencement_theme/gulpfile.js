var gulp            = require('gulp'),
    sass            = require('gulp-sass')(require('sass')),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    livereload      = require('gulp-livereload');
    //    server          = require('nodeserver.js');

// styles
///////////////////////////////////////////////////

var styles_src = 'scss/*.scss';
var styles_dest = 'css/';

// gulp-ruby-sass
gulp.task('styles', function() {
    return gulp.src(styles_src)
        .pipe( sourcemaps.init())
        .pipe(sass())
        .on('error', handleError)
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: './'}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer({overrideBrowserslist: ['last 2 version', 'iOS 6', 'ie >= 8'], cascade: false}))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: './'}))
        .pipe(gulp.dest(styles_dest));
        //.pipe(livereload.reload());
});


// default
///////////////////////////////////////////////////

gulp.task('default', function () {
    console.log("Running default");
    gulp.watch(['scss/*.scss'], ['styles']);
    //livereload.listen();
    //gulp.watch(['css/*.css']).on('change', livereload.changed);
    //'resources/js/controllers/*.js']
});


// server
///////////////////////////////////////////////////

gulp.task('server', function () {
    server.start();
});

// dev
///////////////////////////////////////////////////

gulp.task('dev', function () {
    console.log("Running dev");
    gulp.watch('scss/*.scss', ['styles']);
    livereload.listen();
    gulp.watch('css/*.css').on('change', () => livereload.reload());
});



// errors
///////////////////////////////////////////////////

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

// Updating prefixes database
// $ npm update caniuse-db
