<template>
  <div v-if="token" class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("Token") }}</ContentHeader>

    <template v-if="tokenNotFound">
      <section class="page-section py-5 md:py-10 px-6">
        <div class="my-10 text-center">
          <NotFound
            data-type="token"
            :data-id="token.tokenDetails.tokenIdHex"
          />

          <button
            :disabled="isFetching"
            class="mt-4 pager-button items-center"
            @click="fetchToken"
          >
            <span>{{
              !isFetching ? $t("Reload this page") : $t("Loading...")
            }}</span>
          </button>
        </div>
      </section>
    </template>

    <template v-else>
      <TokenIdentity :token="token" />

      <TokenDetails :token="token" />

      <TokenTransactions :token="token" />
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  TokenDetails,
  TokenIdentity,
  TokenTransactions,
} from "@/components/token";
import NotFound from "@/components/utils/NotFound";
import TokenService from "@/services/token";

export default {
  components: {
    TokenDetails,
    TokenIdentity,
    TokenTransactions,
    NotFound,
  },

  data: () => ({
    token: {},
    tokenNotFound: false,
    isFetching: false,
  }),

  async beforeRouteEnter(to, from, next) {
    try {
      const response = await TokenService.find(to.params.id);
      next((vm) => vm.setToken(response));
    } catch (e) {
      next((vm) => {
        console.log(e.message || e.data.error);

        vm.tokenNotFound = true;
        vm.token = { id: to.params.id };
      });
    }
  },

  async beforeRouteUpdate(to, from, next) {
    this.block = {};

    try {
      const response = await TokenService.find(to.params.id);
      this.setToken(response);
      next();
    } catch (e) {
      console.log(e.message || e.data.error);

      this.tokenNotFound = true;
      this.token = { id: to.params.id };
    }
  },

  methods: {
    async prepareComponent() {
      this.$store.watch(
        (state) => state.network.height,
        (value) => this.updateToken()
      );
    },

    async updateToken() {
      try {
        const response = await TokenService.find(this.params.id);
        this.setToken(response);
      } catch (e) {
        console.log(e.message || e.data.error);
      }
    },

    async fetchToken() {
      this.isFetching = true;

      try {
        const token = await TokenService.find(this.params.id);
        this.setToken(token);
        this.tokenNotFound = false;
      } catch (e) {
        console.log(e.message || e.data.error);
      } finally {
        this.isFetching = false;
      }
    },

    setToken(token) {
      this.token = token;
    },
  },
};
</script>
