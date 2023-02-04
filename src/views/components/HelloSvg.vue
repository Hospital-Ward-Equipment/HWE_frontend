<template>
  <div style="background-color: blue;">
    <FerrisWheel />
  </div>
</template>

<script>
import FerrisWheel from "@/views/components/FerrisWheel";

export default {
  name: "HelloSvg",
  components: {
    FerrisWheel,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  position: absolute;
  top: 0px;
  left: 30px;
}
svg {
  width: 419px;
  height: 390px;
}
</style>
