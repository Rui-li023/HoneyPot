<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { ref, unref, reactive, watch } from 'vue'
import { BaseButton } from '@/components/Button'
import { getScanLogListApi } from '@/api/scanlog'
import { useTable } from '@/hooks/web/useTable'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import type { ScanLogItem } from '@/api/scanlog/types'
import Detail from './components/Detail.vue'
import { Dialog } from '@/components/Dialog'
import { ElTag, ElTree } from 'element-plus'
import { Search } from '@/components/Search'
import { DateTimePickerComponentProps } from '@/components/Form'
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

const dateTimePickerComponentProps: DateTimePickerComponentProps = {
  type: 'daterange',
  valueFormat: 'yyyy-MM-dd',
  defaultValue: [new Date(), new Date()],
  rangeSeparator: '至',
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期'
}

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
    label: '来源IP'
  },
  {
    field: 'source_port',
    label: '来源端口'
  },
  {
    field: 'dest_ip',
    label: '目的IP'
  },
  {
    field: 'dest_port',
    label: '目的端口'
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
    label: '日志时间',
    sortable: true,
    search: {
      component: 'DatePicker',
      componentProps: dateTimePickerComponentProps
    },
    table: {
      width: 200
    }
  },
  {
    field: 'importance',
    label: '告警等级',
    table: {
      formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
        return (
          <ElTag type={cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'}>
            {cellValue === 1
              ? t('tableDemo.important')
              : cellValue === 2
                ? t('tableDemo.good')
                : t('tableDemo.commonly')}
          </ElTag>
        )
      }
    },
    search: {
      component: 'Select',
      componentProps: {
        options: [
          {
            label: '一级',
            value: '0'
          },
          {
            label: '二级',
            value: '1'
          },
          {
            label: '三级',
            value: '2'
          }
        ]
      }
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
    <ContentWrap class="flex-[3] ml-10px" title="常规日志">
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
