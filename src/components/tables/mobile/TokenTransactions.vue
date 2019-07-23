<template>
  <div>
    <Loader :data="transactions">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="row-mobile"
      >
        <div class="list-row-border-b">
          <div>{{ $t("ID") }}</div>
          <LinkTransaction
            :id="transaction.txid"
            :smart-bridge="transaction.vendorField"
          />
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Timestamp") }}</div>
          <div v-if="transaction.transactionDetails.timestamp">
            {{ readableTimestamp(transaction.transactionDetails.timestamp_unix) }}
          </div>
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Sender") }}</div>
          <LinkWallet :address="transaction.transactionDetails.senderAddress" />
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Recipient") }}</div>
          <LinkWallet :address="transaction.transactionDetails.sendOutput.address" />
        </div>

        <div class="list-row-border-b">
          <div>{{ $t("Amount") }}</div>
          <div>
            {{ readableCryptoAlt(transaction.transactionDetails.sendOutput.amount, false, transaction.transactionDetails.decimals) }}
            {{ transaction.transactionDetails.symbol }}
          </div>
        </div>

        <div class="list-row">
          <div>{{ $t("Fee") }}</div>
          <div>{{ readableCrypto(transaction.transactionDetails.fee_xqr) }}</div>
        </div>
      </div>
      <div
        v-if="transactions && !transactions.length"
        class="px-5 md:px-10"
      >
        <span>{{ $t("No results") }}</span>
      </div>
    </Loader>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TableTokenTransactionsMobile',

  props: {
    transactions: {
      validator: value => {
        return Array.isArray(value) || value === null
      },
      required: true
    }
  }
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
