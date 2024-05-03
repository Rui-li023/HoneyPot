<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref, unref, reactive } from 'vue'
import { BaseButton } from '@/components/Button'
import { getNodeApi } from '@/api/environment'
import { useTable } from '@/hooks/web/useTable'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import type { NodeItem } from '@/api/environment/types'
import Detail from './components/Detail.vue'
import { Dialog } from '@/components/Dialog'
import { Search } from '@/components/Search'
// import { setStyle } from '../../../utils/domUtils'
const { t } = useI18n()

// 获取数据
const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    const res = await getNodeApi({
      pageIndex: unref(currentPage),
      pageSize: unref(pageSize),
      ...unref(searchParams)
    })
    return {
      list: res.list || [],
      total: res.total || 0
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
const { getList, getElTableExpose, delList } = tableMethods

const delData = async (row?: NodeItem) => {
  const elTableExpose = await getElTableExpose()
  ids.value = row ? [row.id] : elTableExpose?.getSelectionRows().map((v: NodeItem) => v.id) || []
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
    label: 'ID',
    search: {
      hidden: true
    },
    table: {
      hidden: true
    }
  },
  {
    field: 'name',
    label: '主机名字'
  },
  {
    field: 'ip',
    label: 'IP地址'
  },
  {
    field: 'online',
    label: '是否在线',
    detail: {
      slots: {
        default: (data: any) => {
          const row = data as NodeItem
          console.log(data)
          return row.online ? <>是</> : <>否</>
        }
      }
    },
    search: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '在线',
            value: 1
          },
          {
            label: '离线',
            value: 0
          }
        ]
      }
    },
    table: {
      showOverflowTooltip: false,
      align: 'center',
      headerAlign: 'center',
      slots: {
        default: (data: any) => {
          const row = data.row as NodeItem
          return row.online ? (
            <>
              <div class="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                  />
                </svg>
              </div>
            </>
          ) : (
            <>
              <div class="text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                  />
                </svg>
              </div>
            </>
          )
        }
      }
    }
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    table: {
      width: 200,
      slots: {
        default: (data: any) => {
          const row = data.row as NodeItem
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
const setSearchParams = (params: any) => {
  currentPage.value = 1
  searchParams.value = params
  getList()
}
// const treeEl = ref<typeof ElTree>()

const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref<NodeItem>()
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

const action = (row: NodeItem, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  currentRow.value = { ...row }
  dialogVisible.value = true
}
</script>

<template>
  <div class="flex w-100% h-100%">
    <ContentWrap class="flex-[3] ml-10px" title="节点管理">
      <Search
        :schema="allSchemas.searchSchema"
        @reset="setSearchParams"
        @search="setSearchParams"
      />

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
