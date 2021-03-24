<template>
    <v-container class="ma-0" >
      <v-card  elevation="2"  class="mb-3 pa-4 pb-1"   outlined >
        <div class="ma-1 mb-2"> 
          <span class="text-caption">{{course.university}}</span>
          <h2 class="mb-1">{{name_1}}</h2>

          <div class="mt-3">
<!--             <div v-if="name_others.length>0">
              <v-label>別名:</v-label>

              <span v-for="name in name_others" :key="name" class="mx-1">{{name}}</span>
              <br/> -->
            </div>

            <v-label>教員 : </v-label>
            <span v-for="lecturer in course.lecturer_ids" :key="lecturer._id" class="mx-1">{{lecturer.kanji_alphabet}} </span><br/><br/>


            <v-label>総合推奨度 : </v-label>
                <span v-if="recommendation_index<5" class = "mx-3" style="font-weight: bold;">{{recommendation[recommendation_index-1]}}</span>
                <v-rating
                  v-if="recommendation_index<5"
                  v-model="recommendation_index"
                  background-color="orange lighten-3"
                  color="orange"
                  length="4"
                  size="16"
                  class="mb-0"
                  readonly
                ></v-rating>

                <span v-else>---</span><br/>


            <v-label>単位期待 : </v-label>
                <span v-if="credit_index<5" class = "mx-3" style="font-weight: bold;">{{credit[credit_index-1]}}</span>
                <v-rating
                  v-if="credit_index<5"
                  v-model="credit_index"
                  background-color="orange lighten-3"
                  color="orange"
                  length="4"
                  size="16"
                  class="mb-0"
                  readonly
                ></v-rating>
            <span v-else>---</span>
            <br/>

            <v-label>得点期待 : </v-label>
            <span v-if="point_index<5" class = "mx-3" style="font-weight: bold;">{{point[point_index-1]}}</span>
            <v-rating
              v-if="point_index<5"
              v-model="point_index"
              background-color="orange lighten-3"
              color="orange"
              length="4"
              size="16"
              class="mb-0"
              readonly
            ></v-rating>
            <span v-else>---</span>
            <br/>

            <v-label>難易度 : </v-label>
            <span v-if="difficulty_index<5" class = "mx-3" style="font-weight: bold;">{{difficulty[difficulty_index-1]}}</span>
            <v-rating
              v-if="difficulty_index<5"
              v-model="difficulty_index"
              background-color="orange lighten-3"
              color="orange"
              length="4"
              size="16"
              class="mb-0"
              readonly
            ></v-rating>
            <span v-else>---</span>
            <br/>

            <v-label>評価方法: </v-label>
<!--             <p>{{course.selected_evaluation}}</p> -->
            <v-chip
              v-for="(eva,index) in course.selected_evaluation"
              :key = "index"
              style="
              color:white;
              font-size:13px;"
              class="mx-1 my-1"
              color="primary"
            >{{evaluation[index]}}</v-chip>

          </div>

          <v-card-actions class="justify-center mt-1">
            <v-btn rounded style="font-weight:600;" dark color="primary"
            :href="'/course/' + course._id +'/questionary'" >この授業に点数をつける</v-btn>
          </v-card-actions>

<!--           <v-card-actions class="justify-center mt-1">
            <v-btn rounded style="background-color:#2a9d8f;font-weight:600;" dark
            :href="'/#/selling/' + course._id " >ノートや教科書などを売る</v-btn>
          </v-card-actions> -->


        <!-- </div> -->
      </v-card>
      <v-expansion-panels focusable v-model="panel" class="text-subtitle-1 mb-6">
        <v-expansion-panel class="mb-1" >
          <!-- <v-expansion-panel-header style="font-weight:600;background:#2a9d8f;color:white" > -->
          <v-expansion-panel-header style="font-weight:600;color:white"  color="primary">
          ここが良い！</v-expansion-panel-header>
          <v-expansion-panel-content class="py-2" >
