// 2번째 포폴 기능 - 로그인


$(document).ready(function () {
    logAppend('login function loaded');
    
    // [로그인 요청]
    $('.login.cnfm').on('click', function () {
        // 이메일 확인
        if (!validateEmail($('.login.email.input').val())) {
            logAppend(`이메일 부적합`);
            alert('올바른 이메일이 아닙니다.');
            return;
        }
        var response = API_login_POST_Login($('.login.input.email').val(), $('.login.input.pwd').val());

        $('.login.input.pwd').val('');
        if (response == -1) {
            $('.login.input.pwd').focus();
            logAppend(`[API 답변] 로그인 정보 불일치`);
            alert('비밀번호가 틀렸습니다.');
            return;
        }
        if (response == 0) {
            $('.login.input.email').val('');
            $('.login.input.email').focus();
            logAppend(`[API 답변] 없는 이메일`);
            alert('없는 이메일입니다.');
            return;
        }
        login(response);
    });

    // 임시 암호 요청
    $('.findpwd').on('click', function () {
        // 이메일 확인
        if (!validateEmail($('.login.email.input').val())) {
            logAppend(`이메일 부적합`);
            alert('올바른 이메일이 아닙니다.');
            return;
        }

        var tempPassword = API_verify_POST_SendCode($('.login.input.email').val(), "임시 암호");

        if (tempPassword.length == 6) {            
            logAppend(`[API 답변] 전송 완료`);
            alert('이메일로 전송되었습니다.');
            API_members_PUT_Update($('.login.input.email').val(), null, tempPassword);
            return;
        }

        $('.login.email.input').val('');
        $('.login.email.input').focus();

        if (tempPassword.indexOf("[Info]") != -1) {
            alert('가입되지 않은 이메일입니다');
            return;
        }
        if (tempPassword.indexOf("[Error]") != -1) {
            alert('에러 발생');
            return;
        }
    });

    $('.logout').on('click', function () {
        logout();
    });
});

function login(response) {
    memberId = response;
    $('.login').attr('disabled', 'disabled');
    logAppend(`[API 답변] 로그인 정보 일치 ${memberId}번 회원으로 로그인`);
    $('.member-id').val(memberId);
    $('.logout').removeAttr('disabled');
    $('.board-new').removeAttr('disabled');
    $('.post-new').removeAttr("disabled");

    if (memberId == currentBoard.memberId) {
        $('.board-update').removeAttr("disabled");
        $('.board-delete').removeAttr("disabled");
    }
    if (memberId == currentPost.memberId) {
        $('.post-update').removeAttr("disabled");
        $('.post-delete').removeAttr("disabled");
    }
    // alert('로그인되었습니다.');
}

function logout() {
    memberId = 0;
    $('.member-id').val('');
    $('.login.email.input').val('');
    $('.login').removeAttr('disabled');
    $('.logout').attr('disabled', 'disabled');
    $('.board-new').attr('disabled', 'disabled');
    $('.board-update').attr('disabled', 'disabled');
    $('.board-delete').attr('disabled', 'disabled');
    $('.post-new').attr('disabled', 'disabled');
    $('.post-update').attr('disabled', 'disabled');
    $('.post-delete').attr('disabled', 'disabled');
    logAppend(`로그아웃`);
}