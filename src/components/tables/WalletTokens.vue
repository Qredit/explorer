<template>
  <Loader :data="tokens">
    <table-component
      v-if="tokens && tokens.length > 0"
      :data="tokens"
      :show-filter="false"
      :show-caption="false"
      table-class="w-full"
    >
      <table-column
        show="tokenName"
        :label="$t('Token Name')"
        header-class="left-header-cell"
        cell-class="left-cell"
      >
        <template slot-scope="row">
          {{ row.name }}
        </template>
      </table-column>

      <table-column
        show="tokenSymbol"
        :label="$t('Token Symbol')"
        header-class="left-header-cell"
        cell-class="left-cell"
      >
        <template slot-scope="row">
          {{ row.symbol }}
        </template>
      </table-column>

      <table-column
        show="tokenIdHex"
        :label="$t('Token ID')"
        header-class="left-header-cell"
        cell-class="left-cell"
      >
        <template slot-scope="row">
          {{ row.tokenIdHex }}
        </template>
      </table-column>

      <table-column
        show="tokenBalance"
        :label="$t('Token Balance')"
        header-class="right-header-cell"
        cell-class="right-cell"
      >
        <template slot-scope="row">
          {{ readableCryptoAlt(row.tokenBalance, false, row.tokenDecimals) }}
        </template>
      </table-column>
    </table-component>

    <div
      v-else
      class="px-5 md:px-10"
    >
      <span>{{ $t("No results") }}</span>
    </div>
  </Loader>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'TableWalletTokensDesktop',

  props: {
    tokens: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    },

    total: {
      type: Number,
      required: true
    }
  }

}
</script>