<!--             <v-chip-group
              column
              multiple
              > -->
            <v-chip
              v-for="(f_g,index) in course.good_tags"
              :key = "index"
              style="
              color:white;
              font-size:13px;"
              class="mx-1 my-1"
              color="primary"
            >{{f_g.text}}</v-chip>
<!--             </v-chip-group> -->
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="mb-1">
          <v-expansion-panel-header style="font-weight:600;background:#e76f51;color:white">ここがダメ！</v-expansion-panel-header>
          <v-expansion-panel-content>
<!--             <v-chip-group
              column
              multiple> -->
            <v-chip
              v-for="(f_g,index) in course.bad_tags"
              :key = "index"
              style="background:#e76f51;color:white;font-size:13px;"
              class="mx-1 my-1"
            >{{f_g.text}}</v-chip>
<!--             </v-chip-group> -->
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="mb-1 ">
          <v-expansion-panel-header style="font-weight:600;background:#e76f51;color:white" >ここを気をつけよう！</v-expansion-panel-header>
          <v-expansion-panel-content>
<!--             <v-chip-group
              column
              multiple> -->
            <v-chip
              v-for="(f_g,index) in course.advice_tags"
              :key = "index"
              style="background:#e76f51;color:white;font-size:12px;"
              class="mx-1 my-1"
            >{{f_g.text}}</v-chip>
<!--             </v-chip-group> -->
          </v-expansion-panel-content>
        </v-expansion-panel>


      </v-expansion-panels>

      <div v-if="note_exists">
          <h3>神資料</h3>
          <v-card v-for="(note,index) in course.notes" :key = "index" :href= "'/note/'+note._id" class="my-1" elevation="2" shaped outlined>
            <v-card-title class="text-body-2">{{note.title}}</v-card-title>
          </v-card>
      </div>




      <div class="mt-2" v-if="comment_exists">
      <h3 class="mt-4">コメント</h3>
      <v-card
        elevation="2"
        outlined
        shaped
        v-for="(com,index) in course.comment"
        :key = "index"
        class = "mb-3"
      >
        <v-card-subtitle>{{com.date.substring(0,10)}}</v-card-subtitle>
        <v-card-text><pre>{{com.text}}</pre>
        <div class="mt-4">

        <v-btn elevation="2" v-if="!good_click[index]" v-on:click = "good_clicked(index)" text  style="color:#e76f51;" outlined class="mx-1 ">本質 {{com.good_count}}</v-btn>
        <v-btn  elevation="2" v-if="good_click[index]" v-on:click = "good_unclicked(index)" text outlined style="background:#e76f51;" class="mx-1 white--text">本質 {{com.good_count}}</v-btn>

        <v-btn elevation="2" v-if="!laugh_click[index]" v-on:click = "laugh_clicked(index)" text outlined class="mx-1 " style="color:#2a9d8f;">草 {{com.laugh_count}}</v-btn>
        <v-btn elevation="2" v-if="laugh_click[index]"  v-on:click = "laugh_unclicked(index)" text outlined style="background:#2a9d8f;" class="mx-1 white--text">草 {{com.laugh_count}}</v-btn>

        </div>
        </v-card-text>
      </v-card>

      </div>

    </v-container>
</template>

