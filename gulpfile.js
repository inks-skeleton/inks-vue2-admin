/**
 * author: 林欣
 * date: 2020.5.15
 * describe: iconfont 图标快速生成器
 * use: npm run dev:icon   [生成开发icon]
 *      npm run build:icon [生成正式icon]
 * document: https://github.com/qc-web-y/gulp-qc-iconfont
 */

const gulp = require('gulp')
const gulpQcIconFont = require('gulp-qc-iconfont')
const del = require('del')
const {iconfont} = require('./src/config/compile')

const isDev = (process.env.NODE_ENV || 'development') === 'development'
const output = 'src/assets/iconfont'
if (!iconfont) return console.error(`抱歉！不存在可编译的css文件，请先配置`)

gulp.task('clean:iconfont', done => del([`${output}/*`], done))

gulp.task('deal:iconfont', () => gulpQcIconFont({
  url: iconfont,
  keepIconFontStyle: true,
  isDev: isDev
}).pipe(gulp.dest(output)))

gulp.task('iconfont', gulp.series('clean:iconfont', 'deal:iconfont'))
