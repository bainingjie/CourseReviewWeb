<template>
  <div>
   <v-label>タイトル:</v-label>
   <span class="mx-2">{{note.title}}</span><br/>
   <v-label>値段:</v-label>
   <span class="mx-2">¥ {{note.price}}</span><br/>
   <v-label>詳細:</v-label>
   <span class="mx-2">{{note.description}}</span><br/>
   <p>preview:</p>
   <p>----images----</p>
   <p>reviews:</p>
   <p>----reviews----</p>
   <v-btn color="primary">購入</v-btn>
  </div>
</template>

<script>
import Methods from "../../api/method.js";
// import {credit,point,difficulty,recommendation} from "../../api/GlobalData.js";
export default {
  name: "Note",
  data() {
    return {
      userid:'',
      note:{}
    };
  },


  created() {
    this.getData();
  },

  methods: {
    async getData() {
      let note_data = await Methods.getNote(this.$route.params.id);
      this.note = note_data.data;
      // console.log(courses_data.data);
      // let max_scorer = Math.max(...courses_data.data.selected_evaluation);
    },

  },
};
</script>

<style scoped>
.v-select{
  font-size: 13px;
}

</style>