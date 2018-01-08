
$(".ICA_submit").click(function(){
    submitPreApply();
})
$(".ICA_close").click(function(){
    $(".lightbox_pre").addClass("displayNone")
})

$(".PAC_close").click(function(){
    $(".lightbox_pre").addClass("displayNone");
    $(".PAC").addClass("displayNone");
    $(".ICA").removeClass("displayNone");
})
$(".hd_nav_apply").click(function(){
    $("html").animate({
          scrollTop: $(".course_wrapper").offset().top
    }, 180);
})
$(".regZone>input").keyup(function(){
    isFormFilled = false;
})

$(".tabZone").on("click",".tab",function(event){
    saveInfo();
    var idx = $(".tabZone>.tab").index($(this));

    $(".tab").removeClass("tab--selected");
    $(".tab").eq(idx).addClass("tab--selected");

    for (var key in personInfoArray[idx]) {
        $("#"+key).val(personInfoArray[idx][key]);
    }
})

var price = 128000;
var currentPage = 0;
var isFormFilled = false;
var noPeople = 1;
var isNoticeRead = false;
var personInfoArray = [{
    name:"",
    tel:"",
    job:"",
    reason:"",
    want:"",
    comment:""
}];
couponStatus = 0;//0사용안됨, 1원플원, 2이십프로, 3입력값틀림, 4이미이용된쿠폰
var billAmount = 0;
var couponAdjustedBill = 0;
var couponNo = "";

$(".applyNumber").change(function(){
    console.log(personInfoArray)
    if($(this).val()<noPeople){
        removePerson(noPeople - $(this).val())
    }else if($(this).val()>noPeople){
        addPerson($(this).val() - noPeople)
    }
    noPeople = $(this).val();
    setInfoDom();
})

function addPerson(idx){
    for (var i = 0; i < idx; i++) {
        personInfoArray.push({
            name:"",
            tel:"",
            job:"",
            reason:"",
            want:"",
            comment:""
        })
    };
    isFormFilled = false;
}

function removePerson(idx){
    personInfoArray.splice(personInfoArray.length-1-idx,idx);
    console.log(personInfoArray)
}
function setInfoDom(){
    var txt = ''
    for (var i = 0; i < personInfoArray.length; i++) {
        txt+='<p class="tab">참가자'+(i+1)+'</p>'
    }
    $(".tabZone").html(txt);
    $(".tab").eq(0).addClass("tab--selected");

    for (var key in personInfoArray[0]) {
        $("#"+key).val(personInfoArray[0][key]);
    }
}

$(".nextStep").click(function(){
    if(currentPage === 0){
        isNoticeRead = true;
    }
    if(currentPage < 2){
        pageChange();
    }else if(currentPage === 2){
        saveInfo();
        if(!isNoticeRead){
            toast("필수 공지사항을 확인해주세요!");
            let index = 1;
            currentPage = index;
            $(".stepWrapper").addClass("displayNone");
            $(".stepWrapper").eq(index).removeClass("displayNone");
            $(".applyBox .step").removeClass("step--now");
            $(".applyBox .step").eq(index).addClass("step--now");
            isNoticeRead = true;
            return;
        }
        checkInfo();
    }else if(currentPage === 3){
        saveToDatabase();
        $(".stepBox").addClass("displayNone");
        $(".nextStep").addClass("displayNone");
        $(".stepWrapper").addClass("displayNone");
        $(".stepWrapper").eq(4).removeClass("displayNone");
        $(".finalPrice_shorten").html("결제금액 "+commas(couponAdjustedBill)+"원")
    }
    $(".a_wrapper").scrollTop(0)
})

$(".applyBox .step").click(function(){
    if(currentPage === 2){
        saveInfo();
    }
    var index = $(".applyBox .step").index($(this));
    if(index === 1){
        isNoticeRead = true;
    }
    if(index === 3){
        if(!isNoticeRead){
            toast("필수 공지사항을 확인해주세요!");
            let index = 1;
            currentPage = index;
            $(".stepWrapper").addClass("displayNone");
            $(".stepWrapper").eq(index).removeClass("displayNone");
            $(".applyBox .step").removeClass("step--now");
            $(".applyBox .step").eq(index).addClass("step--now");
            isNoticeRead = true;
            return;
        }
        checkInfo();
        if(!isFormFilled){
            return;
        }
        $(".a_wrapper").scrollTop(0)
    }
    currentPage = index;
    $(".stepWrapper").addClass("displayNone");
    $(".stepWrapper").eq(index).removeClass("displayNone");
    $(".applyBox .step").removeClass("step--now");
    $(".applyBox .step").eq(index).addClass("step--now");
})

