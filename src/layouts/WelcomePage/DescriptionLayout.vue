<template>
  <div class="description-wrapper">
    <div>
      <h3 class="tools-title">
        Tools
      </h3>
    </div>
    <div class="slider-container">

    </div>
    <div>
    </div>
  </div>
</template>

<script>

export default {
  name: "DescriptionLayout",
}
</script>

<style scoped>
.tools-title{
  color: #c2c0bf;
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
}
.tools-title:before, .tools-title:after{
  content: "";
  flex: 1 1;
  border-bottom: 1px solid #41afa5;
  margin:auto
}
.tools-title:before{
  margin-right:0.4rem ;
}
.tools-title:after{
  margin-left:0.4rem ;
}


.description-wrapper {
  height: 100%;
  display: grid;
  grid-template-rows: 10% 80% 10%;
}

.description-wrapper > div {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-container {
}
</style>