$(".location_picture").click(function(){
    $(".lightbox_img").attr("src",$(this).attr("src"));
    $(".lightbox").removeClass("displayNone");
    $("body").css("overflow","hidden");
})
$(".lightbox").click(function(){
    $(".lightbox").addClass("displayNone");
    $("body").css("overflow","auto");
})
