const request = (path, method = 'GET', data = {}, header = {}) => {
  let url = `https://www.zhengzhicheng.cn/api/public/v1/${path}`
  let p = new Promise(function (resolve, reject) {
    mpvue.request({
      url,
      method,
      data,
      header,
      success: function (res) {
        //   console.log(res)
        // callback(res)
        resolve(res)
      }
    })
  })
  return p
}

export default request
