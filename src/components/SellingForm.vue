<template>
  <form>
    <v-container class="mx-0 pa-2" fluid>
        <h2 class="mb-1">{{course.course_name[0]}}</h2>
        <span   v-for="lecturer in course.lecturer" :key="lecturer">{{lecturer}} </span><br/>
<!--     <span>科目群：検索用 (種類：語学  共通(一般教養)  専門科目  ゼミ/演習  そのほか)</span> -->
      <br/>

    <v-text-field label = "タイトル" v-model="item.title"></v-text-field>
    <v-text-field label = "値段" v-model="item.price"></v-text-field>
    <v-btn >upload file</v-btn>
    <v-card elevation="4"  class="my-3 pa-2 pb-1"    outlined>
      <h3>詳細</h3>
      <v-textarea
        v-model="item.description"
        filled
        placeholder="..."
        auto-grow
        value=""
        counter
        maxlength="1000"
      ></v-textarea>
    </v-card>
      <v-card-actions class="justify-center">

        <v-btn @click="handleSubmit" color="primary"> submit </v-btn>
      </v-card-actions>

<!--       <p>  {{classes}}</p> -->
    </v-container>
  </form>
</template>

<script>
import Methods from "../../api/method.js";

export default {
  name: "Questionary",
  data() {
    return {
      fetched_document:[],
      course: {
                university:'',
                course_name:'',
                lecturer:[],
      },
      item:{
                userid:'haku',
                title:'',
                price:'',
                description:''
      }
    };
  },


  created() {
    this.getData();
  },

  methods: {
    async getData() {
      /* 新しいtagが追加された可能性があるため、もう一度請求*/ 

      let courses_data = await Methods.getCoursesDataQuestionary(this.$route.params.id);

      this.course = courses_data.data;

    },
    handleSubmit: async function(){
      // for (let i =0;i<this.selected_goods.length;i++){
      //   // 最后只留下新加的text
      //   this.course.selected_good_texts.push(this.fetched_goods[this.selected_goods[i]].text);
      // }
      // for (let i =0;i<this.selected_bads.length;i++){
      //   // 最后只留下新加的text
      //   this.course.selected_bad_texts.push(this.fetched_bads[this.selected_bads[i]].text);
      // }
      // for (let i =0;i<this.selected_others.length;i++){
      //   // 最后只留下新加的text
      //   this.course.selected_others_texts.push(this.fetched_others[this.selected_others[i]].text);
      // }
      // for (let i =0;i<this.selected_advices.length;i++){
      //   // 最后只留下新加的text
      //   this.course.selected_advice_texts.push(this.fetched_advices[this.selected_advices[i]].text);
      // }
      // // console.log(this.course)
      // let result = await Methods.postCoursesData(this.$route.params.id,this.course);
      // console.log(result);
      // this.$router.push('/course/'+this.$route.params.id);
    }

  },
};
</script>

<style scoped>
.v-select{
  font-size: 13px;
}

</style>