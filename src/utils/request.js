const axios = require('axios');

const request = axios.create({
  baseURL: 'https://so.csdn.net/'
});
// axios响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.data) {
      return { status: error.status, ...error.response.data };
    }
    return {
      data: null,
      message: '代理线上请求出现异常: ' + error.message,
      success: false,
      code: 10006
    };
  }
);

module.exports = request;
