<template>
  <div v-if="tokens && tokens.length > 0">
    <h2 class="text-2xl mb-5 md:mb-6 px-5 text-theme-text-primary">
      {{ $t("Tokens") }}
    </h2>
    <section class="page-section mb-5 py-5 md:py-10">
      <div class="hidden sm:block">
        <TableWalletTokensDesktop :tokens="tokens" />
      </div>
      <div class="sm:hidden">
        <TableWalletTokensMobile :tokens="tokens" />
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import TokenService from "@/services/token";

export default {
  name: "WalletTokens",

  props: {
    tokens: {
      type: Object,
      required: true,
    },
  },

  //   data: () => ({
  //     tokens: null
  //   }),

  //   watch: {
  //     token () {
  //       this.resetTokens()
  //       this.getTokens()
  //     }
  //   },

  //   methods: {
  //     resetTokens () {
  //       this.tokens = null
  //     },

  //     async getTokens () {
  //       if (!this.wallet.address) return

  //       const data = await TokenService.getWalletTokens(this.wallet.address)
  //         this.tokens = data
  //     }
  //   }
};
</script>
