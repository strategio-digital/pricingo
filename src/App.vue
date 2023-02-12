<template>
    <router-view/>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap");
@import "~bootstrap/scss/functions";
//@import "~bootstrap/scss/variables";
@import "assets/scss/bootstrap/variables";
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/utilities";
@import "~bootstrap/scss/root";
@import "~bootstrap/scss/reboot";
@import "~bootstrap/scss/type";
@import "~bootstrap/scss/containers";
@import "~bootstrap/scss/grid";
@import "~bootstrap/scss/buttons";
@import "~bootstrap/scss/forms";
@import "~bootstrap/scss/alert";
@import "~bootstrap/scss/tables";
@import "~bootstrap/scss/utilities/api";

body {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $gray-200;
}
</style>
