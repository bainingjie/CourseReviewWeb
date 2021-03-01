<template>
  <form>
    <v-container class="mx-0">
      <v-text-field
        label="講義名"
        v-model="course.course_name[0]"
        hide-details="auto"
      ></v-text-field>

      <v-text-field
        label="講義名"
        v-model="course.course_name[1]"
        hide-details="auto"
      ></v-text-field>

      <v-text-field
        label="講義名"
        v-model="course.course_name[2]"
        hide-details="auto"
      ></v-text-field>

      <v-text-field
        label="教員1"
        v-model="course.lecturer[0]"
        hide-details="auto"
      ></v-text-field>

      <v-text-field
        label="教員2"
        v-model="course.lecturer[1]"
        hide-details="auto"
      ></v-text-field>

      <v-text-field
        label="教員3"
        v-model="course.lecturer[2]"
        hide-details="auto"
      ></v-text-field>

      <h3 class="">
        1.ぶっちゃけ
      </h3>
      <h2 class="caption grey--text">(1問目/6問)</h2>
      <br/>
      <!-- <v-container> -->
        <v-row >
          <v-col cols="6" md = "4" class="py-0" >
            <v-select
              v-model = "course.credit"
              :items="credit"
              filled
              label="単位期待"
            ></v-select>
          </v-col>
          <v-col cols="6" md = "4"  class="py-0">
            <v-select
              v-model = "course.point"
              :items="point"
              filled
              label="得点期待"
            ></v-select>
          </v-col>
<!--           <v-col cols="6" md = "4" class="py-0">
            <v-select
              v-model = "course.quality"
              :items="quality"
              filled
              label="充実さ"
            ></v-select>
          </v-col> -->
          <v-col cols="6" md = "4"  class="py-0">
            <v-select
              v-model = "course.difficulty"
              :items="difficulty"
              filled
              label="講義の難易度"
            ></v-select>
          </v-col>
<!--           <v-col cols="6" md = "4" class="py-0">
            <v-select
              v-model = "course.professor_score"
              :items="professor_score_items"
              filled
              label="教員を評価"
            ></v-select>
          </v-col> -->
          <v-col cols="6" md = "4" class="py-0">
            <v-select
              v-model = "course.recommendation"
              :items="recommendation"
              filled
              label="講義の総合評価"
            ></v-select>
          </v-col>
        </v-row>
      <!-- </v-container> -->

      <h3 class="">
        2.評価方法 
      </h3>
      <h2 class="caption grey--text">(2問目/6問)</h2>
      <v-chip-group
        v-model="course.selected_evaluation"
        column
        multiple>
        <v-chip
          v-for="cr in evaluation"
          filter
          :key = "cr"
          outlined
        >
          {{cr}}
        </v-chip>
      </v-chip-group>
      <br/>

      <h3 class=" green--text text--darken-2">
        3.ここが良い！
      </h3>
      <h2 class="caption grey--text">(3問目/6問)</h2>
      <v-chip-group
        v-model="selected_goods"
        column
        multiple>
      <v-chip
        v-for="f_g in fetched_goods"
        filter
        :key = "f_g.text"
        outlined
      >{{f_g.text}}</v-chip>
      </v-chip-group>
      <p>{{selected_goods}}</p>
      <v-text-field
        label="良い点タグを追加"
        hide-details="auto"
        append-icon="mdi-plus-circle"
        @click:append="add_good"
        v-model="good_field"
        counter
        maxlength="19"
        >
      </v-text-field> 
      <br/>

      <h3 class="deep-orange--text">
        4.ここがダメ！
      </h3>
      <h2 class="caption grey--text">(4問目/6問)</h2>
      <v-chip-group
        v-model="selected_bads"
        column
        multiple>
      <v-chip
        v-for="f_g in fetched_bads"
        filter
        :key = "f_g.text"
        outlined
      >{{f_g.text}}</v-chip>
      </v-chip-group>
      <v-text-field
        label="悪い点タグを追加"
        hide-details="auto"
        append-icon="mdi-plus-circle"
        @click:append="add_bad"
        v-model="bad_field"
        counter
        maxlength="19"
        >
      </v-text-field> 
      <br/>

      <h3 class="deep-orange--text">
        5.ここを気をつけよう！
      </h3>
      <h2 class="caption grey--text">(5問目/6問)</h2>
      <v-chip-group
        v-model="selected_advices"
        column
        multiple>
      <v-chip
        v-for="f_g in fetched_advices"
        filter
        :key = "f_g.text"
        outlined
      >{{f_g.text}}</v-chip>
      </v-chip-group>
      <v-text-field
        label="気を付ける点タグを追加"
        hide-details="auto"
        append-icon="mdi-plus-circle"
        @click:append="add_advice"
        v-model="advice_field"
        counter
        maxlength="19"
        >
      </v-text-field> 
      <br/>

      <h3 class="">
        6.どうでも良いこと 
      </h3>
      <h2 class="caption grey--text">(6問目/6問)</h2>
      <v-chip-group
        v-model="selected_others"
        column
        multiple>
      <v-chip
        v-for="f_g in fetched_others"
        filter
        :key = "f_g.text"
        outlined
      >{{f_g.text}}</v-chip>
      </v-chip-group>
      <v-text-field
        label="どうでも良い点タグを追加"
        hide-details="auto"
        append-icon="mdi-plus-circle"
        @click:append="add_other"
        v-model="other_field"
        counter
        maxlength="19"
        >
      </v-text-field> 
      <br/>

      <h3>コメント(任意)</h3>
        <v-textarea

          filled
          placeholder="アドバイス、面白いエピソード、内容の振り返り、武勇伝..."
          auto-grow
          value=""
          counter
          maxlength="1000"
        ></v-textarea>
      <br/>

      <v-card-actions class="justify-center">

        <v-btn @click="handleSubmit" color="primary"> submit </v-btn>
      </v-card-actions>
