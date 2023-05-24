const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev2');
const { default: terser } = require('gulp-terser');
const fs = require('fs');

gulp.task('css', function(done) {
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('./assets/css'))

    gulp.src('./assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'))
       
    done();
});

gulp.task('js', function(done) {
    console.log('minifying js...');
    gulp.src('./assets/**/*.js')
        .pipe(terser())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true,
            base: './public/assets'
        }))
        .pipe(gulp.dest('./public/assets'))
    done();
});

gulp.task('images', async function(done) {
    console.log('compressing images...');
    const imagemin = await import('gulp-imagemin');
    
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(imagemin.default())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true,
            base: './public/assets'
        }))
        .pipe(gulp.dest('./public/assets'))
        .on('end', done);
});

// Empty the Public asset directory
gulp.task('clean:assets', function(done) {
    fs.rm('./public/assets', { recursive: true, force: true }, (error) => {
        if (error) {
            console.error('Error deleting assets directory:', error);
        }
        done();
    });
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images', function(done) {
    console.log('Building assets');
    done();
}));

