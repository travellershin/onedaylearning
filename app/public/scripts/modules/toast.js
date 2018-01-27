function toast(txt){
    if($(".snackbar").length>0){
        $(".snackbar").remove();
    }
    $("body").append('<div class="snackbar">'+txt+'</div>');
    $(".snackbar").addClass("show");
    $(".snackbar").css("animation")

    setTimeout(function () {
        $(".snackbar").removeClass("show")
    }, 3000);
}

$(".hd_nav_apply").click(function(){
    window.localStorage["pushApplyBtn"] = "true"
    location.href = "index.html"
})
