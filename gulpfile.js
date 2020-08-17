const { src, dest } = require('gulp');
const svgSprite = require("gulp-svg-sprites");

exports.default = function() {
  return src('src/assets/svg/*.svg')

  .pipe(svgSprite({
    common: 'Character',
    selector: 'Character__%f'
  }))
  .pipe(dest('src/assets'));
};