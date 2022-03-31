<template>
    <mdb-container>
    <mdb-row>
      <mdb-col col="9">
          <h1> PWS! Grüßgott - grüß Sie herzlich </h1>
      </mdb-col>
      <mdb-col>
          <img src="../assets/pws.webp" class="img-fluid" alt="Responsive image">
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col>1 of 3</mdb-col>
      <mdb-col col="5">2 of 3 (wider)</mdb-col>
      <mdb-col>3 of 3</mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
  import {mdbContainer, mdbRow, mdbCol} from 'mdbvue';
  export default {
    components: {
      mdbContainer,
      mdbRow,
      mdbCol
    }
  }
</script>

<style>

</style>