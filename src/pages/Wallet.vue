<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("Wallet summary") }}</ContentHeader>

    <WalletDetails :wallet="wallet" />

    <section v-show="isDelegate" :class="{ 'py-5 md:py-10': isDelegate }" class="page-section mb-5">
      <div class="px-5 sm:px-10">
        <WalletDelegate v-show="isDelegate" :wallet="wallet" @username="username = $event" />
      </div>
    </section>
    <!-- SLPEDIT -->
    <WalletTokens v-if="tokens" :tokens="tokens" />
    <WalletTransactions v-if="wallet" :wallet="wallet" />
  </div>
</template>

<script type="text/ecmascript-6">
import {
  WalletDelegate,
  WalletDetails,
  WalletTransactions,
  WalletVoters,
  // SLPEDIT
  WalletTokens,
} from "@/components/wallet";
import WalletService from "@/services/wallet";

// SLPEDIT
import TokenService from "@/services/token";

export default {
  components: {
    WalletDelegate,
    WalletDetails,
    WalletTransactions,
    WalletVoters,
    // SLPEDIT
    WalletTokens,
  },

  data: () => ({
    wallet: {},
    tokens: {},
    activeTab: "all",
    username: "",
  }),

  computed: {
    isDelegate() {
      return this.wallet.isDelegate;
    },
  },

  // SLPEDIT
  async beforeRouteEnter(to, from, next) {
    try {
      const response = await WalletService.find(to.params.address);
      const tokensresponse = await TokenService.getWalletTokens(to.params.address);
      next((vm) => {
        vm.setWallet(response);
        vm.setTokens(tokensresponse);
      });
    } catch (e) {
      next({ name: "404" });
    }
  },

  async beforeRouteUpdate(to, from, next) {
    this.wallet = {};
    this.tokens = {};

    try {
      const response = await WalletService.find(to.params.address);
      const tokensresponse = await TokenService.getWalletTokens(to.params.address);
      this.setWallet(response);
      this.setTokens(tokensresponse);
      next();
    } catch (e) {
      next({ name: "404" });
    }
  },

  methods: {
    async setWallet(wallet) {
      this.wallet = wallet;
    },
    async setTokens(tokens) {
      this.tokens = tokens;
    },
  },
  // /SLPEDIT
};
</script>
