<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table } from '@/components/Table'
import { ref, unref, reactive, watch } from 'vue'
import { BaseButton } from '@/components/Button'
import { getScanLogListApi } from '@/api/scanlog'
import { useTable } from '@/hooks/web/useTable'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import type { ScanLogItem } from '@/api/scanlog/types'
import Detail from './components/Detail.vue'
import { Dialog } from '@/components/Dialog'
import { ElTree } from 'element-plus'
import { Search } from '@/components/Search'

const { t } = useI18n()

// 获取数据
const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const { pageSize, currentPage } = tableState
    const res = await getScanLogListApi({
      id: unref(currentNodeKey),
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

const { total, loading, dataList, pageSize, currentPage } = tableState
const { getList } = tableMethods

const crudSchemas = reactive<CrudSchema[]>([
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
    field: 'source_ip',
    label: '来源IP',
    search: {
      hidden: true
    }
  },
  {
    field: 'source_port',
    label: '来源端口',
    search: {
      hidden: true
    }
  },
  {
    field: 'dest_ip',
    label: '目的IP',
    search: {
      hidden: true
    }
  },
  {
    field: 'dest_port',
    label: '目的端口',
    search: {
      hidden: true
    }
  },
  {
    field: 'protocol',
    label: '传输协议',
    search: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: 'TCP',
            value: 'TCP'
          },
          {
            label: 'UDP',
            value: 'UDP'
          },
          {
            label: 'ICMPv4',
            value: 'ICMPv4'
          },
          {
            label: 'ICMPv6',
            value: 'ICMPv6'
          }
        ]
      }
    }
  },
  {
    field: 'type',
    label: '蜜罐种类'
  },
  {
    field: 'display_time',
    label: '扫描时间',
    sortable: true,
    search: {
      hidden: true
    }
  },
  {
    field: 'action',
    label: t('tableDemo.action'),
    table: {
      width: 100,
      slots: {
        default: (data: any) => {
          const row = data.row as ScanLogItem
          return (
            <>
              <BaseButton type="success" onClick={() => action(row, 'detail')}>
                {t('exampleDemo.detail')}
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
const treeEl = ref<typeof ElTree>()

const currentNodeKey = ref('')

const currentDepartment = ref('')
watch(
  () => currentDepartment.value,
  (val) => {
    unref(treeEl)!.filter(val)
  }
)

const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref<ScanLogItem>()
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

const action = (row: ScanLogItem, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  currentRow.value = { ...row }
  dialogVisible.value = true
}
</script>

<template>
  <div class="flex w-100% h-100%">
    <ContentWrap class="flex-[3] ml-10px" title="扫描感知">
      <Search
        :schema="allSchemas.searchSchema"
        @reset="setSearchParams"
        @search="setSearchParams"
      />

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
