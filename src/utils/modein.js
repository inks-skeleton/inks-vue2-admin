
/**
 * 文件模块批量快速导入
 * @param {Object} files 导入文件对象
 * @param {RegExp, String} reg 可选，自定义过滤正则或默认提供正则名，用于根据文件名进行正则过滤后生成模块名，默认'underlineHead'
 *  => reg {RegExp} 自定义过滤正则
 *  => reg {String} 默认提供正则名,可选['underlineHead'文件名格式为'_XXX.js'],['letterHead'文件名格式为'XXX.js']
 * @param {String} mode 可选，导入模式，默认'object'
 *  => 'object' 将模块名作为对象名，模块内容作为对象值，分离式成对导入
 *  => 'array' 将所有模块导入为一个数组
 *  => 'single' 将所有模块导入合并为一个对象
 *
*/
function moduleIn (files, mode, reg) {
  if (!files) return
  mode = mode || 'object'
  const dJsReg = {
    underlineHead: /(_|^\.\/|\.js$)/g,
    letterHead: /(^\.\/|\.js$)/g
  }
  reg = dJsReg[reg] || reg || dJsReg.underlineHead

  var modules = mode === 'array' ? [] : {}
  var objModules = {}

  files.keys().forEach(key => {
    var mk = key.replace(reg, '')
    var m = files(key)

    objModules[mk] = Object.keys(m).reduce((s, e) => {
      if (e !== 'default') s[e] = m[e]
      if (mode === 'array') modules = modules.concat(s)
      return s
    }, m.default || {})

    if (mode === 'single') modules = Object.assign({}, modules, objModules[mk])
  })

  if (mode === 'object') {
    modules = objModules
  } else {
    objModules = null
  }

  return modules
}

export default moduleIn
