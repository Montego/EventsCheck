<template>
  <div class="container">
    <div>Main</div>
    <div class="row">
      <div class="col col-sm-3 menu">
        <Navigation>f</Navigation>
      </div>
      <div class="col col-sm-9">
        <Calendar>f</Calendar>
      </div>
    </div>
  </div>
</template>

<script>
    import Navigation from "../Navigation";
    import Calendar from "../Calendar";
    export default {
        name: "Main",
      components: {Calendar, Navigation}
    }
</script>

<style>

</style>
