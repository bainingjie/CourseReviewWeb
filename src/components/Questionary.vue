<template>
  <form>
    <v-container class="mx-0 pa-2" fluid>
        <h2 class="mb-1">{{course.course_names[0].text}}</h2>
        <span   v-for="lecturer in course.lecturer_ids" :key="lecturer.kanji_alphabet">{{lecturer.kanji_alphabet}} </span><br/>
      <br/>
      <v-card elevation="4"  class="mb-4 pa-2 pb-1"  outlined>
      <h3 class="">
        1.ぶっちゃけ
      </h3>
      <h2 class="caption grey--text">(1問目/6問)</h2>
      <br/>
      <!-- <v-container> -->

<!--             <v-select
              v-model = "course.credit"
              :items="credit"
              filled
              label="単位期待"
            ></v-select> -->
            <v-select
              v-model="know_grade"
              :items="know_grade_texts"
            ></v-select>

            <v-label v-if="know_grade">単位期待:</v-label>

            <span class="mx-2" v-if="know_grade">{{credit[course.credit-1]}}</span>
            <v-rating v-if="know_grade"
              v-model="course.credit"
              background-color="orange lighten-3"
              color="orange"
              length="4"
              size="16"
              class="my-0"
            ></v-rating>

            <v-label v-if="know_grade">得点期待:</v-label>
            <span class="mx-2" v-if="know_grade">{{point[course.point-1]}}</span>
            <v-rating
              v-model="course.point"
              background-color="orange lighten-3"
              color="orange"
              length="4"
              size="16"
              class="mb-0"
              v-if="know_grade"
            ></v-rating>


            <v-label>講義の難易度:</v-label>
            <span class="mx-2">{{difficulty[course.difficulty-1]}}</span>
            <v-rating
              v-model="course.difficulty"
              background-color="orange lighten-3"
              color="orange"
              length="4"
              size="16"
              class="mb-0"
            ></v-rating>


            <v-label>講義の総合評価:</v-label>
            <span class="mx-2">{{recommendation[course.recommendation-1]}}</span>
            <v-rating
              v-model="course.recommendation"
              background-color="orange lighten-3"
              color="orange"
              length="4"
              size="16"
              class="mb-0"
            ></v-rating>
      <!-- </v-container> -->
    </v-card>
    <v-card elevation="4"  class="mb-4 pa-2 pb-1"  outlined>
      <h3 class="">
        2.評価方法 
      </h3>
      
      
      <span class=" caption grey--text">(2問目/{{question_count}}問)</span>

      <div class="mt-3" >
      <span class="red--text" style="font-size: 13px">---------- 押して選択する ---------  </span>
      </div>
      


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
    </v-card>
    <v-card elevation="4"  class="mb-4 pa-2 pb-1"   outlined>
      <h3 >
        3.ここが良い！
      </h3>
      <span class=" caption grey--text">(3問目/{{question_count}}問)</span>
      <div class="mt-3" >
      <span class="red--text" style="font-size: 13px">---------- step1. 押して選択する ---------  </span>
      </div>
      <v-chip-group
        v-model="selected_goods"
        column
        multiple>
      <v-chip
        v-for="(f_g,index) in fetched_goods"
        filter
        :key = "index"
        outlined
      >{{f_g.text}}</v-chip>
      </v-chip-group>
      <div class="mt-6" >

      <span class="red--text" style="font-size: 13px">---------- step2. 新しいタグを書き込む ---------  </span>
      </div>
      <v-text-field
        label="良い点タグを追加"
        hide-details="auto"
        append-icon="mdi-plus-circle"
        @click:append="add_good"
        v-model="good_field"
        counter
        maxlength="23"
        >
      </v-text-field> 
      <p v-if="good_field !=''" style="color:red;"> 注意: 追加ボタンかenterを押して追加する</p>
      <br/>
    </v-card>
    <v-card elevation="4"  class="mb-4 pa-2 pb-1"   outlined>
      <h3 >
        4.ここがダメ！
      </h3>
      <h2 class="caption grey--text">(4問目/{{question_count}}問)</h2>
      <div class="mt-3" >
      <span class="red--text" style="font-size: 13px">---------- step1. 押して選択する ---------  </span>
      </div>
      <v-chip-group
        v-model="selected_bads"
        column
        multiple>
      <v-chip
        v-for="(f_b,index) in fetched_bads"
        filter
        :key = "index"
        outlined
      >{{f_b.text}}</v-chip>
      </v-chip-group>
      <div class="mt-6" >
      <span class="red--text" style="font-size: 13px">---------- step2. 新しいタグを書き込む ---------  </span>
      </div>
      <v-text-field
        label="悪い点タグを追加"
        hide-details="auto"
        append-icon="mdi-plus-circle"
        @click:append="add_bad"
        v-model="bad_field"
        counter
        maxlength="23"
        >
      </v-text-field> 


      <p v-if="bad_field !=''" style="color:red;"> 注意: 追加ボタンかenterを押して追加する</p>
      <br/>
    </v-card>
    <v-card elevation="4"  class="mb-4 pa-2 pb-1"   outlined>
      <h3 >
        5.ここを気をつけよう！
      </h3>
      <h2 class="caption grey--text">(5問目/{{question_count}}問)</h2>
      <div class="mt-3" >
      <span class="red--text" style="font-size: 13px">---------- step1. 押して選択する ---------  </span>
      </div>

      <v-chip-group
        v-model="selected_advices"
        column
        multiple>
      <v-chip
        v-for="(f_a,index) in fetched_advices"
        filter
        :key = "index"
        outlined
      >{{f_a.text}}</v-chip>
      </v-chip-group>
      <div class="mt-6" >
      <span class="red--text" style="font-size: 13px">---------- step2. 新しいタグを書き込む ---------  </span>
      </div>
      <v-text-field
        label="気を付ける点タグを追加"
        hide-details="auto"
        append-icon="mdi-plus-circle"
        @click:append="add_advice"
        v-model="advice_field"
        counter
        maxlength="23"
        >
      </v-text-field> 

      <p v-if="advice_field !=''" style="color:red;font-size: 13px"> 注意: 追加ボタンかenterを押して追加する</p>
      <br/>
    </v-card>

    <!-- <p>this.fetched_advices[this.selected_advices[i]].text</p> -->
    <v-card elevation="4"  class="mb-4 pa-2 pb-1"    outlined>
      <h3>コメント(任意)</h3>
        <v-text-field
          v-model="course.comment.title"
          filled
          placeholder="タイトル"
          auto-grow
          counter
          maxlength="20"
        ></v-text-field>     
        <v-textarea
          v-model="course.comment.text"
          filled
          placeholder="アドバイス、面白いエピソード、内容の振り返り、武勇伝..."
          auto-grow
          counter
          maxlength="1000"
        ></v-textarea>
      <br/>
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
import {credit,point,difficulty,recommendation,evaluation} from "../../api/GlobalData.js";
export default {
  name: "Questionary",
  data() {
    return {
      // rules:{select: [(v) =>  v.length>0 || "Item is required"]},
      question_count:6,
      fetched_document:[],
      course: {
                university:'',
                course_names:[{text:''}],
                lecturer:[],
                user:'',

                selected_evaluation:[],
                credit:1,
                point:1,
                // quality:-1,
                difficulty:1,
                recommendation:1,
                comment:{title:'',text:''},
                message_to_me:'review submitted',
                selected_good_texts:[],
                selected_bad_texts:[],
                selected_advice_texts:[],
                // professor_score:-1,
      },
      know_grade:1,
      know_grade_texts:[{text:"成績は既に出てる",value:1},{text:"成績はまだ出てない",value:0}],
      error:false,
      fetched_goods:[{text:"イケボ"},{text:"フィードバックが丁寧",count:0},{text:"睡眠や内職を咎めない",count:0},{text:"質問に対して丁寧",count:0}],
      fetched_bads:[{text:"時間管理がガバガバ",count:0},{text:"やる気がない",count:0},{text:"小テスト難しい",count:0}],
      fetched_advices:[{text:"周囲と協力して戦え",count:0},{text:"授業は出た方がいい、後で気づいた",count:0}],
      test:0,
      good_field:'',
      bad_field:'',
      other_field:'',
      advice_field:'',
      selected_goods:[],
      selected_bads:[],
      selected_advices:[],
      credit:credit,
      point:point,
      difficulty:difficulty,
      recommendation:recommendation,
      evaluation:evaluation
    };
  },


  created() {
    this.getData();
    /* fill 40 classes*/ 
    // var class_start = 1;
    // var class_end = 40;
    // for (var i = class_start; i < class_end+1; i++) {
    //     this.classes.push(i.toString());
    // }

  },

  methods: {
    async getData() {
      /* 新しいtagが追加された可能性があるため、もう一度請求*/ 

      let courses_data = await Methods.getCoursesDataQuestionary(this.$route.params.id);

      let max_scorer = Math.max(...courses_data.data.selected_evaluation);
      /*最大票数選択肢の半分の票数を得てない選択肢を０にする*/ 
      courses_data.data.selected_evaluation.forEach(function(ele, index, theArray) {
        if(ele <= max_scorer/2){
          theArray[index] = 0;
        }else{
          theArray[index] = 1;
        }
      });

      this.course = courses_data.data;

      this.course.credit = 2;
      this.course.difficulty =2;
      this.course.recommendation = 2;
      this.course.point = 2;
      // console.log(this.course.selected_evaluation);
      var temp_eval = [];
      for (let i = 0; i < 7; i++){
        if(courses_data.data.selected_evaluation[i] != 0){
          temp_eval.push(i);
        }
      }

      this.course.selected_evaluation = temp_eval;

      for(let i =0; i<this.fetched_goods.length; i++){
        let index = this.course.good_tags.findIndex((ele)=>ele.text == this.fetched_goods[i].text);
        if(index == -1){
          this.course.good_tags.push(this.fetched_goods[i]);
        }
      }
      this.fetched_goods=this.course.good_tags;

      for(let i =0; i<this.fetched_bads.length; i++){
        let index = this.course.bad_tags.findIndex((ele)=>ele.text == this.fetched_bads[i].text);
        if(index == -1){
          this.course.bad_tags.push(this.fetched_bads[i]);
        }
      }
      this.fetched_bads=this.course.bad_tags;

      for(let i =0; i<this.fetched_advices.length; i++){
        let index = this.course.advice_tags.findIndex((ele)=>ele.text == this.fetched_advices[i].text);
        if(index == -1){
          this.course.advice_tags.push(this.fetched_advices[i]);
        }
      }
      this.fetched_advices=this.course.advice_tags;


      // console.log(this.course.advice_tags);
      // console.log(this.course.selected_evaluation);

      this.course.selected_good_texts=[];
      this.course.selected_bad_texts=[];
      this.course.selected_advice_texts=[];
      this.course.comment={title:'',text:''};
      this.course.user=this.$store.state.user_id;
      // scorer:{department:'前期教養学部',subdepartment:'',class:'',year:1},
      this.course.message_to_me='';
    },

    add_good:function(){
      if(this.good_field!=''){
        this.fetched_goods.push({text:this.good_field,count:0});
        this.good_field='';
        this.selected_goods.push(this.fetched_goods.length-1);
      }
    },
    add_bad:function(){
      if(this.bad_field!=''){
        this.fetched_bads.push({text:this.bad_field});
        this.bad_field='';
        this.selected_bads.push(this.fetched_bads.length-1);
      }
    },
    add_advice:function(){
      if(this.advice_field!=''){
        this.fetched_advices.push({text:this.advice_field});
        this.advice_field='';
        this.selected_advices.push(this.fetched_advices.length-1);
      }
    },
    handleSubmit: async function(){
      for (let i =0;i<this.selected_goods.length;i++){
        // 最后只留下新加的text
        this.course.selected_good_texts.push(this.fetched_goods[this.selected_goods[i]].text);
      }
      for (let i =0;i<this.selected_bads.length;i++){
        // 最后只留下新加的text
        this.course.selected_bad_texts.push(this.fetched_bads[this.selected_bads[i]].text);
      }

      for (let i =0;i<this.selected_advices.length;i++){
        // 最后只留下新加的text
        this.course.selected_advice_texts.push(this.fetched_advices[this.selected_advices[i]].text);
      }
      // console.log(this.course)
      if(!this.know_grade){
        this.course.credit = 4;
        this.course.point = 4;
      }else{
        this.course.credit -= 1;
        this.course.point -= 1;
      }
        this.course.recommendation -= 1;
        this.course.difficulty -= 1;

      // console.log(this.course);
      await Methods.postCoursesData(this.$route.params.id,this.course);
      // console.log(result);
      this.$router.push('/course/'+this.$route.params.id);
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