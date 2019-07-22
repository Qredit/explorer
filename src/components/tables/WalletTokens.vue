<template>
  <Loader :data="tokens">
    <TableWrapper
      v-bind="$attrs"
      :has-pagination="false"
      :columns="columns"
      :rows="tokens"
      :sort-query="{ field: 'symbol', type: 'asc' }"
      :no-data-message="$t('No results')"
    >
      <template
        slot-scope="data"
      >
        <div v-if="data.column.field === 'name'">
          {{ data.row.name }}
        </div>

        <div v-else-if="data.column.field === 'symbol'">
          <LinkTokenSymbol
            v-if="data.row.tokenIdHex"
            :id="data.row.tokenIdHex"
            :symbol="data.row.symbol"
          >
            {{ data.row.symbol }}
          </LinkTokenSymbol>
        </div>
        <div v-else-if="data.column.field === 'tokenIdHex'">
          <LinkToken
            v-if="data.row.tokenIdHex"
            :id="data.row.tokenIdHex"
            :symbol="data.row.symbol"
          >
            {{ data.row.tokenIdHex }}
          </LinkToken>
        </div>

        <div v-else-if="data.column.field === 'balance'">
          <span>
            {{ readableCryptoAlt(data.row.tokenBalance, false, data.row.tokenDecimals) }}
          </span>
        </div>
      </template>
    </TableWrapper>
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
    }

  },

  data: () => ({
    windowWidth: 0
  }),

  computed: {

    columns () {
      const columns = [
        {
          label: this.$t('Token Name'),
          field: 'name',
          thClass: 'start-cell',
          tdClass: 'start-cell'
        },
        {
          label: this.$t('Token Symbol'),
          field: 'symbol'
        },
        {
          label: this.$t('Token ID'),
          field: 'tokenIdHex'
        },
        {
          label: this.$t('Balance'),
          field: 'balance',
          type: 'number',
          thClass: 'end-cell',
          tdClass: 'whitespace-no-wrap end-cell'
        }
      ]

      return columns
    }
  },

  mounted () {
    this.windowWidth = window.innerWidth

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    })
  }

}
</script>
