<template>
  <div class="container h-100 d-flex justify-content-center align-items-center">
    <div>
        <h2 class="display-1 mb-0">404</h2>
        <h1 class="display-5 fw-bold my-3">Stránka nenalezena</h1>
        <p class="lead mb-5">Omlouváme se, ale tato pod-stránka webu již nejspíše neexistuje. Vraťe se zpět na úvod.</p>
        <button class="btn btn-lg btn-primary" type="button" @click.prevent="moveToHomepage">zpět na úvod</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component"

@Component
export default class PageNotFound extends Vue {
  moveToHomepage() {
    this.$router.push('/');
  }
}
</script>
