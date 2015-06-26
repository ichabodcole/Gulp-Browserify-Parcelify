var path          = require('path')
    , del         = require('del')
    , gulp        = require('gulp')
    , browserify  = require('browserify')
    , watchify    = require('watchify')
    , babelify    = require('babelify')
    , browserSync = require('browser-sync')
    , gutil       = require('gulp-util')
    , stylish     = require('jshint-stylish')
    , sequence    = require('run-sequence')
    , source      = require('vinyl-source-stream')
    , buffer      = require('vinyl-buffer')
    , parcelify   = require('parcelify')
    , sassCssStream = require('sass-css-stream')
    , reload      = browserSync.reload;

var $ = require('gulp-load-plugins')({
    rename: {
        'gulp-minify-css': 'cssmin',
        'gulp-scss-lint': 'scsslint'
    }
});

var libs = [
    { require: 'react' }
]

, paths = {
    build: '.tmp',
    html: {
        entry: './src/index.html',
        dest: '.tmp/'
    },
    sass: {
        entry: './src/sass/main.scss',
        src: ['./src/sass/**/*.scss', './src/app/**/*.scss'],
        dest: '.tmp/css/'
    },
    js: {
        entry: './src/index.js',
        src: 'src/app/**/*.js',
        dest: '.tmp/js'
    }
};

/*************************************
  *      Main Gulp Tasks
**************************************/

gulp.task('default', function(done) {
    sequence('clean', ['copy', 'sass', 'scripts', 'watch'], done);
});

gulp.task('serve', ['default'], bSync);


/*************************************
  *  Bundle the Vendor and App Files
**************************************/

gulp.task('scripts', function(done) {
    sequence('bundleVendor', 'bundle', done);
});


/*************************************
  *       Lint the js files
**************************************/

gulp.task('jshint', jshint);

function jshint() {
    return gulp.src(paths.js.src)
        .pipe($.cached('linting'))
        .pipe($.jshint())
        .on('error', handleError)
        .pipe($.jshint.reporter(stylish));
}


/*************************************
  *        Bundle App Files
**************************************/

gulp.task('bundle', ['jshint'], initBundler);

function initBundler() {
    var b, w, p;

    b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true,
        entries: paths.js.entry,
        transform: [babelify],
        debug: false,
        extensions: ['.js', '.es6'],
        noparse: libs.map(function(lib, index) {
            return (lib.expose || lib.require);
        })
    });

    w = watchify(b)
        .on('error', handleError)
        .on('update', function() { bundleApp(b); })
        .on('log', gutil.log);

    p = parcelify(b, {
            watch: true,
            bundles: {
                style: path.join(__dirname, '.tmp/css/app.css')
            }
        })
        .on('done', function() {
            console.log('parcelify done'); })

        .on('error', function(err) {
            console.log('parcelify error', err);
            this.emit('end');
        })

        .on('packageCreated', function(package, isMain) {
            // console.log('parcelify package created', package, isMain);
         })

        .on('assetUpdated', function(eventType, asset) {
            // inject the css without reloading the page.
            gulp.src('.tmp/css/app.css')
                .pipe($.plumber())
                .pipe(reload({stream: true}));

            console.log('parcelify assetUpdated', eventType, asset); });

    libs.forEach(function(lib, index) {
        b.external(lib.expose || lib.require);
    });

    bundleApp(b);
}

function bundleApp(bundler) {
    return bundler
        .bundle()
        .on('error', handleError)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.sourcemaps.write('./')) // write .map file
        .pipe(gulp.dest(paths.js.dest))
        .pipe(reload({stream: true, once: true}));
}


/*************************************
  *   Bundle Vendor Library Files
**************************************/

gulp.task('bundleVendor', bundleVendor);

function bundleVendor(done) {
    var bundler = browserify({
        entries: './vendor.js',
        debug: false
    });

    bundler.add('./node_modules/babelify/polyfill.js');

    libs.forEach(function (lib, index) {
        if (lib.expose) {
            bundler.require(lib.require, { expose: lib.expose });
        } else {
            bundler.require(lib.require);
        }
    });

    bundler
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(gulp.dest(paths.js.dest))
        .on('end', done);
}


/*************************************
  *         Sass linting
**************************************/

gulp.task('sassLint', sassLint);

function sassLint() {
    return gulp.src(paths.sass.src[1])
        .pipe($.scsslint({
            config: 'lint.yml'
        }));
}


/*************************************
  *       Compile the sass
**************************************/

gulp.task('sass', ['sassLint'], sass);

function sass() {
    return gulp.src(paths.sass.entry)
        .pipe($.sass({
            includePaths: [],
            errLogToConsole: true
        }))
        .pipe($.autoprefixer())
        .pipe($.rename({
            basename: 'style'
        }))
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(reload({ stream: true }))
        .pipe($.cssmin({
            keepSpecialComments: true
        }))
        .pipe($.rename({
            extname: '.min.scss'
        }))
        .pipe(gulp.dest(paths.sass.dest));
}


/*************************************
  *      Clean out build folder
**************************************/

gulp.task('clean', clean);

function clean(done) {
    del([
        path.join(paths.build, '/**/*')
    ], done);
}


/*************************************
  *      Copy static files
**************************************/

gulp.task('copy', copy);

function copy() {
    return gulp.src(paths.html.entry)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(reload({stream: true}));
}


/*************************************
  *      BrowserSync Server
**************************************/

gulp.task('bSync', bSync);

function bSync() {
    browserSync({
        port: 9000,
        server: {
            baseDir: [
                path.join(__dirname, paths.build)
            ]
        },
        ghostMode: false
    });
}


/*************************************
  *     Watch files for changes
**************************************/

gulp.task('watch', watch);

function watch() {
    gulp.watch(paths.html.entry, ['copy']);
    gulp.watch(paths.sass.src, ['sass']);
    gulp.watch(['.tmp/**/*.css'], reload);
}


/*************************************
  *       Helper functions
**************************************/

function handleError(err) {
    console.error(err.toString());
    process.stdout.write('\x07');
    this.emit('end');
}
