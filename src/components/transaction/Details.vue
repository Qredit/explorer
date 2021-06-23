<template>
  <section class="page-section py-5 md:py-10 mb-5">
    <div class="px-5 sm:px-10">
      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("Sender") }}
        </div>
        <div class="truncate">
          <LinkWallet :address="transaction.sender" :trunc="false" />
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("Recipient") }}
        </div>
        <div class="truncate">
          <LinkWallet
            :address="transaction.recipient"
            :type="transaction.type"
            :asset="transaction.asset"
            :trunc="false"
          />
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("Confirmations") }}
        </div>
        <div>{{ confirmations }}</div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("Amount") }}
        </div>
        <div
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(transaction.amount, price) : '',
            placement: 'left',
          }"
        >
          {{ readableCrypto(transaction.amount) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("Fee") }}
        </div>
        <div
          v-tooltip="{
            trigger: 'hover click',
            content: price ? readableCurrency(transaction.fee, price) : '',
            placement: 'left',
          }"
        >
          {{ readableCrypto(transaction.fee) }}
        </div>
      </div>

      <div class="list-row-border-b-no-wrap">
        <div class="mr-4">
          {{ $t("Timestamp") }}
        </div>
        <div v-if="transaction.timestamp">
          {{ readableTimestamp(transaction.timestamp.unix) }}
        </div>
      </div>

      <div v-if="transaction.vendorField" class="list-row-border-b-no-wrap">
        <div class="mr-4">
          {{ $t("Smartbridge") }}
        </div>
        <div class="overflow-hidden break-words">
          {{ emojify(transaction.vendorField) }}
        </div>
      </div>

      <div class="list-row">
        <div class="mr-4">
          {{ $t("Block") }}
        </div>
        <div>
          <LinkBlock v-if="transaction.blockId" :id="transaction.blockId">
            {{ transaction.blockId }}
          </LinkBlock>
        </div>
      </div>
    </div>

    <!-- SLPADD -->

    <div v-if="transaction.tokenData" class="px-5 sm:px-10">
      <div class="list-row-border-b">
        <div>
          <strong>{{ $t("TokenDetails") }}</strong>
        </div>
        <div />
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenId") }}</div>
        <div>
          <LinkToken
            v-if="transaction.tokenData.transactionDetails.tokenIdHex"
            :id="transaction.tokenData.transactionDetails.tokenIdHex"
          >
            {{ transaction.tokenData.transactionDetails.tokenIdHex }}
          </LinkToken>
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenSymbol") }}</div>
        <div>
          <LinkTokenSymbol
            v-if="transaction.tokenData.transactionDetails.tokenIdHex"
            :id="transaction.tokenData.transactionDetails.tokenIdHex"
            :symbol="transaction.tokenData.transactionDetails.symbol"
          >
            {{ transaction.tokenData.transactionDetails.symbol }}
          </LinkTokenSymbol>
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenName") }}</div>
        <div>{{ transaction.tokenData.transactionDetails.name }}</div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenTransactionType") }}</div>
        <div>
          {{ transaction.tokenData.transactionDetails.transactionType }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenTransactionIsValid") }}</div>
        <div>{{ capitalize(transaction.tokenData.valid.toString()) }}</div>
      </div>

      <div
        v-if="transaction.tokenData.valid == false"
        class="list-row-border-b"
      >
        <div>{{ $t("TokenInvalidReason") }}</div>
        <div>{{ transaction.tokenData.invalidReason }}</div>
      </div>

      <div
        v-if="
          transaction.tokenData.transactionDetails.genesisOrMintQuantity != 0
        "
        class="list-row-border-b"
      >
        <div>{{ $t("TokenGenMintBurnQuantity") }}</div>
        <div>
          {{
            readableCryptoAlt(
              transaction.tokenData.transactionDetails.genesisOrMintQuantity,
              false,
              transaction.tokenData.transactionDetails.decimals
            )
          }}
          {{ transaction.tokenData.transactionDetails.symbol }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenOutputAddress") }}</div>
        <div>
          <LinkWallet
            :address="
              transaction.tokenData.transactionDetails.sendOutput.address
            "
            :type="transaction.type"
            :asset="transaction.asset"
            :trunc="false"
          />
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenOutputAmount") }}</div>
        <div>
          {{
            readableCryptoAlt(
              transaction.tokenData.transactionDetails.sendOutput.amount,
              false,
              transaction.tokenData.transactionDetails.decimals
            )
          }}
          {{ transaction.tokenData.transactionDetails.symbol }}
        </div>
      </div>

      <div
        v-if="
          transaction.tokenData.transactionDetails.note &&
          transaction.tokenData.transactionDetails.note != ''
        "
        class="list-row-border-b"
      >
        <div>{{ $t("Note") }}</div>
        <div>{{ transaction.tokenData.transactionDetails.note }}</div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from "@/services/crypto-compare";
import { mapGetters } from "vuex";

export default {
  name: "TransactionDetails",

  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    initialBlockHeight: 0,
    price: 0,
  }),

  computed: {
    ...mapGetters("currency", { currencySymbol: "symbol" }),
    ...mapGetters("network", ["height"]),

    confirmations() {
      return this.initialBlockHeight
        ? this.height - this.initialBlockHeight
        : this.transaction.confirmations;
    },
  },

  watch: {
    async transaction() {
      this.updatePrice();
      this.setInitialBlockHeight();
    },

    async currencySymbol() {
      await this.updatePrice();
    },

    height(newValue, oldValue) {
      if (!oldValue) {
        this.setInitialBlockHeight();
      }
    },
  },

  methods: {
    async updatePrice() {
      this.price = await CryptoCompareService.dailyAverage(
        this.transaction.timestamp.unix
      );
    },

    setInitialBlockHeight() {
      this.initialBlockHeight = this.height - this.transaction.confirmations;
    },
  },
};
</script>

<style scoped>
.list-row-border-b-no-wrap > div:last-child {
  text-align: right;
}
</style>
