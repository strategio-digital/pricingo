<template>
  <div v-if="comparatorResult.error" class="p-3 p-md-5 mt-5 mb-5 bg-light shadow">
    <div class="alert alert-danger mb-0">
      <div class="fw-bold">U Vašeho {{ index + 1 }}. odkazu se nepodařilo dohledat data.</div>
      <div class="small">
        Odkaz můžete překontrolovat zde: <a :href="comparatorResult.url" target="_blank" rel="noreferrer">{{ comparatorResult.url }}</a>
      </div>
    </div>
  </div>
  <div v-else class="p-3 p-md-5 mt-5 mb-5 bg-light shadow">
    <div class="d-flex mb-4">
      <img :src="comparatorResult.listingResult.image" class="result-image">
      <div>
        <h2>{{ comparatorResult.listingResult.productName }}</h2>
        <div class="small" style="word-break: break-all">
          <a :href="comparatorResult.url" target="_blank">{{ comparatorResult.url }}</a>
        </div>
        <div class="small mt-2" v-if="comparatorResult.debugLink">
          <div class="d-none d-md-block">
            <strong>Debug:</strong> {{ comparatorResult.duration }}s / {{
              comparatorResult.listingResult.extractorName
            }}
            <a :href="comparatorResult.debugLink" target="_blank" class="text-black-50" style="word-break: break-all">
              ({{ comparatorResult.debugLink }})
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table caption-top result-table">
        <thead>
        <tr>
          <th scope="col">Pozice</th>
          <th scope="col">E-shop</th>
          <th scope="col">Cena</th>
          <th scope="col">Doprava</th>
          <th scope="col">Sklad</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(shop, index) in comparatorResult.listingResult.shops" v-show="index < 14" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td><a :href="shop.link" target="_blank" rel="noreferrer">{{ shop.name }}</a></td>
            <td>{{ shop.productPrice.value }}</td>
            <td>{{ shop.deliveryPrice.value }}</td>
            <td>{{ shop.inStock }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator"
import {ComparatorResult} from "../../functions/src/types/ComparatorResult";

@Component
export default class ResultTable extends Vue {
  @Prop({ required: true })
  comparatorResult!: ComparatorResult;

  @Prop({ required: true })
  index!: number;
}
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/breakpoints";
td {
  min-width: 180px;
}
img {
  margin-right: 1rem;
  border: 1px solid $gray-200;
  max-width: 90px;
  max-height: 90px;

  @include media-breakpoint-down(sm) {
    max-width: 60px;
    max-height: 60px;
  }
}
</style>