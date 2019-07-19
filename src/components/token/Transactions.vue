<template>
  <div v-if="transactions && transactions.length > 0">
    <h2 class="text-2xl mb-5 md:mb-6 px-5 sm:hidden text-theme-text-primary">
      {{ $t("Transactions") }}
    </h2>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <TableTokenTransactionsDesktop
          :transactions="transactions"
          :token="token"
        />
      </div>
      <div class="sm:hidden">
        <TableTokenTransactionsMobile
          :transactions="transactions"
          :token="token"
        />
      </div>
      <!--div
        v-if="transactions.length >= 25"
        class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap"
      >
        <RouterLink
          :to="{ name: 'block-transactions', params: { block: block.id, page: 2 } }"
          tag="button"
          class="show-more-button"
        >
          {{ $t("Show more") }}
        </RouterLink>
      </div-->
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import TokenService from '@/services/token'

export default {
  name: 'TokenTransactions',

  props: {
    token: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    transactions: null
  }),

  watch: {
    token () {
      this.resetTransactions()
      this.getTransactions()
    }
  },

  methods: {
    resetTransactions () {
      this.transactions = null
    },

    async getTransactions () {
      if (!this.token.tokenIdHex) return

      if (this.token.qty_valid_txns_since_genesis > 0) {
        const data = await TokenService.getTransactions(this.token.tokenIdHex)
        this.transactions = data
      }
    }
  }
}
</script>
