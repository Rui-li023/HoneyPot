<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref, unref, reactive, watch } from 'vue'
import { BaseButton } from '@/components/Button'
import { getImageApi } from '@/api/environment'
import { useTable } from '@/hooks/web/useTable'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import Detail from './components/Detail.vue'
import { Dialog } from '@/components/Dialog'
import { ElTree } from 'element-plus'
import { ImageItem } from '@/api/environment/types'
const { t } = useI18n()

// 获取数据
const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    const res = await getImageApi({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.data.list || [],
      total: res.data.total || 0
    }
  }
})

const AddAction = () => {
  dialogTitle.value = t('exampleDemo.add')
  currentRow.value = undefined
  dialogVisible.value = true
  actionType.value = ''
}
const delLoading = ref(false)
const ids = ref<string[]>([])

const { total, loading, dataList, pageSize, currentPage } = tableState
const { getElTableExpose, delList } = tableMethods

const delData = async (row?: ImageItem) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row ? [row.id] : elTableExpose?.getSelectionRows().map((v: ImageItem) => v.id) || []
  delLoading.value = true

  await delList(unref(ids).length).finally(() => {
    delLoading.value = false
  })
}

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'selection',
    search: {
      hidden: true
    },
    form: {
      hidden: true
    },
    detail: {
      hidden: true
    },
    table: {
      type: 'selection'
    }
  },
  {
    field: 'id',
    label: '镜像ID',
    search: {
      hidden: true
    }
  },
  {
    field: 'name',
    label: '镜像名称'
  },
  {
    field: 'size',
    label: '镜像大小',
    search: {
      hidden: true
    }
  },
  {
    field: 'createTime',
    label: '创建时间',
    sortable: true,
    search: {
      hidden: true
    },
    table: {
      width: 300
    }
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    table: {
      width: 200,
      slots: {
        default: (data: any) => {
          const row = data.row as ImageItem
          return (
            <>
              <BaseButton type="success" onClick={() => action(row, 'detail')}>
                {t('exampleDemo.detail')}
              </BaseButton>
              <BaseButton type="danger" onClick={() => delData(row)}>
                {t('exampleDemo.del')}
              </BaseButton>
            </>
          )
        }
      }
    },
    search: {
      hidden: true
    },
    detail: {
      hidden: true
    }
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)

const searchParams = ref({})
// const setSearchParams = (params: any) => {
//   currentPage.value = 1
//   searchParams.value = params
//   getList()
// }
const treeEl = ref<typeof ElTree>()

const currentDepartment = ref('')
watch(
  () => currentDepartment.value,
  (val) => {
    unref(treeEl)!.filter(val)
  }
)

const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref<ImageItem>()
const actionType = ref('')

// const delLoading = ref(false)
// const ids = ref<string[]>([])

// const delData = async (row?: ScanLogItem) => {
//   const elTableExpose = await getElTableExpose()
//   ids.value = row ? [row.id] : elTableExpose?.getSelectionRows().map((v: ScanLogItem) => v.id) || []
//   delLoading.value = true

//   await delList(unref(ids).length).finally(() => {
//     delLoading.value = false
//   })
// }

const action = (row: ImageItem, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  currentRow.value = { ...row }
  dialogVisible.value = true
}
</script>

<template>
  <div class="flex w-100% h-100%">
    <ContentWrap class="flex-[3] ml-10px" title="镜像管理">
      <!-- <Search
        :schema="allSchemas.searchSchema"
        @reset="setSearchParams"
        @search="setSearchParams"
      /> -->
      <div class="mb-10px">
        <BaseButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</BaseButton>
        <BaseButton :loading="delLoading" type="danger" @click="delData()">
          {{ t('exampleDemo.del') }}
        </BaseButton>
      </div>

      <Table
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :columns="allSchemas.tableColumns"
        :data="dataList"
        :loading="loading"
        @register="tableRegister"
        :pagination="{
          total
        }"
      />
    </ContentWrap>

    <Dialog v-model="dialogVisible" :title="dialogTitle">
      <Detail
        v-if="actionType === 'detail'"
        :detail-schema="allSchemas.detailSchema"
        :current-row="currentRow"
      />
    </Dialog>
  </div>
</template>
