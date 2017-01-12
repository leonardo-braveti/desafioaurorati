let gulp = require('gulp');
let browserSync = require('browser-sync');


gulp.task('server',() => {
    browserSync.init({
        server:{
            baseDir:'src',
            routes:{
                '/bower_components':'bower_components'
            }
        }
    });

    gulp.watch('src/*/**').on('change',() => browserSync.reload())
})

gulp.task('validate-html',() => {
    
})