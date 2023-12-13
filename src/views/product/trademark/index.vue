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
          <template #default>
            <el-button size="mini" type="primary" :icon="Edit"></el-button>
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

    <el-dialog v-model="dialogVisible" title="添加品牌" width="30%">
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" label-width="80px">
          <el-input placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
import { onMounted, ref } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import { Records, TradeMarkResponseData } from '@/api/product/trademark/type.ts'

// 弹窗
const dialogVisible = ref(false)
// 触发新增编辑
const addTrademark = () => {
  console.log(123)
  dialogVisible.value = true
}

// 对话框取消
const cancel = () => {}

// 对话框确认
const confirm = () => {}

// 分页
// 当前页
const pageNo = ref(1)
// 当前页数量
const limit = ref(10)
const small = ref(false)
const total = ref(0)

const trademarkArr = ref<Records>([])

// 获取表单信息
const getHasTrademark = async () => {
  const result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  trademarkArr.value = result.data.records
  total.value = result.data.total
  pageNo.value = result.data.current
  limit.value = result.data.size
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
