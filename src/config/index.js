
// 公共配置文件
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'pro';
const config = {
  dev:{
    path:"",
    devRouter: 0,
    isOpenTest: false
  },
  pro:{
    path:"",
    devRouter: 1
  }
};

export default  {
  ...config[env]
}
