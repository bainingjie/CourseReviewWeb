<template>
    <v-container class="mx-1 my_font">
        <br/>
        <h1 class="text-center ">Cryrin</h1><br/>
        <h4 class="text-center">東大生の</h4>
        <h4 class="text-center">履修登録＆授業内容を</h4>
        <h4 class="text-center">サポート</h4>
        <br/>

        <h2 >1.このサイトで提供するもの</h2>
        <v-divider></v-divider>
        <h4>講義に関する本質情報、過去問の解説、</h4>
        <h4>厳選された試験対策ノートなどを随時更新中</h4>
<!--         <p>利用規約へのurl</p> -->

        <br/>
        <h2>2.現時点で提供しているもの</h2>
        <v-divider></v-divider>
        <h4>毎年Sセメに受講者が最も多い総合科目から厳選した講義</h4>
        <br/>
        
        <div v-for="(course_type,type_index) in course_by_type" :key="type_index" class="my-2">
            <v-btn class="primary" dark style="font-weight: bold;">{{types[type_index]}}</v-btn>
            <v-card v-for="(course,course_index) in course_type" :key="course_index" class="my-2" outlined shaped elevation="3">
                <v-card-title>{{course[0].course_name}}</v-card-title>
                <v-card-subtitle class="mt-1 text-caption">
                    下記の講師から一人をクリックすると、その講師による講義ページに遷移します。
                </v-card-subtitle>
                <v-card-text>
                    <v-chip
                        v-for="(unit_course,index) in course"
                        :key = "index"
                        :href="'/course/' + unit_course.id"
                        class="mx-1"
                      >{{unit_course.lecturer_name}}</v-chip>
    <!--             総合評価:
                <span v-if="Math.max(...lecture.recommendation) != 0">{{recommendation[lecture.recommendation.indexOf(Math.max(...lecture.recommendation))].text}}</span>
                <span v-else> -- </span>
                <br/>
                得点期待:<span v-if="Math.max(...lecture.point) != 0 && Math.max(...lecture.point)<4">{{point[lecture.point.indexOf(Math.max(...lecture.point))].text}}</span>
                <span v-else> -- </span>
                <br/> -->
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>


<script>
import Methods from "../../api/method.js";

export default {
    name: 'Home',
    data: () => ({
        course_types:[],
        course_names:[],
        // ele: [{_id,lectuer}]
        courses:[],
        // [[総合Aのとある名前の授業s],[総合Aの同じ名前の講義集合]]
        course_by_type:[[],[],[],[],[],[]],
        types:["総合科目A","総合科目B","総合科目C","総合科目D","総合科目E","総合科目F"]
    }),
    methods:{
        async getCourses(){
            let index;
            let response= await Methods.getCourses();
            console.log(response.data);
            response.data.forEach((course)=>{
                index = this.course_names.indexOf(course.course_names[0].text);
                if(index == -1){
                    this.course_types.push(course.type);
                    this.course_names.push(course.course_names[0].text);
                    this.courses.push([{course_name:course.course_names[0].text,id:course._id,lecturer_name:course.lecturer_ids[0].kanji_alphabet}]);
                }else{
                    this.courses[index].push({course_name:course.course_names[0].text,id:course._id,lecturer_name:course.lecturer_ids[0].kanji_alphabet});
                }
            });
            this.course_types.forEach((t,index)=>{
                // console.log(t);
                this.course_by_type[t].push(this.courses[index]);
            });
            console.log(this.course_by_type);
        }
    },
    created() {
      this.getCourses();
    }
}

</script>

<style>
.my_font{
    font-family: 'Arial','ヒラギノ明朝 ProN','Hiragino Mincho ProN',sans-serif;
}
</style>