<!--       <p>  {{classes}}</p> -->
    </v-container>
  </form>
</template>

<script>
import Methods from "../../api/method.js";
import {credit,point,difficulty,recommendation,evaluation} from "../../api/GlobalData.js";
export default {
  name: "AddCourse",
  data() {
    return {
      // rules:{select: [(v) =>  v.length>0 || "Item is required"]},
      fetched_document:[],
      course: {
                university:'東京大学',
                course_name:[" "," "," "],
                lecturer:[" "," "," "],
                user:'haku',

                selected_evaluation:[],

                credit:-1,
                point:-1,
                // quality:-1,
                difficulty:-1,
                recommendation:-1,
                // professor_score:-1,

                selected_good_texts:[],
                selected_bad_texts:[],
                selected_others_texts:[],
                selected_advice_texts:[],
                comment:'',
                scorer:{department:'前期教養学部',subdepartment:'',class:'',year:1},
                message_to_me:'',
            },
      error:false,
      fetched_goods:[{text:"イケボ",count:0},{text:"フィードバックが丁寧",count:0},{text:"睡眠や内職を咎めない",count:0},{text:"質問に対して丁寧",count:0}],
      fetched_bads:[{text:"時間管理がガバガバ",count:0},{text:"やる気がない",count:0},{text:"小テスト難しい",count:0}],
      fetched_others:[{text:"学生のモチベの低さに理解がある",count:0},{text:"名大出身とかなんとか",count:0},{text:"長男が誕生した",count:0},{text:"ガラケー",count:0},{text:"初恋の人に似てる",count:0}],
      fetched_advices:[{text:"周囲と協力して戦え",count:0},{text:"授業は出た方がいい、後で気づいた",count:0}],
      test:0,
      good_field:'',
      bad_field:'',
      other_field:'',
      advice_field:'',
      // departments:["前期教養学部","その他"],
      // subdepartments:["理科一類","文科一類","理科二類","文科二類","理科三類","文科三類"],
      // classes:[],
      selected_goods:[],
      selected_bads:[],
      selected_others:[],
      selected_advices:[],
      credit:credit,
      point:point,
      difficulty:difficulty,
      recommendation:recommendation,
      evaluation:evaluation
    };
  },


  created() {
    // this.getData();

    /* fill 40 classes*/ 
    // var class_start = 1;
    // var class_end = 40;
    // for (var i = class_start; i < class_end+1; i++) {
    //     this.classes.push(i.toString());
    // }

  },

  methods: {

    add_good:function(){
      this.fetched_goods.push({text:this.good_field,count:0});
      this.good_field='';
      this.selected_goods.push(this.fetched_goods.length-1);
    },
    add_bad:function(){
      this.fetched_bads.push({text:this.bad_field});
      this.bad_field='';
      this.selected_bads.push(this.fetched_bads.length-1);
    },
    add_other:function(){
      this.fetched_others.push({text:this.other_field});
      this.other_field='';
      this.selected_others.push(this.fetched_others.length-1);
    },
    add_advice:function(){
      this.fetched_advices.push({text:this.advice_field});
      this.advice_field='';
      this.selected_advices.push(this.fetched_advices.length-1);
    },
    handleSubmit:function(){
      for (let i =0;i<this.selected_goods.length;i++){
        // 最后只留下新加的text
        this.course.selected_good_texts.push(this.fetched_goods[i].text);
      }
      for (let i =0;i<this.selected_bads.length;i++){
        // 最后只留下新加的text
        this.course.selected_bad_texts.push(this.fetched_bads[i].text);
      }
      for (let i =0;i<this.selected_others.length;i++){
        // 最后只留下新加的text
        this.course.selected_others_texts.push(this.fetched_others[i].text);
      }
      for (let i =0;i<this.selected_advices.length;i++){
        // 最后只留下新加的text
        this.course.selected_advice_texts.push(this.fetched_advices[i].text);
      }
      // console.log(this.course.lecturer);
      // for (var i = 0; i<3;i++){
      //   console.log(this.course.lecturer[i]);
      //   if(this.course.lecturer[i].length == 0){
      //     this.course.lecturer.splice(i,1);
      //   }
      //   if(this.course.course_name[i].length == 0){
      //     this.course.course_name.splice(i,1);
      //   }        
      // }
      this.course.lecturer=[this.course.lecturer[0]];
      this.course.course_name=[this.course.course_name[0]];
      Methods.addCourse(this.course);
    }

    // submit: add value and update record
    // manipulate evaluation

  },
};
</script>

<style scoped>
.v-select{
  font-size: 13px;
}

</style>