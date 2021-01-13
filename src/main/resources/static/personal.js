// 3번째 포폴 기능 - 회원정보
var member;

$(document).ready(function () {
    logAppend('personal function loaded');

    $('.signout-btn').attr('disabled', 'disabled');
    
    // $('.signout-yes').hide();
    // $('.signout-no').hide();
    
    // 로그인시 회원정보 표시
    $('#personal-tab').on('click', function () {
        if (memberId != 0) {
            member = API_GetMember(memberId);
            $('.personal').removeAttr('disabled');
            $('.personal.input.email').val(member.email);
            $('.personal.input.email').attr('disabled', 'disabled');
            $('.personal.input.nick').val(member.nick);
            $('.personal.signout-btn').removeAttr('disabled');
        } else {
            $('.personal.input').val('');
            $('.personal.input').attr('disabled', 'disabled');
            $('.personal.signout-btn').attr('disabled', 'disabled');
        }
    });

    // [변경 요청]
    $('.personal.cnfm.btn').on('click', function () {
        if ($('.personal.input.pwd').val() != $('.personal.input.cnfm').val()) {
            alert("비밀번호와 확인이 일치하지 않습니다");
            return;
        }
        if ($('.personal.input.nick').val() == '') {
            alert("닉네임을 입력하지 않았습니다");
            return;
        }
        
        var requestNick = $('.personal.input.nick').val();
        if (requestNick != member.nick) {
            // 닉 중복 확인
            var nicks = API_GetNicks();
            for (var i = 0; i < nicks.length; i += 1) {
                logAppend("닉네임 비교중 " + nicks[i]);
                if (requestNick == nicks[i] && member.nick != nicks[i]) {
                    alert("이미 사용중인 닉네임 입니다");
                    return;
                }
            }
        }

        if (requestNick == member.nick && ($('.personal.input.pwd').val() == "" || $('.personal.input.pwd').val() == member.password)) {
            alert("변경할 정보가 없습니다");
            return;
        }
        
        var result = API_Update($('.personal.input.email').val(), $('.personal.input.nick').val(), $('.personal.input.pwd').val());
        if (result == null) {
            alert("에러 발생");
            return;
        }
        alert("회원정보 변경 완료");
    });

    $('.personal.signout-btn').on('click', function () {
        $('.signout-yes').show();
        $('.signout-no').show();
        $('.personal.signout-btn').attr('disabled', 'disabled');
    });

    $('.signout-yes').on('click', function () {
        API_DeleteMember(memberId);
        location.reload();
    });
        
    $('.signout-no').on('click', function () {
        $('.signout-yes').hide();
        $('.signout-no').hide();
        $('.personal.signout-btn').removeAttr('disabled');
    });
});
