import gulp from 'gulp';
import print from 'gulp-print';
import gulp_watch from 'gulp-watch';
import webpack_stream from 'webpack-stream';
import webpack from 'webpack';
import vinyl_named from 'vinyl-named';
import path from 'path';

gulp.task('production', function() {
  return gulp_watch('src/**/*.js', function() {
    gulp.src('src/**/*.js')
    .pipe(print())
    .pipe(vinyl_named())
    .pipe(webpack_stream(
      {
        module: {
          loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.json$/, loader: 'json-loader', exclude: /node_modules/ }
          ]
        },
        resolve: {
          modules: [ 'src', 'node_modules' ]
        }
      }, webpack)
    )
    .pipe(gulp.dest('public/js'));
  })
});

gulp.task('build', function() {
  return gulp.src('src/**/*.js')
    .pipe(print())
    .pipe(vinyl_named())
    .pipe(webpack_stream(
      {
        module: {
          loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.json$/, loader: 'json-loader', exclude: /node_modules/ }
          ]
        },
        resolve: {
          modules: [ 'src', 'node_modules' ]
        }
      }, webpack)
    )
    .pipe(gulp.dest('public/js'));
});
