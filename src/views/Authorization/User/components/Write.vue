<script setup lang="ts">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch } from 'vue'
import { DepartmentUserItem } from '@/api/department/types'
import { useValidator } from '@/hooks/web/useValidator'

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<DepartmentUserItem>,
    default: () => undefined
  },
  formSchema: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  }
})
// 密码要求
function passwordRule(value, callback) {
  if (!value) {
    return callback(new Error('密码不能为空'))
  }
  // 检查密码是否同时包含字母和数字
  if (!/(?=.*[0-9])(?=.*[a-zA-Z])/.test(value)) {
    return callback(new Error('密码必须包含字母和数字'))
  }
  // 如果通过验证
  callback()
}

// 邮箱验证规则
function emailRule(value, callback) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  }
  if (!emailPattern.test(value)) {
    return callback(new Error('请输入有效的邮箱地址'))
  }
  callback()
}

const rules = reactive({
  username: [required()],
  account: [required()],
  password: [
    required(),
    { validator: passwordRule, message: '密码必须包含字母和数字', trigger: 'blur' }
  ],
  email: [required(), { validator: emailRule, message: '请输入有效的邮箱地址', trigger: 'blur' }]
})

const { formRegister, formMethods } = useForm()
const { setValues, getFormData, getElFormExpose } = formMethods

const submit = async () => {
  const elForm = await getElFormExpose()
  const valid = await elForm?.validate().catch((err) => {
    console.log(err)
  })
  if (valid) {
    const formData = await getFormData()
    return formData
  }
}

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    setValues(currentRow)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  submit
})
</script>

<template>
  <Form :rules="rules" @register="formRegister" :schema="formSchema" />
</template>
