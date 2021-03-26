import { Message } from 'element-ui'

class Total {
    // 失败提示
    error (code,title) {
       Message.error(title)
    }
    //系统一次提示
    fail (code) {
        Message.error('系统异常')
    }
}
const total = new Total();

export { total }