<template>
  <section class="mb-5 bg-theme-feature-background xl:rounded-lg flex flex-col md:flex-row items-center px-5 sm:px-10 py-8">
    <div class="flex items-center flex-auto w-full md:w-auto mb-5 md:mb-0 truncate md:mr-10">
      <img
        class="mr-6"
        src="@/assets/images/icons/circle.svg"
      >
      <div class="flex-auto min-w-0">
        <div class="text-grey mb-2">
          {{ $t("TokenId") }}
        </div>
        <div class="flex">
          <div class="text-xl text-white semibold truncate">
            <span class="mr-2">{{ token.tokenIdHex }}</span>
          </div>
          <Clipboard
            v-if="token.tokenIdHex"
            :value="token.tokenIdHex"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'TokenIdentity',

  props: {
    token: {
      type: Object,
      required: true
    }
  }

/*
  computed: {
    ...mapGetters('network', ['height']),

  }
*/
}
</script>

<style>
@media (min-width: 768px) {
  .inline-button {
    display: inline-block;
  }
}
</style>
