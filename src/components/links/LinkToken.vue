<!-- BEGIN QREDEDIT -->
<template>
  <span>
    <RouterLink :to="{ name: 'token', params: { id } }" class="hidden md:inline-block">
      <span v-if="hasDefaultSlot">
        <slot />
      </span>
      <span v-else v-tooltip="id">{{ truncate(id, length) }}</span>
    </RouterLink>
    <RouterLink :to="{ name: 'token', params: { id } }" class="md:hidden">
      <span v-tooltip="id">{{ truncate(id) }}</span>
    </RouterLink>
  </span>
</template>

<script type="text/ecmascript-6">
export default {
  name: "LinkToken",

  props: {
    id: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: false,
      default: 13,
    },
  },

  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
  },
};
</script>
<!-- BEGIN QREDEDIT -->