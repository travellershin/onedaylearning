$('.editor_html').keyup(function(e){
    let targetp = $('#live_viewer')[0].contentWindow.document;
    targetp.open();
    targetp.close();

    let htmlTxt = $('.editor_html').val();

    if(e.keyCode === 71){
        var start = this.selectionStart;
        if(htmlTxt.charAt(start - 4)==="<"&&htmlTxt.charAt(start - 3)==="i"){
            htmlTxt = htmlTxt.substring(0, start-4)+ '<img src=""/>'+ htmlTxt.substring(start);

            $('.editor_html').val(htmlTxt);
            $('.editor_html').selectRange(start+6,start+6)
        }
    }

    if(e.keyCode === 80){
        var start = this.selectionStart;
        if(htmlTxt.charAt(start - 2)==="<"){
            htmlTxt = htmlTxt.substring(0, start-2)+ '<p></p>'+ htmlTxt.substring(start);
            $('.editor_html').val(htmlTxt);
            $('.editor_html').selectRange(start+1,start+1)
        }
    }

    if(e.keyCode === 86){
        var start = this.selectionStart;
        if(htmlTxt.charAt(start - 4)==="<"&&htmlTxt.charAt(start - 3)==="d"){
            htmlTxt = htmlTxt.substring(0, start-4)+ '<div></div>'+ htmlTxt.substring(start);

            $('.editor_html').val(htmlTxt);
            $('.editor_html').selectRange(start+1,start+1)
        }

    }


    $('body',targetp).html(htmlTxt);
    $('head',targetp).html('<style>' + $('.editor_css').val() + '</style>');
});

$('.editor_css').keyup(function(e){

    let cssTxt = $('.editor_css').val();
    let targetp = $('#live_viewer')[0].contentWindow.document;
    targetp.open();
    targetp.close();

    if(e.keyCode === 219){
        var start = this.selectionStart;
        cssTxt = cssTxt.substring(0, start-1)+ '{\n\t\n}'+ cssTxt.substring(start);
        $('.editor_css').val(cssTxt);
        $('.editor_css').selectRange(start+2,start+2)
    }


    $('head',targetp).html('<style>' + cssTxt + '</style>');
    $('body',targetp).html($('.editor_html').val());

});

$.fn.selectRange = function(start, end) {
    return this.each(function() {
         if(this.setSelectionRange) {
             this.focus();
             this.setSelectionRange(start, end);
         } else if(this.createTextRange) {
             var range = this.createTextRange();
             range.collapse(true);
             range.moveEnd('character', end);
             range.moveStart('character', start);
             range.select();
         }
     });
 };


 $(document).delegate('.editor', 'keydown', function(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

    // put caret at right position again
    this.selectionStart =
    this.selectionEnd = start + 1;
  }
});

$(".checkbox").click(function(){
    $(this).toggleClass("checkbox--checked")
})

$(".checkbox_html").click(function(){
    if($(".html_wrapper").hasClass("hidden")){
        if($(".css_wrapper").hasClass("hidden")){//0 -> 1
            $("#live_viewer").width("75%")
        }else{// 1 -> 2
            $("#live_viewer").width("51%")
        }
    }else{
        if($(".css_wrapper").hasClass("hidden")){//1 -> 0
            $("#live_viewer").width("99%")
        }else{// 2 -> 1
            $("#live_viewer").width("75%")
        }
    }
    $(".html_wrapper").toggleClass("hidden");
})

$(".checkbox_css").click(function(){
    if($(".css_wrapper").hasClass("hidden")){
        if($(".html_wrapper").hasClass("hidden")){//0 -> 1
            $("#live_viewer").width("75%")
        }else{// 1 -> 2
            $("#live_viewer").width("51%")
        }
    }else{
        if($(".html_wrapper").hasClass("hidden")){//1 -> 0
            $("#live_viewer").width("98.5%")
        }else{// 2 -> 1
            $("#live_viewer").width("75%")
        }
    }
    $(".css_wrapper").toggleClass("hidden");
})

$(".checkbox_result").click(function(){
    if($("#live_viewer").hasClass("hidden")){
        $(".input_wrapper").width("23%");
    }else{
        $(".input_wrapper").width("49%");
    }

    $("#live_viewer").toggleClass("hidden");
})
