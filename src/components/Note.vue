<template>


    <!-- <vue-friendly-iframe :src="url" class="responsive-iframe" ></vue-friendly-iframe> -->
    <v-container   class="container" >
        <iframe  id="iframe_id" :src="url" class="responsive-iframe"></iframe>
    </v-container>
    
<!--      <embed src="../assets/test.pdf" ></embed> -->

     <!-- <iframe id="fraDisabled" width="528" height="473" src="../../backend/pdfs/test.pdf" ></iframe> -->
<!-- :onload="disableContextMenu()" :onMyLoad="disableContextMenu()" -->

    <!-- :onload="preventRightClick()"> -->

<!--     <iframe :src="url"  width="560"
        height="315" ></iframe> -->
<!--   <vue-iframe
    :src="url" 
    @load="onLoad"
    allow="camera *; geolocation *; microphone *; autoplay *"
    frame-id="my-ifram"
    name="my-frame"
    width="150px"
    height="200px"
  /> -->



</template>

<script>
import Methods from "../../api/method.js";
export default {
  name: "Note",
  data () {
    return {
      url: '',
    }
  },
  methods:{
    async getData() {
      let response = await Methods.getNote(this.$route.params.id);
      this.url= response.data.url+"#toolbar=0";
    },
  },
  created(){
        this.getData();
  },
}
</script>
<style scoped>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 75%;
}
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
@media print {
.noPrint {
    display:none;
  }
}
</style>