$(".ICA_submit").click(function(){
    submitPreApply();
})

$(".ICA_close").click(function(){
    $(".lightbox").addClass("displayNone")
})

$(".PAC_close").click(function(){
    $(".lightbox").addClass("displayNone");
    $(".PAC").addClass("displayNone");
    $(".ICA").removeClass("displayNone");
})
$(".hd_nav_apply").click(function(){
    $(".lightbox").removeClass("displayNone")
})

function today(){
    let date = new Date();
    let year = date.getFullYear();
    let month = new String(date.getMonth()+1);
    if(month.length===1){
        month = "0" + month;
    }
    let day = new String(date.getDate());
    if(day.length===1){
        day = "0" + day;
    }
    return  year +"-"+ month +"-"+ day;
}

function submitPreApply(){
    let input_name = $(".ICA_input_name").val();
    let input_tel = $(".ICA_input_tel").val();
    if(input_name.length > 0 && input_tel.length > 0){
        let key = firebase.database().ref().push().key
        firebase.database().ref("preApply/"+today()+"/"+key).set({
            name:input_name,
            tel:input_tel
        })
        $(".ICA_input_name").val("");
        $(".ICA_input_tel").val("");
        $(".PAC").removeClass("displayNone");
        $(".ICA").addClass("displayNone");
    }else{
        alert("이름과 전화번호를 모두 입력해주세요")
    }
}
