let autoChange = true;
let applied = [];
let isFull = false;

firebase.database().ref("apply/2018-05-05").once("value", snap => {
    let db = snap.val();

    for (var key in db) {
        for (var i = 0; i < db[key].people.length; i++) {
            applied.push(db[key].people[i])
        }
    }

    if(applied.length>29){
        isFull = true;
        $(".lightbox_finish").removeClass("displayNone")
    }

})

$(".course_apply").click(function(){
    if(isFull){
        $(".lightbox_finish").removeClass("displayNone")
        return false;
    }
})

$(".banner_arrow").click(function(){
    changeBanner();
    autoChange = false;
    setTimeout(function () {
        autoChange = true;
    }, 9000);
})

$(".banner_nav_item").click(function(){
    changeBanner();
    autoChange = false;
    setTimeout(function () {
        autoChange = true;
    }, 9000);
})

setInterval(function () {
    if(autoChange){
        changeBanner();
    }
}, 5000);

function changeBanner(){
    $(".banner_nav_item").toggleClass("dot--on");
    if($(".banner").attr("src") === "./assets/banner0.svg"){
        $(".banner").attr("src","./assets/banner1.jpg");
        $(".banner_txt").html("다음 수업에 참여하고 싶으신가요?<br>신청기간 알림 받고<br>얼리버드 할인을 받아보세요!");
    }else{
        $(".banner").attr("src","./assets/banner0.svg");
        $(".banner_txt").html("요즘 코딩 열풍이라는데<br>책은 두껍고 학원은 부담스럽죠?<br>함께 딱 하루만 투자해보세요.");
    }
    $(".banner_dom>.hd_nav_apply").toggleClass("displayNone")
}


let autoCmtChange = true;

$(".comment_nav_item").click(function(){
    changeComment();
    autoCmtChange = false;
    setTimeout(function () {
        autoCmtChange = true;
    }, 9000);
})

setInterval(function () {
    if(autoCmtChange){
        changeComment();
    }
}, 5000);

function changeComment(){
    $(".comment_nav_item").toggleClass("dot--on");
    if($(".comment").eq(0).html() === "12시간동안 수업이라 힘들 거라고 생각했는데"){
        $(".comment_by").html("공간 디자이너 박ㅇㅇ님")
        $(".comment_container").html('<p class="comment">한번에 개념을 익히고 이해하기에 좋았습니다.</p><p class="comment">처음 개념을 잡을 때 유용한 것 같고 팀 미션도 재밌었습니다!</p>');
    }else{
        $(".comment_by").html("UX디자이너 김ㅇㅇ님")
        $(".comment_container").html('<p class="comment">12시간동안 수업이라 힘들 거라고 생각했는데</p><p class="comment">생각보다 정말 시간도 빨리 가고 재미있었어요.</p>');
    }
}
