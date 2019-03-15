<template>
  <div class="navplace">
  <h3>Navigation</h3>
    <hr>
    <ul class="nav flex-column nav-fill">
      <li class="nav-item">
        <a class="nav-link active" href="#">Calendar</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Tabel</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Store</a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Navigation"
    }
</script>

<style scoped>
  .navplace{
    border: 4px outset lightblue;
  }
  h3{
    text-align: center;
    /*margin: 0 auto;*/
  }
  hr{
    border:  0.5px solid lightblue;
  }

</style>