$(".priceZone>.useCoupon").click(function(){
    $(".lightbox").removeClass("displayNone");
})
$(".pre_inform").click(function(){
    console.log("hi")
    $(".lightbox_pre").removeClass("displayNone")
})

$(".couponCode").keyup(function(){
    var cc = $(".couponCode").val();
    if(cc.length === 12){
        firebase.database().ref("coupon/"+cc).once("value").then(function(snapshot) {
          if(snapshot.exists()){
              var cdata = snapshot.val();
              if(cdata.used){
                  couponStatus = 4;//이미사용된쿠폰
              }else{
                  couponStatus = cc.charAt(0)*1 //쿠폰종류 1, 2
                  couponNo = cc;
              }
          }else{
              couponStatus = 3;//입력값틀림
          }
        });
        console.log(couponStatus)
    }
})

$(".applyCoupon").click(function(){
    if(couponStatus === 1){
        if(personInfoArray.length === 1){
            alert("1+1쿠폰을 사용하시려면 최초 화면에서 신청인원을 2명으로 선택해주세요")
        }else{
            $(".lightbox").addClass("displayNone");
            $("body").css("overflow","auto");
            applyCoupon();
        }
    }else if(couponStatus === 2){
        $(".lightbox").addClass("displayNone");
        $("body").css("overflow","auto");
        applyCoupon();
    }else if(couponStatus === 4){
        alert("이미 사용된 쿠폰입니다.")
    }else{
        alert("쿠폰 번호가 잘못되었습니다.")
    }
})

function applyCoupon(){
    var couponTxt = "";
    if(couponStatus === 1){
        couponAdjustedBill = billAmount - price;
        couponTxt = "(1+1쿠폰 적용)";
    }else if(couponStatus === 2){
        couponAdjustedBill = billAmount*0.8;
        couponTxt = "(20%쿠폰 적용)";
    }
    $(".priceZone>.finalPrice").html("<span class='cLine'>"+commas(billAmount)+"원</span>"+commas(couponAdjustedBill)+"원"+couponTxt)
}

function pageChange(){
    currentPage++;
    $(".stepWrapper").addClass("displayNone");
    $(".stepWrapper").eq(currentPage).removeClass("displayNone");
    $(".applyBox .step").removeClass("step--now");
    $(".applyBox .step").eq(currentPage).addClass("step--now");
}

function saveInfo(){
    console.log(personInfoArray)
    for (var i = 0; i < $(".regZone>input").length; i++) {
        var key = $(".regZone>input").eq(i).attr("id");
        var value = $(".regZone>input").eq(i).val();

        var dummy = $(".tabZone>.tab--selected").html();
        var personIdx = dummy.charAt(dummy.length - 1)*1 - 1;
        personInfoArray[personIdx][key] = value;
    }
}
function checkInfo(){
    let regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

    for (var i = 0; i < personInfoArray.length; i++) {
        if(personInfoArray[i].name.length<1){
            toast("참가자의 이름은 필수 정보입니다.");
            return
        }
        if(!regPhone.test(personInfoArray[i].tel)){
            toast("휴대폰 번호가 잘못 입력되었습니다.");
            return
        }
    }
    isFormFilled = true;
    billAmount = personInfoArray.length * price;
    couponAdjustedBill = billAmount;
    $(".priceZone>.finalPrice").html(commas(couponAdjustedBill)+"원")
    pageChange();
}

function saveToDatabase(){
    var key = firebase.database().ref().push().key;
    var classDate = $(location).attr('search').split("=")[1];
    classDate = "20"+classDate[0]+classDate[1]+"-"+classDate[2]+classDate[3]+"-"+classDate[4]+classDate[5];

    var data = {
        people:[],
        price:couponAdjustedBill
    }

    if(couponAdjustedBill<billAmount){
        data.coupon = couponNo;
    }

    for (var i = 0; i < personInfoArray.length; i++) {
        data.people.push(personInfoArray[i]);
    }

    firebase.database().ref("apply/"+classDate+"/"+key).set(data);

    $(".couponCode").val("")
}

function today(){
    var date = new Date();
    var year = date.getFullYear();
    var month = new String(date.getMonth()+1);
    if(month.length===1){
        month = "0" + month;
    }
    var day = new String(date.getDate());
    if(day.length===1){
        day = "0" + day;
    }
    return  year +"-"+ month +"-"+ day;
}

function submitPreApply(){
    var input_name = $(".ICA_input_name").val();
    var input_tel = $(".ICA_input_tel").val();
    if(input_name.length > 0 && input_tel.length > 0){
        var key = firebase.database().ref().push().key
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

function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
