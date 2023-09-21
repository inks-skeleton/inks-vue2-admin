/**
 * describe: 用户api
 * options:
 *  - url       请求路径（必须）
 *  - method    请求模式（必须）
 *  - loading   是否请求展示loading（默认：true）
 *  - tipMsg    是否展示错误信息（默认：true）
 *  - beforeReq 拦截请求参数进行处理（可选）
 *  - afterReq  拦截返回参数进行处理（可选）
 */
export default {
  login: {
    url: '{mock}/login',
    method: 'post',
    loading: false
  }
}
