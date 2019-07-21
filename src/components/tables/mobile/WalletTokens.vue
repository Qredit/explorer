<template>
  <div>
    <Loader :data="tokens">
      <div
        v-for="token in tokens"
        :key="token.tokenIdHex"
        class="row-mobile"
      >

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("Token Name") }}
          </div>
          <div>{{ token.name }}</div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("Token Symbol") }}
          </div>
          <div>{{ token.symbol }}</div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("Token ID") }}
          </div>
          <div>{{ token.tokenIdHex }}</div>
        </div>

        <div class="list-row">
          <div class="mr-4">
            {{ $t("Token Balance") }}
          </div>
          <div>{{ readableCryptoAlt(token.tokenBalance, false, row.tokenDecimals) }}</div>
        </div>
      </div>
      <div
        v-if="tokens && !tokens.length"
        class="px-5 md:px-10"
      >
        <span>{{ $t("No results") }}</span>
      </div>
    </Loader>
  </div>
</template>


<script type="text/ecmascript-6">

export default {
  name: 'TableWalletTokensMobile',

  props: {
    tokens: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    },

  }

}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>