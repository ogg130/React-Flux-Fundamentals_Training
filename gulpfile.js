"use strict";

var gulp = require('gulp'); // Allows the use of gulp
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatenates files
var lint = require('gulp-eslint'); // Lint JS and JSX files

// Configuration json
var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
		],
		dist: './dist',
		mainJs: './src/main.js'
	}
}

// Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		liverload: true
	});
});

// Get index.html, and open it in the browser at localhost
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// Get any html files, put them in the destination path, reload the dev server
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload()); // Reload browser any time this task runs
});

// Task which transforms and bundles all js code in the src path recursively and reloads the browser
gulp.task('js', function() {
	browserify(config.paths.mainJs) // Use browserify, provide it a path to bundle JS from
		.transform(reactify) // Transform any JS into JSX using reactify
		.bundle() // Bundle all JS files into one file
		.on('error', console.error.bind(console)) // Output errors to the console
		.pipe(source('bundle.js')) // Define the bundle name
		.pipe(gulp.dest(config.paths.dist + '/scripts')) // Define bundle destination
		.pipe(connect.reload()); // Reload browser any time this task runs
});

// Look for css, concatenate into a bundle, drop into css folder
gulp.task('css', function() {
	gulp.src(config.paths.css) // Set the source path
		.pipe(concat('bundle.css')) //Pipe results into single bundle
		.pipe(gulp.dest(config.paths.dist + '/css')); //Set the bundles destination folder
});

// Migrates images to dist folder
gulp.task('images', function () {
    gulp.src(config.paths.images) // Set the source path
        .pipe(gulp.dest(config.paths.dist + '/images')) // Set the bundles destination folder
        .pipe(connect.reload()); // Reload browser any time this task runs

    //publish favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));

});



// Task which lints js bundle
gulp.task('lint', function() {
	return gulp.src(config.paths.js) // Set the source path
		.pipe(lint({config: 'eslint.config.json'})) //Pipe the js files to eslint referncing config file
		.pipe(lint.format()); //Output the results
});

// Everytime a change to html or js is made, make gulp reload the browser
gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html'])
	gulp.watch(config.paths.js, ['js', 'lint'])
});

// When you type gulp from a command line, run default tasks
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);
