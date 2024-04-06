<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref, unref, reactive, watch } from 'vue'
import { BaseButton } from '@/components/Button'
import { getContainerApi } from '@/api/environment'
import { useTable } from '@/hooks/web/useTable'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import Detail from './components/Detail.vue'
import { Dialog } from '@/components/Dialog'
import { ElTree } from 'element-plus'
// import { Search } from '@/components/Search'
// import { DateTimePickerComponentProps } from '@/components/Form'
import type { ContainerItem } from '@/api/environment/types'
const { t } = useI18n()

// 获取数据
const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    const res = await getContainerApi({
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

const delData = async (row?: ContainerItem) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row
    ? [row.id]
    : elTableExpose?.getSelectionRows().map((v: ContainerItem) => v.id) || []
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
    label: '容器ID',
    search: {
      hidden: true
    }
  },
  {
    field: 'startTime',
    label: '启动时间'
  },
  {
    field: 'name',
    label: '容器名称'
  },
  {
    field: 'cmd',
    label: '启动命令',
    search: {
      hidden: true
    }
  },
  {
    field: 'displayTime',
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
          const row = data.row as ContainerItem
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

const currentRow = ref<ContainerItem>()
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

const action = (row: ContainerItem, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  currentRow.value = { ...row }
  dialogVisible.value = true
}
</script>

<template>
  <div class="flex w-100% h-100%">
    <ContentWrap class="flex-[3] ml-10px" title="容器管理">
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
