<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules">
          <h1>hello</h1>
          <h2>欢迎来到运营平台</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time.ts'
import { reqUserInfo } from '@/api/user'
//
let loading = ref(false)

// 获取路由器
let $router = useRouter()
//获取表单元素
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
// 引入用户小仓库
let useStore = useUserStore()
let $route = useRoute()
// 自定义校验规则函数
const validateUsername = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  console.log('自定义校验name', value, callback)
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}

// 定义表单验证规则rules
const rules = {
  username: [
    {
      validator: validateUsername,
      // min: 5,
      // max: 16,
      // message: '用户名长度应为5-16位',
      trigger: 'change',
    },
  ],
  password: [
    {
      validator: validatePassword,
      trigger: 'change',
    },
  ],
}

const login = async () => {
  // 开始加载
  loading.value = true
  try {
    await useStore.userLogin(loginForm)

    // 判断登录的时候，路由路径当前是否右query参数，如果有就往query参数跳转，没有调转到首页
    let redirect: any = $route.query.redirect

    await $router.push(redirect || '/')

    // 登录成功提示信息
    ElNotification({
      title: `Hi!${getTime()}`,
      type: 'success',
      message: '登录成功',
    })
    loading.value = false
  } catch (errer) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (errer as Error).message,
    })
  }
  ;``
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
