let autoChange = true;

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
    if($(".comment").eq(0).html() === "말은 쉽지, 코드를 보여줘"){
        $(".comment_by").html("코알못 에디슨")
        $(".comment_container").html('<p class="comment">좋은 프로그램은 1%의 영감과 99%의 노가다로 이루어진다</p><p class="comment">Good program is one percent inspiration and ninety-nine percent perspiration</p>');
    }else{
        $(".comment_by").html("리누스 토르발스")
        $(".comment_container").html('<p class="comment">말은 쉽지, 코드를 보여줘</p><p class="comment">Talk is cheap. Show me the code.</p>');
    }
}
