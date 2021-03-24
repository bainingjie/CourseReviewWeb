<template>
    <v-container class="mx-1 my_font">
        <br/>
        <h1 class="text-center ">Cryrin</h1><br/>
        <h4 class="text-center">学生のための</h4>
        <h4 class="text-center">学生による教員の成績表</h4>
        <br/>

<!--           <v-text-field
            label="大学"
            v-model="search_object.search_university"
            style = "width:150px;"
          ></v-text-field> -->

        <v-card class = "mx-0">
            <v-tabs
              v-model="tab"
              align-with-title
              background-color ="primary"
              dark
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab >教員名から検索</v-tab>
              <v-tab >授業名から検索</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" >
              <v-tab-item class="mt-3 px-3">
                  <v-text-field
                    clearable
                    label="例）煉獄/杏寿郎/煉獄杏寿郎"
                    prepend-icon="mdi-account-search-outline"
                    v-model="search_object.search_lecturer_name"
                    @keyup.enter="search_lecturer()"

                  ></v-text-field>
                <v-card v-for="lecturer in fetched_lecturers" :key="lecturer._id" class="ma-2">
                    <v-card-title>{{lecturer.kanji_alphabet}}</v-card-title>
                      <v-card-text><v-chip
                        v-for="(lecture,index) in lecturer.courses_id"
                        :key = "index"
                        :href="'/#/course/' + lecturer._id"
                      >{{lecture.course_names[0].text}}</v-chip></v-card-text>

<!--                     <span v-for="lecture in lecturer.courses_name" :key="lecture">{{lecture}}</span><br/> -->
                </v-card>
              </v-tab-item>

              <v-tab-item class="mt-3 px-3">
                  <v-text-field
                    label="例）鬼滅/概論/鬼滅の刃概論"
                    prepend-icon="mdi-book-search-outline "
                    v-model="search_object.search_course_name"
                    @keyup.enter="search_course_name()"
                    clearable
                  ></v-text-field>
                <v-card v-for="lecture in fetched_lectures" :key="lecture._id" class="mb-2" outlined :href="'/#/course/' + lecture._id">
                    <v-card-title>{{lecture.course_names[0].text}}</v-card-title>
                    <v-card-subtitle>
                    <span v-for="lecturer in lecture.lecturer_ids" :key="lecturer._id">{{lecturer.kanji_alphabet}} </span>
                    </v-card-subtitle>
                    <v-card-text>
                    総合評価:
                    <span v-if="Math.max(...lecture.recommendation) != 0">{{recommendation[lecture.recommendation.indexOf(Math.max(...lecture.recommendation))].text}}</span>
                    <span v-else> -- </span>
                    <br/>
                    得点期待:<span v-if="Math.max(...lecture.point) != 0 && Math.max(...lecture.point)<4">{{point[lecture.point.indexOf(Math.max(...lecture.point))].text}}</span>
                    <span v-else> -- </span>
                    <br/>
                    </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
        </v-card>

    </v-container>
</template>


<script>
import Methods from "../../api/method.js";
import {point,difficulty,recommendation} from "../../api/GlobalData.js";
export default {
    name: 'Home',
    data: () => ({
        search_object:{
            search_course_name:'',
            search_lecturer_name:'',
            search_university:'東京大学'

        },
        fetched_lectures:[],
        fetched_lecturers:[],
        tab:null,
        point:point,
        difficulty:difficulty,
        recommendation:recommendation
    }),
    methods:{
        async search_lecturer(){
            // console.log(this.lecturer_name_obj);
            var lecturers = await Methods.searchByLecturer(this.search_object);
            this.fetched_lecturers = lecturers.data
            console.log(lecturers.data);
        },
        async search_course_name(){
            var lectures = await Methods.searchByClass(this.search_object);
            this.fetched_lectures = lectures.data;
            console.log(lectures.data);
        },
    },
    created() {
      // this.getData();
    }
}

</script>

<style>
.my_font{
    font-family: 'Arial','ヒラギノ明朝 ProN','Hiragino Mincho ProN',sans-serif;
}
</style>