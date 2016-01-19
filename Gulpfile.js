var gulp = require('gulp'),
    bower = require('main-bower-files'),
    bowerNormalize = require('gulp-bower-normalize'),
    tsc = require('gulp-typescript'),
    concat = require('gulp-concat'),
    karma = require('karma'),
    runSequence = require('run-sequence'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps');

// This compiles the server typescript
gulp.task('server', function() {
    var tsResult = gulp.src('serverSrc/*.ts')
        .pipe(tsc({definitionFiles: false, module: 'commonjs', target: 'ES5'}));
    return tsResult.js.pipe(gulp.dest('.'));
});

// This copies files from bower_components into the public folder
gulp.task('bower', function() {
    return gulp.src(bower(), {base: './bower_components'})
        .pipe(bowerNormalize({flatten: true}))
        .pipe(gulp.dest('./public/vendor/'));
});

var sources = {
    typescript:["typings/**/*.d.ts", "src/**/*.ts"],
    html: ['src/**/*.html'],
    css: ['src/css/**/*.css'],
    test: ['public/**/*.js', 'test/**/*Spec.js']
};

// Compile the app
gulp.task('typescript', function() {
    return gulp.src(sources.typescript)
        .pipe(sourcemaps.init())
        .pipe(tsc({
            noExternalResolve: true,
            sortOutput: true,
            target: 'ES5'
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('public/js'));
});

// Copy html from the src to the public directory
gulp.task('html', function() {
    return gulp.src(sources.html)
        .pipe(gulp.dest('public'));
});

// Copy CSS from the src/css to the public/css directory
gulp.task('css', function() {
    return gulp.src(sources.css)
        .pipe(gulp.dest('public/css'));
});

// Run tests
gulp.task('test', function(done) {
    karma.server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function () {
        done();
    });
});

gulp.task('default', ['typescript', 'html', 'css']);

// Uses run-sequence to run default build tasks, then test
gulp.task('pre-watch', function(done) {
    runSequence(
        ['bower', 'default'],
        'test',
        done
    );
});

// Start watch
gulp.task('watch', ['pre-watch'], function()
{
    gulp.watch(sources.typescript, ['typescript']);
    gulp.watch(sources.html, ['html']);
    gulp.watch(sources.css, ['css']);
    gulp.watch(sources.test, ['test']);
});






