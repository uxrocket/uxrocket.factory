/**
 * @author Bilal Cinarli
 */

var gulp = require('gulp'),
    pkg      = require('./package.json'),
    uxrocket = require('./uxrocket.json'),
    p        = require('gulp-load-plugins')();

var banner = [
    "/*! UX Rocket <%= uxrocket.name %> \n" +
    " *  <%= pkg.description %> \n" +
    " *  @author <%= pkg.author %> \n" +
    "<% pkg.contributors.forEach(function(contributor) { %>" +
    " *          <%= contributor.name %> <<%=contributor.email %>> (<%=contributor.url %>)\n" +
    "<% }) %>" +
    " *  @version <%= uxrocket.version %> \n" +
    " *  @build <%= date %> \n" +
    " */\n"
].join('');

var tasks = {
    lint: function() {
        return gulp.src('src/**/*.js')
            .pipe(p.jshint())
            .on('error', p.notify.onError('Error: <%= error.message %>'))
            .pipe(p.jshint.reporter('default', {
                fail: true
            }))
            .pipe(p.notify({message: 'Lint tasks completed', onLast: true}));
    },

    merge: function() {
        return gulp.src('src/**/*.js')
            .pipe(p.sourcemaps.init())
            .pipe(p.concat(uxrocket.registry + '.js'))
            .on('error', p.notify.onError('Error: <%= error.message %>'))
            .pipe(p.sourcemaps.write('./', {includeContent: false, sourceRoot: '../src'}))
            .pipe(p.notify({message: 'Merge tasks completed', onLast: true}))
            .pipe(gulp.dest('dist'));
    },

    uglify: function() {
        return gulp.src('dist/uxrocket.factory.js')
            .pipe(p.rename(uxrocket.registry + '.min.js'))
            .pipe(p.uglify()).on('error', p.notify.onError('Error: <%= error.message %>'))
			.pipe(p.header(banner, {pkg: pkg, uxrocket: uxrocket, date: new Date()}))
            .pipe(p.notify({message: 'Uglify tasks completed', onLast: true}))
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