<script>
import Methods from "../../api/method.js";
import {credit,point,difficulty,recommendation,evaluation} from "../../api/GlobalData.js";
export default {
  name: "Course",
  data() {
    return {
      name_1:'',
      name_others:[],
      course: {
      },
      credit_index : 1,
      point_index : 1,
      // quality_index : 10,
      difficulty_index : 1,
      recommendation_index : 1,
      // professor_score_index : 0,
      error:false,
      // evaluation:["出席 ","期末試験 ","レポート ","発表 ","小テスト・中間試験 ","テスト時の持ち込みは可能 "],
      evaluation:evaluation,
      point:point,
      difficulty:difficulty,
      recommendation:recommendation,
      credit:credit,
      panel:0,
      good_click:[],
      laugh_click:[],
      note_exists:false,
      comment_exists:false
    };
  },


  created() {
    this.getData();
  },

  methods: {
    async getData() {
      let courses_data = await Methods.getCoursesData(this.$route.params.id);
      // console.log(courses_data.data);
      let max_scorer = Math.max(...courses_data.data.selected_evaluation);
      /*最大票数選択肢の半分の票数を得てない選択肢を０にする*/ 
      courses_data.data.selected_evaluation.forEach(function(ele, index, theArray) {
        if(ele < max_scorer/2){
          theArray[index] = 0;
        }
      });

      var temp_eval = [];
      for (let i = 0; i < 7; i++){
        if(courses_data.data.selected_evaluation[i] != 0){
          temp_eval.push(i);
        }
      }
      this.course = courses_data.data;

      this.course.selected_evaluation = temp_eval;

      /**********************************************/ 

      if(this.course.notes.length){this.note_exists=true;}
      if(this.course.comment.length){this.comment_exists=true;}
      this.name_1 = this.course.course_names[0].text;
      let temp_length = this.course.course_names.length;

      this.course.notes=this.course.notes.filter(note=>note.active==true);
      if(temp_length >1){
        this.course.course_names.slice(1,temp_length).forEach((ele)=>{
          // console.log(ele.text);
          this.name_others.push(ele.text);
        });
      }

      if(Math.max(...this.course.credit) != 0){
        this.credit_index = this.course.credit.indexOf(Math.max(...this.course.credit))+1;
      }
      if(Math.max(...this.course.point) != 0){
        this.point_index = this.course.point.indexOf(Math.max(...this.course.point))+1;
      }
      if(Math.max(...this.course.difficulty) != 0){
        this.difficulty_index = this.course.difficulty.indexOf(Math.max(...this.course.difficulty))+1;
      }
      if(Math.max(...this.course.recommendation) != 0){
        this.recommendation_index = this.course.recommendation.indexOf(Math.max(...this.course.recommendation))+1;
      }

      // this.quality_index = this.course.quality.indexOf(Math.max(...this.course.quality));


      // this.professor_score_index = this.course.professor_score.indexOf(Math.max(...this.course.professor_score));

      for(var i =0; i<this.course.comment.length; i++){
        this.good_click.push(false);
        this.laugh_click.push(false);
      }

      if(this.course == null){
        this.error = true;
      }

    },
  good_clicked(index){
    this.good_click[index]=true;
    this.course.comment[index].good_count += 1;
    Methods.buttonClicked({
      id:this.course._id,
      user:this.$store.state.user_id,
      comment_id:this.course.comment[index]._id,
      good_or_laugh:1,
      increment:1
    });
  },
  good_unclicked(index){
    this.good_click[index]=false;
    this.course.comment[index].good_count -= 1;
    Methods.buttonClicked({
      id:this.course._id,
      user:this.$store.state.user_id,
      comment_id:this.course.comment[index]._id,
      good_or_laugh:1,
      increment:-1
    });
  },
  laugh_clicked(index){
    this.laugh_click[index]=true;
    this.course.comment[index].laugh_count += 1;
    Methods.buttonClicked({
      id:this.course._id,
      user:this.$store.state.user_id,
      comment_id:this.course.comment[index]._id,
      good_or_laugh:2,
      increment:1
    });
  },
  laugh_unclicked(index){
    this.laugh_click[index]=false;
    this.course.comment[index].laugh_count -= 1;
    Methods.buttonClicked({
      id:this.course._id,
      user:this.$store.state.user_id,
      comment_id:this.course.comment[index]._id,
      good_or_laugh:2,
      increment:-1
    });
  }

  },
};
</script>

<style scoped>
.v-select{
  font-size: 13px;
}

</style>