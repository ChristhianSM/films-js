const {src, dest, watch} = require('gulp');

const sass = require('gulp-sass');

function css(){
    return src('./src/sass/app.scss')
        .pipe(sass())
        .pipe(dest('./build/css'));
}

function watchArchivos(){
    watch("./src/sass/**/*.scss", css)
}

exports.css = css;
exports.watchArchivos = watchArchivos;