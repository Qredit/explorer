<template>
  <Loader :data="transactions">
    <TableWrapper
      v-bind="$attrs"
      :has-pagination="false"
      :columns="columns"
      :rows="transactions"
      :sort-query="{ field: 'timestamp', type: 'asc' }"
      :no-data-message="$t('No results')"
    >
      <template
        slot-scope="data"
      >
        <div v-if="data.column.field === 'txid'">
          <LinkTransaction
            :id="data.row.txid"
          />
        </div>
        <div v-else-if="data.column.field === 'timestamp'">
          {{ data.row.transactionDetails.timestamp }}
        </div>
        <div v-else-if="data.column.field === 'sender'">
          <LinkWallet :address="data.row.transactionDetails.senderAddress" />
        </div>
        <div v-else-if="data.column.field === 'recipient'">
          <LinkWallet :address="data.row.transactionDetails.sendOutput.address" />
        </div>
        <div v-else-if="data.column.field === 'type'">
          {{ data.row.transactionDetails.transactionType }}
        </div>
        <div v-else-if="data.column.field === 'amount'">
          {{ readableCryptoAlt(data.row.transactionDetails.sendOutput.amount, false, data.row.transactionDetails.decimals) }}
          {{ data.row.transactionDetails.symbol }}
        </div>
        <div v-else-if="data.column.field === 'fee'">
          {{ readableCrypto(data.row.transactionDetails.fee_xqr) }}
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TableTokenTransactionsDesktop',

  props: {
    transactions: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    }
    // token: {
    //   required: true
    // }
  },

  data: () => ({
    windowWidth: 0
  }),

  computed: {
    showSmartBridgeIcon () {
      return this.transactions.some(transaction => {
        return !!transaction.vendorField
      })
    },
    columns () {
      const columns = [
        {
          label: this.$t('ID'),
          field: 'txid',
          thClass: 'start-cell',
          tdClass: 'start-cell'
        },
        {
          label: this.$t('Timestamp'),
          field: 'timestamp'
        },
        {
          label: this.$t('Sender'),
          field: 'sender'
        },
        {
          label: this.$t('Recipient'),
          field: 'recipient'
        },
        {
          label: this.$t('TokenTransactionType'),
          field: 'type'
        },
        {
          label: this.$t('Amount'),
          field: 'amount',
          type: 'number'
        },
        {
          label: this.$t('Fee'),
          field: 'fee',
          type: 'number',
          thClass: 'end-cell',
          tdClass: 'end-cell'
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
<style>
  .wrap-timestamp {
    white-space: normal;
  }

  @media(min-width: 870px) {
    .wrap-timestamp {
      white-space: nowrap;
    }
  }
</style>
