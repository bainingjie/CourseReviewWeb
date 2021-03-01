<template>
    <v-container class="mx-1 mx-1 my_font">
<!--       <p>{{course.university}}</p>
      <p>{{course.course_name}}</p>
      <p>{{course.lecturer}}</p> -->

<!--       <v-card
        elevation="8"
        outlined
        v-for="com in course.comment"
        :key = "com"
      > -->
<!--         <v-card-text> -->
          
          <h3>{{course.course_name[0]}}</h3>

          <span>高前田</span><br/>
          <p class=".text-caption">{{course.university}}</p>
          <v-label>評価方法: </v-label>
          <span v-for="(eva,index) in evaluation" :key = "eva">
    <!--         {{eva}},{{index}} -->
            <span v-if="course.selected_evaluation[index]">{{eva}}</span>
          </span>
          <!-- <span v-if="!course.selected_evaluation[5]">持ち込み不可</span> -->
          <br/>
<!--           <span>*****星をつけたいね*****</span><br/>
          <v-label>単位期待 : </v-label>
          <span v-if="credit_index<4">{{credit[credit_index].text}}</span>
          <span v-else>---</span>
          <br/> -->
          <v-label>得点期待 : </v-label>
          <span v-if="point_index<4">{{point[point_index].text}}</span>
          <span v-else>---</span>
          <br/>
<!--           <v-label>充実さ : </v-label>
          <span>{{quality[quality_index].text}}</span>
          <br/> -->
          <v-label>講義の難易度 : </v-label>
          <span>{{difficulty[difficulty_index].text}}</span>
          <br/>
<!--           <v-label>教員の評価 : </v-label>
          <span>{{professor_score_items[professor_score_index].text}}</span>
          <br/> -->
          <v-label>総合推奨度 : </v-label>
          <span>{{recommendation[recommendation_index].text}}</span>
<!--         </v-card-text> -->
<!--       </v-card> -->


      <br/>
      <br/>
      <h3>labels:</h3>
      <v-expansion-panels focusable v-model="panel">
        <v-expansion-panel class="mb-1" >
          <v-expansion-panel-header style="background:#2a9d8f;color:white" >ここが良い！</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-chip-group
              column
              multiple>
            <v-chip
              v-for="f_g in fetched_goods"
              :key = "f_g"
              style="background:#2a9d8f;color:white"
            >{{f_g}}</v-chip>
            </v-chip-group>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="mb-1">
          <v-expansion-panel-header style="background:#e76f51;color:white">ここがダメ！</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-chip-group
              column
              multiple>
            <v-chip
              v-for="f_g in fetched_bads"
              :key = "f_g"
              style="background:#e76f51;color:white"
            >{{f_g}}</v-chip>
            </v-chip-group>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="mb-1">
          <v-expansion-panel-header style="background:#e76f51;color:white" >ここを気をつけよう！</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-chip-group
              column
              multiple>
            <v-chip
              v-for="f_g in fetched_advices"
              :key = "f_g"
              style="background:#e76f51;color:white"
            >{{f_g}}</v-chip>
            </v-chip-group>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header style="background:#2a9d8f;color:white">どうでも良いこと</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-chip-group
              column
              multiple>
            <v-chip
              v-for="f_g in fetched_others"
              :key = "f_g"
              style="background:#2a9d8f;color:white"
            >{{f_g}}</v-chip>
            </v-chip-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <br/>
      <br/>
      <h3>comment:</h3>
      <v-card
        elevation="8"
        outlined
        shaped
        v-for="com in course.comment"
        :key = "com"
      >
        <v-card-title>title</v-card-title>
        <v-card-subtitle>{{com.date}}</v-card-subtitle>
        <v-card-text>{{com.text}} buttons</v-card-text>
      </v-card>

    </v-container>
</template>

<script>
import Methods from "../../api/method.js";
import {point,difficulty,recommendation} from "../../api/GlobalData.js";
export default {
  name: "Questionary",
  data() {
    return {
      course: {
        selected_evaluation:[0,0,0,0,0,0],
        comment:[]
      },
      credit_index : 0,
      point_index : 0,
      quality_index : 0,
      difficulty_index : 0,
      recommendation_index : 0,
      professor_score_index : 0,
      error:false,
      evaluation:["出席 ","期末試験 ","レポート ","発表 ","小テスト・中間試験 ","テスト時の持ち込みは可能 "],
      point:point,
      difficulty:difficulty,
      recommendation:recommendation

      panel:0,
      fetched_goods:["イケボ","フィードバックが丁寧","睡眠や内職を咎めない","質問に対して丁寧","メールを送れば欠席を許してくれる"],
      fetched_bads:["時間管理がガバガバ","やる気がない","小テスト難しい"],
      fetched_others:["初恋の人に似てる","学生のモチベの低さに理解がある","名大出身とかなんとか","長男が誕生した","ガラケー"],
      fetched_advices:["周囲と協力して戦え","授業は出た方がいい、後で気づいた","スライドは結構な分量になるので試験前日に詰め込もうとするとわりかししんどい"],
      test:0,
      good_field:'',
      bad_field:'',
      other_field:'',
      advice_field:'',
      departments:["前期教養学部","その他"],
      subdepartments:["理科一類","文科一類","理科二類","文科二類","理科三類","文科三類"],
      classes:[],
      selected_goods:[0,1],
      selected_bads:[0,1],
      selected_others:[0,1],
      selected_advices:[0,1],
    };
  },


  created() {
    this.getData();
  },

  methods: {
    async getData() {
      let courses_data = await Methods.getCoursesData(this.$route.params.id);
      console.log(courses_data.data);
      // courses_data.data.selected_evaluation = [4,5,3,7,8,10];
      let max_scorer = Math.max(...courses_data.data.selected_evaluation);
      courses_data.data.selected_evaluation.forEach(function(ele, index, theArray) {
        if(ele < max_scorer/2){
          theArray[index] = 0;
        }
      });

      /**********************************************/ 
      this.course = courses_data.data;
      // this.credit_index = this.course.credit.indexOf(Math.max(...this.course.credit));
      this.point_index = this.course.point.indexOf(Math.max(...this.course.point));
      // this.quality_index = this.course.quality.indexOf(Math.max(...this.course.quality));
      this.difficulty_index = this.course.difficulty.indexOf(Math.max(...this.course.difficulty));
      this.recommendation_index = this.course.recommendation.indexOf(Math.max(...this.course.recommendation));
      // this.professor_score_index = this.course.professor_score.indexOf(Math.max(...this.course.professor_score));


      if(this.course == null){
        this.error = true;
      }
    },


  },
};
</script>

<style scoped>
.v-select{
  font-size: 13px;
}

</style>