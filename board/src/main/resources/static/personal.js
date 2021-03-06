// 3번째 포폴 기능 - 회원정보
var member = null;

$(document).ready(function () {
    logAppend('personal function loaded');

    
    // $('.signout-yes').hide();
    // $('.signout-no').hide();
    
    // 로그인시 회원정보 표시
    $('#personal-tab').on('click', function () {
        if (memberId != 0) {
            member = API_members_GET_GetMember(memberId);
            $('.personal').removeAttr('disabled');
            $('.personal.input.email').val(member.email);
            $('.personal.input.email').attr('disabled', 'disabled');
            $('.personal.input.nick').val(member.nick);
            $('.personal.signout-btn').removeAttr('disabled');
        } else {
            $('.personal.input').val('');
            $('.personal').attr('disabled', 'disabled');
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
            var nicks = API_members_nicks_GET_GetNicks();
            for (var i = 0; i < nicks.length; i += 1) {
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
        
        var result = API_members_PUT_Update($('.personal.input.email').val(), $('.personal.input.nick').val(), $('.personal.input.pwd').val());
        if (result == null) {
            alert("에러 발생");
            return;
        }
        alert("회원정보 변경 완료");
    });

    $('.signout-yes').on('click', function () {
        API_members_DELETE_DeleteMember(memberId);
        logout();
        $('.personal.input').val('');
        $('.personal').attr('disabled', 'disabled');
        alert('탈퇴되었습니다');
    });
});
