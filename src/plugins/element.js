import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//message要进行全局挂载$message是一个自定义属性，名字不作要求。这样所以组件都可以通过this来访问message
Vue.prototype.$message = Message