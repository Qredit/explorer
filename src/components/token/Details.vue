<template>
  <section class="page-section py-5 md:py-10 mb-5">
    <div class="px-5 sm:px-10">
      <div class="list-row-border-b">
        <div>{{ $t("TokenType") }}</div>
        <div>{{ token.type }}</div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenPaused") }}</div>
        <div>
          {{ capitalize(String(token.paused)) }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenOwner") }}</div>
        <div>
          <LinkWallet :address="token.ownerAddress" :trunc="false" />
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenGenesisTime") }}</div>
        <div>
          {{ token.genesis_timestamp }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenSymbol") }}</div>
        <div>
          {{ token.symbol }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenName") }}</div>
        <div>
          {{ token.name }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenDocumentUri") }}</div>
        <div>
          {{ token.documentUri }}
        </div>
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenDecimals") }}</div>
        <div>
          {{ token.decimals }}
        </div>
      </div>

      <div class="list-row">
        <div>{{ $t("TokenGenesisQty") }}</div>
        <div>
          {{ readableCryptoAlt(token.genesisQuantity, false, token.decimals) }}
          {{ token.symbol }}
        </div>
      </div>
    </div>

    <div class="px-5 sm:px-10">
      <div class="list-row-border-b">
        <div>
          <strong>{{ $t("Statistics") }}</strong>
        </div>
        <div />
      </div>

      <div class="list-row-border-b">
        <div>{{ $t("TokenBlockCreated") }}</div>
        <div>
          <LinkBlock v-if="token.block_created_id" :id="token.block_created_id">
            {{ token.block_created_id }}
          </LinkBlock>
        </div>
      </div>
      <div class="list-row-border-b">
        <div>{{ $t("TokenBlockHeightCreated") }}</div>
        <div>
          {{ token.block_created_height }}
        </div>
      </div>
      <div class="list-row-border-b">
        <div>{{ $t("TokenBlockHeightLastUpdate") }}</div>
        <div>
          {{ token.lastUpdatedBlock }}
        </div>
      </div>
      <div class="list-row-border-b">
        <div>{{ $t("TokenBlockLastActiveSend") }}</div>
        <div>
          {{ token.block_last_active_send }}
        </div>
      </div>
      <div class="list-row-border-b">
        <div>{{ $t("TokenBlockLastActiveMint") }}</div>
        <div>
          {{ token.block_last_active_mint }}
        </div>
      </div>
      <div class="list-row-border-b">
        <div>{{ $t("TokenValidTxnsSinceGenesis") }}</div>
        <div>
          {{ token.qty_valid_txns_since_genesis }}
        </div>
      </div>
      <div class="list-row-border-b">
        <div>{{ $t("TokenValidTokenAddresses") }}</div>
        <div>
          {{ token.qty_valid_token_addresses }}
        </div>
      </div>
      <div class="list-row-border-b">
        <div>{{ $t("TokenQtyMinted") }}</div>
        <div>
          {{ readableCryptoAlt(token.qty_token_minted, false, token.decimals) }}
          {{ token.symbol }}
        </div>
      </div>
      <div class="list-row-border-b">
        <div>{{ $t("TokenQtyBurned") }}</div>
        <div>
          {{ readableCryptoAlt(token.qty_token_burned, false, token.decimals) }}
          {{ token.symbol }}
        </div>
      </div>
      <div class="list-row">
        <div>{{ $t("TokenQtyCirculatingSupply") }}</div>
        <div>
          {{ readableCryptoAlt(token.qty_token_circulating_supply, false, token.decimals) }}
          {{ token.symbol }}
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import CryptoCompareService from "@/services/crypto-compare";
import { mapGetters } from "vuex";

export default {
  name: "TokenDetails",

  props: {
    token: {
      // type: Object,
      object: String,
      tokenIdHex: Object,
      required: true,
    },
  },
  data: () => ({
    price: 0,
  }),

  /*
  computed: {
    ...mapGetters('currency', { currencySymbol: 'symbol' }),
    ...mapGetters('network', ['height']),

    confirmations () {
      return this.height - this.block.height
    }
  },

  watch: {
    block () {
      this.updatePrice()
    },

    currencySymbol () {
      this.updatePrice()
    }
  },

  methods: {
    async updatePrice () {
      if (!this.block.id) {
        return
      }

      this.price = await CryptoCompareService.dailyAverage(this.block.timestamp.unix)
    }
  }

*/
};
</script>
