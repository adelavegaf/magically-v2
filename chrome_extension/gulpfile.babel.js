import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';
import backgroundWebpackConfig from './background/webpack.config';

gulp.task('popup-js', ['clean'], (cb) => {
  webpack(popupWebpackConfig, (err, stats) => {
    if (err) {
      throw new plugins.util.PluginError('webpack', err);
    }

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('background-js', ['clean'], (cb) => {
  webpack(backgroundWebpackConfig, (err, stats) => {
    if (err) {
      throw new plugins.util.PluginError('webpack', err);
    }

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('popup-html', ['clean'], () => {
  return gulp.src('popup/src/index.html')
             .pipe(plugins.rename('popup.html'))
             .pipe(gulp.dest('./build'))
});

gulp.task('popup-css', ['clean'], () => {
  return gulp.src('popup/src/index.css')
             .pipe(plugins.rename('popup.css'))
             .pipe(gulp.dest('./build'))
});

gulp.task('background-html', ['clean'], () => {
  return gulp.src('background/src/index.html')
             .pipe(plugins.rename('background.html'))
             .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', ['clean'], () => {
  return gulp.src('manifest.json')
             .pipe(gulp.dest('./build'));
});

gulp.task('copy-icons', ['clean'], () => {
  return gulp.src('./icons/**/*')
             .pipe(gulp.dest('./build/icons'));
});


gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('build', ['copy-manifest', 'copy-icons', 'popup-js', 'popup-html', 'popup-css', 'background-js', 'background-html']);

gulp.task('watch', ['default'], () => {
  gulp.watch('popup/**/*', ['build']);
  gulp.watch('background/**/*', ['build']);
});

gulp.task('default', ['build']);