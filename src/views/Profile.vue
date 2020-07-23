<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required
          }"
        />
        <label for="description">Имя</label>
        <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">Ввидите имя</small>
      </div>
      <div class="input-field">
        <input
          id="description"
          type="number"
          v-model="bill"
          :class="{
            invalid: ($v.bill.$dirty && !$v.bill.required) || ($v.bill.$dirty && !$v.bill.minValue)
          }"
        />
        <label for="description">Бюджет</label>
        <small class="helper-text invalid" v-if="$v.bill.$dirty && !$v.bill.required">Ввидите сумму</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.bill.$dirty && !$v.bill.minValue"
        >Минимальная сумма {{this.$v.bill.$params.minValue.min}}</small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, minValue } from "vuelidate/lib/validators";

export default {
  data: () => ({
    name: "",
    bill: ""
  }),
  mounted() {
    this.name = this.info.name;
    this.bill = this.info.bill;
    setTimeout(() => {
      window.M.updateTextFields();
    });
  },
  validations: {
    name: { required },
    bill: { required, minValue: minValue(100) }
  },
  computed: {
    ...mapGetters(["info"])
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          bill: this.bill
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
