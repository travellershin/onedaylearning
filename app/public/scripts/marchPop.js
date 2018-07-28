(function(){
    if(!window.localStorage["marchPop"]){
        document.querySelector(".lightbox_march").classList.remove("displayNone");
    }
    if(window.localStorage["marchPop"]){
        if(window.localStorage["marchPop"] !== "confirmed"){
            document.querySelector(".lightbox_march").classList.remove("displayNone");
        }
    }
}())

function closePop(){
    document.querySelector(".lightbox_march").classList.add("displayNone");
    window.localStorage["marchPop"] = "confirmed";
}
