<template>
  <div>
    <div class="container">
      <h1 class="fw-bold text-danger display-4 pt-5 pt-lg-10">Víte, za kolik prodává&nbsp;Vaše konkurence?</h1>
      <h2 class="display-6 text-black-50 mt-4"><span class="fw-bold">ZDARMA</span> vyzkoušejte reporting cen konkurenčních e-shopů.</h2>
      <ComparatorForm/>
      <ResultTable :comparatorResult="comparatorResult" :index="index" v-for="(comparatorResult, index) in comparatorResults" :key="index"/>
    </div>

    <div class="bg-light py-5 py-md-10">
      <div class="container text-dark text-lg-center">
        <div class="row justify-content-center">
          <div class="col-xl-8">
            <h1 class="display-3 fw-bolder">
              Neprodělávejte na&nbsp;<br class="d-none d-xl-block">vlastní cenotvorbě
            </h1>
            <p class="h4 my-5 font-monospace text-black-50" style="line-height: 2">
              Nechte pravidelně sledovat konkurenci a mějte jasno při rozhodování o cenách. Díky naší aplikaci nastavíte ceny, které Vám přinesou vyšší <strong>zisk s každou
              další konverzí</strong>.
            </p>
            <a href="//strategio.digital" target="_blank" class="btn btn-danger btn-lg fw-bold py-3 px-4" style="line-height: 1.3">
              Domluvit si konzultaci
              <span class="d-block fw-normal" style="font-size: .7rem">na webu strategio.digital</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-dark">
      <div class="container py-5 py-md-10">
        <a href="//strategio.digital" target="_blank" class="d-block">
          <img src="@/assets/strategio-digital.svg">
        </a>
        <div class="d-block d-lg-flex h4 pb-md-0" style="line-height: 2;">
          <div class="px-3">
            <a href="//strategio.digital" target="_blank" class="text-white">www.strategio.digital</a>
          </div>
          <div class="px-3">
            <a href="mailto:jz@strategio.digital" target="_blank" class="text-white">jz@strategio.digital</a>
          </div>
          <div class="px-3">
            <a href="tel:+420606091125" target="_blank" class="text-white">+420&nbsp;606&nbsp;091&nbsp;125</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component"
import ComparatorForm from '@/components/ComparatorForm.vue';
import ResultTable from "@/components/ResultTable.vue";
import store from "@/store";
import {ComparatorResult} from "../../functions/src/types/ComparatorResult";

@Component({
  components: {
    ComparatorForm,
    ResultTable
  },
})
export default class Home extends Vue {
  get comparatorResults(): Array<ComparatorResult> {
    return store.getters['comparatorResult/getResults'];
  }
}
</script>
