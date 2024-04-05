<script setup lang="ts">
import { PropType } from 'vue'
import { ScanLogItem } from '@/api/scanlog/types'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'

defineProps({
  currentRow: {
    type: Object as PropType<ScanLogItem>,
    default: () => undefined
  },
  detailSchema: {
    type: Array as PropType<DescriptionsSchema[]>,
    default: () => []
  }
})
</script>

<template>
  <Descriptions :schema="detailSchema" :data="currentRow || {}" />
</template>
