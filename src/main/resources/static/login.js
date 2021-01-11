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
        var response = API_Login($('.login.input.email').val(), $('.login.input.pwd').val());

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
        memberId = response;
        $('.login').attr('disabled', 'disabled');
        logAppend(`[API 답변] 로그인 정보 일치 ${memberId}번 회원으로 로그인`);
        $('.member-id').val(memberId);        
        alert('로그인되었습니다.');
    });

    // 임시 암호 요청
    $('.findpwd').on('click', function () {
        logAppend($('.login.input.email').val() + ` 임시 암호 발신 요청`);
        // 이메일 확인
        if (!validateEmail($('.login.email.input').val())) {
            logAppend(`이메일 부적합`);
            alert('올바른 이메일이 아닙니다.');
            return;
        }

        var tempPassword = API_SendCode($('.login.input.email').val(), "임시 암호");

        if (tempPassword.length == 6) {            
            logAppend(`[API 답변] 전송 완료`);
            alert('이메일로 전송되었습니다.');
            API_Update($('.login.input.email').val(), null, tempPassword);
            return;
        }

        $('.sign.email.input').val('');
        $('.sign.email.input').focus();

        if (tempPassword.indexOf("[Info]") != -1) {
            logAppend(`[API 답변] 가입되지 않은 이메일`);
            alert('가입되지 않은 이메일입니다');
            return;
        }
        if (tempPassword.indexOf("[Error]") != -1) {
            logAppend(`[API 답변] 에러 발생`);
            alert('에러 발생');
            return;
        }
    });
});
