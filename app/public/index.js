(function QuestionBtn(){
    let _rBtn = $(".rightQ");
    let _lBtn = $(".leftQ");
    let _nOfQ = $(".quiz").length;
    let _page = $(".wrapper");
    let _title = $(".instruct");
    let _qIdx = 0;

    _rBtn.click(clickRight);
    _lBtn.click(clickLeft);

    function clickRight(){
        if(_qIdx === 0){
            _lBtn.removeClass("hidden")
        }
        if(_qIdx === _nOfQ - 2){
            _rBtn.addClass("hidden");
        }
        moveNext()
    }

    function clickLeft(){
        if(_qIdx === _nOfQ - 1){
            _rBtn.removeClass("hidden");
        }
        if(_qIdx === 1){
            _lBtn.addClass("hidden");
        }
        movePrev()
    }

    function moveNext(){
        _page.eq(_qIdx).addClass("hidden");
        _title.eq(_qIdx).addClass("hidden");
        _qIdx++;
        _page.eq(_qIdx).removeClass("hidden");
        _title.eq(_qIdx).removeClass("hidden");
        for (var i = 0; i < $("textarea").length; i++) {
            $("textarea").eq(i).height(1).height( $("textarea").eq(i).prop('scrollHeight')-24);
        }
    }

    function movePrev(){
        _page.eq(_qIdx).addClass("hidden");
        _title.eq(_qIdx).addClass("hidden");
        _qIdx--;
        _page.eq(_qIdx).removeClass("hidden");
        _title.eq(_qIdx).removeClass("hidden");
        for (var i = 0; i < $("textarea").length; i++) {
            $("textarea").eq(i).height(1).height( $("textarea").eq(i).prop('scrollHeight')-24);
        }
    }
}());

(function AnswerBtn(){
    let _toggler = $(".btn_toggle");
    let _ans = $(".ans");

    _toggler.click(toggleAnswer);

    function toggleAnswer(){
        if(_toggler.html() === "해설 보이기"){
            _toggler.html("해설 숨기기");
        }else{
            _toggler.html("해설 보이기");
        }

        _ans.toggleClass("hidden");
        for (var i = 0; i < $("textarea").length; i++) {
            $("textarea").eq(i).height(1).height( $("textarea").eq(i).prop('scrollHeight')-24);
        }
    }
}());
