/**
 * @author Bilal Cinarli
 */

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

var tasks = {
    lint: function() {
        return gulp.src('src/**/*.js')
            .pipe(plugins.jshint())
            .on('error', plugins.notify.onError('Error: <%= error.message %>'))
            .pipe(plugins.jshint.reporter('default', {
                fail: true
            }))
            .pipe(plugins.notify({message: 'Lint tasks completed', onLast: true}));
    },

    merge: function() {
        return gulp.src('src/**/*.js')
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('uxrocket.factory.js'))
            .on('error', plugins.notify.onError('Error: <%= error.message %>'))
            .pipe(plugins.sourcemaps.write('./', {includeContent: false, sourceRoot: '../src'}))
            .pipe(plugins.notify({message: 'Merge tasks completed', onLast: true}))
            .pipe(gulp.dest('dist'));
    },

    uglify: function() {
        return gulp.src('dist/uxrocket.factory.js')
            .pipe(plugins.rename('uxrocket.factory.min.js'))
            .pipe(plugins.uglify()).on('error', plugins.notify.onError('Error: <%= error.message %>'))
            .pipe(plugins.notify({message: 'Uglify tasks completed', onLast: true}))
            .pipe(gulp.dest('dist'));
    }
};

gulp.task('lint', tasks.lint);
gulp.task('merge', ['lint'], function() {
    return tasks.merge();
});
gulp.task('uglify', ['merge'], function() {
    return tasks.uglify();
});
gulp.task('default', ['uglify'], function() {
    gulp.watch('src/**/*.js', ['uglify']);
});