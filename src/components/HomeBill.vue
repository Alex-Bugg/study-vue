<template>
  <div>
    <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p v-for="cur of currency" :key="cur" class="currency-line">
            <span>{{getCurrensy(cur) | currency(cur)}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
  data: () => ({
    currency: ["UAH", "RUB", "USD", "EUR"]
  }),
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["UAH"] / this.rates["EUR"])
      );
    }
  },
  methods: {
    getCurrensy(currency) {
      return this.base * this.rates[currency];
    }
  }
};
</script>