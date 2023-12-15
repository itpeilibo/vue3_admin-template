<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" :icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
      <el-table
        :data="trademarkArr"
        style="margin: 10px 0"
        border
        max-height="700px"
      >
        <el-table-column label="序号" type="index" />
        <el-table-column prop="tmName" label="品牌名称">
          <template #="{ row }">
            <span>{{ row.tmName || '/' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="logoUrl" label="品牌LOGO">
          <template #="{ row }">
            <img :src="row.logoUrl" style="width: 50px; height: 50px" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="品牌操作">
          <template #="{ row }">
            <el-button
              size="mini"
              type="primary"
              :icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-button size="mini" type="danger" :icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="sizeChange"
        @current-change="changePageNo"
      />
    </el-card>

    <!-- 对话框组件:在添加品牌与修改已有品牌的业务时候使用结构 -->
    <!--
        v-model:属性用户控制对话框的显示与隐藏的 true显示 false隐藏
         title:设置对话框左上角标题
    -->

    <el-dialog
      v-model="dialogVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
      width="30%"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="品牌名称" label-width="80px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="https://adminlearn.reiko.fun/prod_api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  reqAddOrUpdateTrademark,
  reqHasTrademark,
} from '@/api/product/trademark'
import { Records, TradeMarkResponseData } from '@/api/product/trademark/type.ts'
import { ElMessage, FormInstance, UploadProps } from 'element-plus'

//品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    // 校验未通过返回的错误的提示信息
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}

//品牌LOGO图片的自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  //如果图片上传
  if (value) {
    callBack()
  } else {
    callBack(new Error('LOGO图片务必上传'))
  }
}

//表单校验规则对象
const rules = {
  tmName: [
    //required:这个字段务必校验,表单项前面出来五角星
    //trigger:代表触发校验规则时机[blur、change]
    { required: true, trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [{ required: true, trigger: 'blur', validator: validatorLogoUrl }],
}

// 弹窗
const dialogVisible = ref(false)

// 触发新增编辑
const addTrademark = () => {
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  dialogVisible.value = true

  //第一种写法:ts的问号语法
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')

  //第二种写法:ts的问号语法
  // nextTick(() => {
  //   formRef.value.clearValidate('tmName')
  //   formRef.value.clearValidate('logoUrl')
  // })
}

let trademarkParams = reactive({
  id: 0,
  tmName: '',
  logoUrl: '',
})

// 对话框取消
const cancel = () => {
  dialogVisible.value = false
}

const formRef = ref<FormInstance>()
// 对话框确认
const confirm = async () => {
  await formRef.value?.validate()
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    // 关闭对话框
    dialogVisible.value = false
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    await getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    // 关闭对话框
    dialogVisible.value = false
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
  console.log(result)
}

// 分页
// 当前页
const pageNo = ref(1)
// 当前页数量
const limit = ref(10)
const small = ref(false)
const total = ref(0)

const trademarkArr = ref<Records>([])

// 获取表单信息
const getHasTrademark = async (pager = 1) => {
  // pageNo.value = pager

  const result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  trademarkArr.value = result.data.records
  total.value = result.data.total
  pageNo.value = result.data.current
  limit.value = result.data.size
}

//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}

// 图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  trademarkParams.logoUrl = response.data

  //图片上传成功,清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl')
}

//修改已有品牌的按钮的回调
//row:row即为当前已有的品牌
const updateTrademark = (row: any) => {
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  dialogVisible.value = true
  Object.assign(trademarkParams, row)
  // //修改品牌时需要id的
  // trademarkParams.id = row.id
  //
  // // 展示已有品牌数据
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
}

onMounted(() => {
  getHasTrademark()
})

//分页器页码发生变化时触发
const changePageNo = () => {
  getHasTrademark()
}

//当下拉菜单发生变化的时候触发次方法
//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  pageNo.value = 1
  getHasTrademark()
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
