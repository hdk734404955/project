//自定义指令
export const imagerror = {
  //指令对象
  inserted(dom, options) {
    //options是指令中的变量的解释
    //dom表示当前指令作用的对象
    //当图片有地址，但是地址没有加载成功时会报错，触发事件
    dom.onerror = function () {
      // console.log('图片加载出错了');
      dom.src = options.value //图片异常时会配置默认图片
    }
  }
}
