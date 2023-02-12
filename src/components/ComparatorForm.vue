<template>
  <form @submit.prevent="saveData" class="mt-5 shadow p-4 p-sm-5 bg-light search-form">
    <label class="h4 fw-bold">Zadejte odkazy vedoucí na <a href="//heureka.cz" target="_blank" rel="noreferrer">Heureku</a>:</label>
    <div class="text-dark small mb-3">
      <span>Na každý řádek uveďte jeden platný odkaz. Ještě můžete zadat</span>
      <span :class="remaining < 0 ? 'text-danger' : 'text-dark'" class="fw-bold">
        {{ remaining }} {{ remainingMessage }}
      </span>
      <span>(free verze).</span>
    </div>
    <textarea
        v-model="links"
        :disabled="saving"
        :class="isValid ? '' : 'is-invalid'"
        @keyup="validate()"
        @change="validate()"
        class="form-control mb-3"
        rows="10">
    </textarea>
    <div v-for="(alert, index) in alerts"
         :class="alert.type"
         :key="index"
         class="alert"
    >
      {{ alert.message }}
    </div>
    <button :disabled="disabled" class="btn btn-danger btn-lg fw-bold p-3" type="submit">
      <font-awesome-icon :hidden="!saving" :icon="['fas', 'circle-notch']" spin/>
      Zjistit ceny konkurence
    </button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import store from '@/store';
import { functions } from "@/plugins/firebase";
import { Alert } from "@/types/Alert";
import { FormValidation } from "@/utils/FormValidation";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const formValidation = new FormValidation();

const MAX_LINKS = 10;

const DEFAULT_LINKS: Array<string> = [
  'https://mobilni-telefony.heureka.cz/apple-iphone-12-mini-64gb/',
  'https://chytre-hodinky.heureka.cz/apple-watch-series-6-44mm/'
];

library.add(faCircleNotch);
Vue.component('font-awesome-icon', FontAwesomeIcon);

@Component
export default class ComparatorForm extends Vue {
  disabled = false;
  saving = false;
  alerts: Array<Alert> = [];
  links = DEFAULT_LINKS.join('\n');

  get splitLinks(): Array<string> {
    return this.links.trim().split('\n');
  }

  get remaining(): number {
    const links = this.splitLinks;
    return (links.length === 1 && links[0] === '') ? MAX_LINKS : MAX_LINKS - links.length;
  }

  get remainingMessage(): string {
    const remaining = this.remaining;
    if (remaining < 1) return 'odkazů';
    if (remaining < 2) return 'odkaz';
    if (remaining < 5) return 'odkazy';
    return 'odkazů';
  }

  get isValid(): boolean {
    const links = this.splitLinks;
    return formValidation.isValid(links, MAX_LINKS);
  }

  validate(): void {
    this.disabled = !this.isValid;
    this.alerts.splice(0, this.alerts.length);
    this.alerts.push(... formValidation.getAlerts());
  }

  async saveData() {
    this.saving = true;

    if (this.isValid) {
      this.disabled = true;
      this.alerts.splice(0, this.alerts.length);
      this.alerts.push({ type: 'alert-warning', message: 'Zjištění cen ve free verzi může trvat až 2 minuty, prosím vyčkejte.'});

      //await new Promise((resolve => setTimeout(resolve, 3000)));
      const runPuppeteer = functions.httpsCallable('runPuppeteer', { timeout: 1000*60*2 });
      const response = await runPuppeteer({ scraperType: 'HeurekaListing', links: formValidation.getUniqueLinks() });
      await store.dispatch('comparatorResult/save', response.data);

      this.alerts.splice(0, this.alerts.length);
      this.alerts.push({ type: 'alert-success', message: 'Dokončeno, výsledek naleznete o něco níže.'});

      // Get results from database // Todo: save to firestore
      /*firestore.collection("reports").get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
              console.log(doc.id, " => ", doc.data());
          });
      });*/
    }

    this.saving = this.disabled = false;
  }
}
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/breakpoints";

textarea {
  line-height: 2;
  @include media-breakpoint-down(md) {
    font-size: .8rem;
  }
}
</style>
