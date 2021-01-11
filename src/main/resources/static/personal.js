// 3번째 포폴 기능 - 회원정보


$(document).ready(function () {
    logAppend('personal function loaded');
    
    // 로그인시 회원정보 표시
    $('#personal-tab').on('click', function () {
        if (memberId != 0) {
            var member = API_GetMember(memberId);
            logAppend(member);
            $('.personal.input').removeAttr('disabled');
            $('.personal.email.input').val(member.email);
            $('.personal.nick.input').val(member.nick);
        } else {
            $('.personal.input').val('');
            $('.personal.input').attr('disabled', 'disabled');
        }
    });


    // // [변경 요청]
    // $('.personal.cnfm').on('click', function () {
    //     memberId = API_Update($('.personal.input.email').val(), $('.personal.input.nick').val(), $('.personal.input.pwd').val());
    //     // $('.member-id').val('');
    //     // $('.member-id').val(memberId);
    // });

    // // 비밀번호 값 변경 감지 - 타이틀에 통과 표시 on/off
    // $('.sign.pwd.input').on("propertychange change keyup paste input", function () {
    //     if ($(this).val() != '') {
    //         $('.sign.pwd.title').addClass('passed');
    //     } else {
    //         $('.sign.pwd.title').removeClass('passed');
    //     }
    // });

    // // 컨펌 값 비교 - 변경 버튼 잠금 해제
    // $('.personal.cnfm.input').on("propertychange change keyup paste input", function () {
    //     if ($(this).val() == $('.personal.pwd.input').val() && memberId != 0) {
    //         $('.personal.cnfm.btn').removeAttr('disabled');
    //     } else {
    //         $('.personal.cnfm.btn').attr('disabled', 'disabled');
    //     }
    // });
});
