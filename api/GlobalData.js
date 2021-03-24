let credit,point,difficulty,recommendation,evaluation;
// point = [{text:"優が狙える",value:0},
//             {text:"良がやっと",value:1},
//             {text:"時間を返せ！",value:2},
//             {text:"合否のみ",value:3},
//             {text:"まだ分からない",value:4}];

// {text:"--",value:4}

// difficulty = [{text:"理解しやすい",value:0},{text:"頑張れば理解できる",value:1},{text:"才能による",value:2},{text:"理解不能",value:3}];
// recommendation = [{text:"神",value:0},{text:"天使",value:1},{text:"鬼",value:2},{text:"閻魔",value:3}];
// // evaluation = ["出席","期末試験","レポート","発表","小テスト・中間試験","テスト時の持ち込みは可能"];
// evaluation = ["出席","レポート","小テスト","発表","中間試験","期末試験","試験は持ち込み可能"];
// credit = [{text:"単位は約束される",value:0},{text:"割と楽",value:1},{text:"それなりにキツイ",value:2},{text:"時間を返せ",value:3},{text:"まだ分からない",value:4}];

difficulty = ["理解しやすい","頑張れば理解できる","才能による","理解不能"];
recommendation = ["閻魔","鬼","天使","神"];
// evaluation = ["出席","期末試験","レポート","発表","小テスト・中間試験","テスト時の持ち込みは可能"];
evaluation = ["出席","レポート","小テスト","発表","中間試験","期末試験","持ち込み可能"];
credit = ["時間を返せ","それなりにキツイ","割と楽","単位は約束される","まだ分からない",];
point = ["合否のみ","時間を返せ","良がやっと","優が狙える","まだ分からない",];



export {credit,point,difficulty,recommendation,evaluation}


      // quality:[{text:"大変身に付く",value:0},{text:"それなりに身に付く",value:1},{text:"やや物足りない",value:2},{text:"虚無",value:3}],
      // professor_score_items:[{text:"優",value:0},{text:"良",value:1},{text:"可",value:2},{text:"不可",value:3}],