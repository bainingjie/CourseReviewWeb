<template>
  <form>
    <v-container class="mx-0 pa-2" fluid>
        <h2 class="mb-1">{{course.course_name[0]}}</h2>
        <span   v-for="lecturer in course.lecturer" :key="lecturer">{{lecturer}} </span><br/>
<!--     <span>科目群：検索用 (種類：語学  共通(一般教養)  専門科目  ゼミ/演習  そのほか)</span> -->
      <br/>
      <v-card elevation="4"  class="mb-4 pa-2 pb-1"  outlined>
      <h3 class="">
        1.ぶっちゃけ
      </h3>
      <h2 class="caption grey--text">(1問目/6問)</h2>
      <br/>
      <!-- <v-container> -->
        <v-row >
          <v-col cols="6" md = "3" class="py-0" >
            <v-select
              v-model = "course.credit"
              :items="credit"
              filled
              label="単位期待"
            ></v-select>
          </v-col>
          <v-col cols="6" md = "3"  class="py-0">
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
          <v-col cols="6" md = "3"  class="py-0">
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
          <v-col cols="6" md = "3" class="py-0">
            <v-select
              v-model = "course.recommendation"
              :items="recommendation"
              filled
              label="講義の総合評価"
            ></v-select>
          </v-col>
        </v-row>
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
        @keydown.enter = "add_good()"
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
        @keydown.enter = "add_bad()"
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
        v-for="f_a in fetched_advices"
        filter
        :key = "f_a.text"
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
        @keydown.enter = "add_advice()"
        v-model="advice_field"
        counter
        maxlength="23"
        >
      </v-text-field> 

      <p v-if="advice_field !=''" style="color:red;font-size: 13px"> 注意: 追加ボタンかenterを押して追加する</p>
      <br/>
    </v-card>
    <v-card elevation="4"  class="mb-4 pa-2 pb-1"   outlined>
      <h3 class="">
        6.どうでも良いこと 
      </h3>
      <h2 class="caption grey--text">(6問目/{{question_count}}問)</h2>
      <span class="red--text" style="font-size: 13px">---------- step1. 押して選択する ---------  </span>
      <v-chip-group
        v-model="selected_others"
        column
        multiple>
      <v-chip
        v-for="f_o in fetched_others"
        filter
        :key = "f_o.text"
        outlined
      >{{f_o.text}}</v-chip>
      </v-chip-group>
      <div class="mt-6" >
      <span class="red--text" style="font-size: 13px">---------- step2. 新しいタグを書き込む ---------  </span>
      </div>
      <v-text-field
        label="どうでも良い点タグを追加"
        hide-details="auto"
        append-icon="mdi-plus-circle"
        @click:append="add_other"
        @keydown.enter = "add_other()"
        v-model="other_field"
        counter
        maxlength="23"
        >
      </v-text-field> 
      <p v-if="other_field !=''" style="color:red;"> 注意: 追加ボタンかenterを押して追加する</p>
      <br/>
    </v-card>
    <v-card elevation="4"  class="mb-4 pa-2 pb-1"    outlined>
      <h3>コメント(任意)</h3>
        <v-textarea
          v-model="course.comment"
          filled
          placeholder="アドバイス、面白いエピソード、内容の振り返り、武勇伝..."
          auto-grow
          value=""
          counter
          maxlength="1000"
        ></v-textarea>
      <br/>
    </v-card>
    <v-card elevation="4"  class="mb-4 pa-2 pb-1"    outlined>
      <h3>管理人への一言（任意）</h3>
      <v-textarea
        v-model="course.message_to_me"
        filled
        placeholder="教員名が違う、講義名が検索しにくい、恋愛相談..."
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
                course_name:'',
                lecturer:[],
                user:'haku',

                selected_evaluation:[],

                credit:-1,
                point:-1,
                // quality:-1,
                difficulty:-1,
                recommendation:-1
                // professor_score:-1,
      },
      error:false,
      fetched_goods:[{text:"イケボ"},{text:"フィードバックが丁寧",count:0},{text:"睡眠や内職を咎めない",count:0},{text:"質問に対して丁寧",count:0}],
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
      // console.log(this.course.selected_evaluation);
      var temp_eval = [];
      for (let i = 0; i < 6; i++){
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

      for(let i =0; i<this.fetched_others.length; i++){
        let index = this.course.others_tags.findIndex((ele)=>ele.text == this.fetched_others[i].text);
        if(index == -1){
          this.course.others_tags.push(this.fetched_others[i]);
        }
      }
      this.fetched_others=this.course.others_tags;

      // console.log(this.course.advice_tags);
      // console.log(this.course.selected_evaluation);

      this.course.selected_good_texts=[];
      this.course.selected_bad_texts=[];
      this.course.selected_others_texts=[];
      this.course.selected_advice_texts=[];
      this.course.comment='';
      this.course.user='';
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
    add_other:function(){
      if(this.other_field!=''){
        this.fetched_others.push({text:this.other_field});
        this.other_field='';
        this.selected_others.push(this.fetched_others.length-1);
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
      for (let i =0;i<this.selected_others.length;i++){
        // 最后只留下新加的text
        this.course.selected_others_texts.push(this.fetched_others[this.selected_others[i]].text);
      }
      for (let i =0;i<this.selected_advices.length;i++){
        // 最后只留下新加的text
        this.course.selected_advice_texts.push(this.fetched_advices[this.selected_advices[i]].text);
      }
      // console.log(this.course)
      let result = await Methods.postCoursesData(this.$route.params.id,this.course);
      console.log(result);
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