<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <!-- 表间 -->
      <!-- :model绑定data里面的数据对象，而v-model则是vue里面的双向绑定，所以我推测：model应该是element-ui里面的属性 -->
      <!-- el-form、el-form-item都是一个组件，而这些组件都 在路由组件这个匿名组件之下 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 在这里也就是login组件对
        象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件
        这里可以通过loginFormRef来调用 表单元素对象 -->
        <!-- 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，
        表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker -->
        <!-- 用户名 -->
        <!-- 这个验证规则prop是加给item的，不是加给input的 -->
        <el-form-item prop="username">
          <!-- 输入框 -->
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginFormRules: {
        //注意这个检验规则也是在data里的
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入活动密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
      //重置表单只是恢复到初始状态而已，不是清空
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        //这里因为是promise,所以async，await，不懂
        //这里返回的valid参数是根据上面的loginFormRules规则来判断对错的
        if (!valid) return //如果错误，则返回，不发生请求
        const { data: res } = await this.$http.post('login', this.loginForm) //发起请求，地址是login，数据是loginForm
        //返回值是一个pormise。因为只需要里面的data属性，所以把对象里面的data重新解构成res
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功！')
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage会话存储空间 中
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        //为了与 HTML5 History API 保持一致性，router.go 已经被用来作为后退/前进导航，router.push 用来导向特殊页面。
        this.$router.push('/home')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  // 使元素位于页面中间，记住这种方法
  //因为是less，所以可以进行语法嵌套
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  //弹性模型
  display: flex;
  //设置主轴上的排列方式为从尾部开始排列
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  //  CSS3盒子模型
  //  box-sizing: border-box;
  //  传统盒子模型
  //  box-sizing: content-box;
  //  传统模式宽度计算：盒子的宽度 = CSS中设置的width + border + padding
  // CSS3盒子模型： 盒子的宽度 = CSS中设置的宽度width 里面包含了 border 和 padding,这样就不会撑大盒子了
}
</style>