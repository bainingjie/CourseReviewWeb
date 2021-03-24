<template>
  <div>
    <!-- <input v-model.number="page" type="number" style="width: 5em"> /{{numPages}} -->
    <p>{{page}}ページ目/{{numPages}}ページ<p>
    <v-btn @click="page > 1 ?page -= 1 : page -= 0" class="mx-2"> 前のページ</v-btn>
    <v-btn @click="page += 1" class="mx-2"> 次のページ</v-btn>
    <div style="width: 80%" class="noPrint">

<!--       <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%</div>
      <pdf v-if="show" ref="pdf" style="border: 1px solid red" :src="src" :page="page" :rotate="rotate" @password="password" @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event"></pdf> -->
    <pdf
      :src="src"
      :page="page"
      @num-pages="numPages = $event"
      @page-loaded="currentPage = $event"
      oncontextmenu="return false;"
    ></pdf>

    </div>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
import Methods from "../../api/method.js";
import { NodeCMapReaderFactory } from '../../node_modules/pdfjs-dist/lib/test/unit/test_utils.js';

export default {
  components: {
    pdf: pdf
  },
  data () {
    return {
      show: true,
      loadedRatio: 0,
      numPages: 0,
      rotate: 0,

      src:'',
      page: 1,
      // note_password:''

    }
  },
  created() {
    this.getData();
    PDFJSLib.getDocument({
      data: rawData,
      cMapUrl: 'node_modules/pdfjs-dist/cmaps/',
      cMapPacked: true,
      CMapReaderFactory: NodeCMapReaderFactory
    }).promise;
  },
  methods: {
    async getData() {
      let response = await Methods.getNote(this.$route.params.id);
      // let note_password = await Methods.getNotePassword();
      // this.note_password = note_password.data.password;
      this.src= response.data.url;
    },
    error: function(err) {
      console.log(err);
    }
  }
}
</script>
<style scoped>

@media print {
.noPrint {
    display:none;
  }
}
</style>