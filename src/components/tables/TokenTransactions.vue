<template>
  <Loader :data="transactions">
    <table-component
      v-if="transactions && transactions.length > 0"
      :data="transactions"
      sort-by="transactionDetails.timestamp_unix"
      sort-order="desc"
      :show-filter="false"
      :show-caption="false"
      table-class="w-full"
    >
      <table-column
        show="txid"
        :label="$t('ID')"
        header-class="left-header-start-cell"
        cell-class="left-start-cell"
      >
        <template slot-scope="row">
          <LinkTransaction
            :id="row.txid"
          />
        </template>
      </table-column>

      <table-column
        show="transactionDetails.timestamp"
        :label="$t('Timestamp')"
        header-class="left-header-cell hidden md:table-cell"
        cell-class="left-cell hidden md:table-cell wrap-timestamp"
      >
        <template slot-scope="row">
          {{ row.transactionDetails.timestamp }}
        </template>
      </table-column>

      <table-column
        show="transactionDetails.senderAddress"
        :label="$t('Sender')"
        header-class="left-header-cell"
        cell-class="left-cell"
      >
        <template slot-scope="row">
          <LinkWallet :address="row.transactionDetails.senderAddress" />
        </template>
      </table-column>

      <table-column
        show="transactionDetails.sendOutput.address"
        :label="$t('Recipient')"
        header-class="left-header-cell"
        cell-class="left-cell"
      >
        <template slot-scope="row">
          <LinkWallet :address="row.transactionDetails.sendOutput.address" />
        </template>
      </table-column>

      <table-column
        show="transactionDetails.transactionType"
        :label="$t('TokenTransactionType')"
        header-class="right-header-cell hidden lg:table-cell"
        cell-class="right-cell hidden lg:table-cell"
      >
        <template slot-scope="row">
          {{ row.transactionDetails.transactionType }}
        </template>
      </table-column>

      <table-column
        show="transactionDetails.sendOutput.amount"
        :label="$t('Amount (token)', { token: token.tokenDetails.symbol })"
        header-class="right-header-end-cell lg:pr-4"
        cell-class="right-end-cell lg:pr-4"
      >
        <template slot-scope="row">
          <span class="whitespace-no-wrap">
            {{ readableCryptoAlt(row.transactionDetails.sendOutput.amount, false, row.transactionDetails.decimals) }}
          </span>
        </template>
      </table-column>

      <table-column
        show="fee"
        :label="$t('Fee (token)', { token: networkToken() })"
        header-class="right-header-end-cell hidden lg:table-cell"
        cell-class="right-end-cell hidden lg:table-cell"
      >
        <template slot-scope="row">
          <span class="whitespace-no-wrap">
            {{ readableCrypto(row.transactionDetails.fee_xqr) }}
          </span>
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
  name: 'TableTokenTransactionsDesktop',

  props: {
    transactions: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    },
    token: {
      required: true
    }
  },

  computed: {
    showSmartBridgeIcon () {
      return this.transactions.some(transaction => {
        return !!transaction.vendorField
      })
    }
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
