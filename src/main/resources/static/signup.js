// 1번째 포폴 - 회원가입
var verifyCode = "";

$(document).ready(function () {
    logAppend('sign up function loaded');

    // 이메일 확인
    $('.sign.email.btn').on('click', function () {
        if (!validateEmail($('.sign.email.input').val())) {
            logAppend(`이메일 부적합`);
            alert('올바른 이메일이 아닙니다.');
            return;
        }

        // 인증번호 전송 - 인증번호 잠금 해제
        if (!$('.sign.email.input').attr('disabled')) {
            // [서버로 이메일 전송]
            logAppend($('.input.email').val() + `로 인증번호 발신 요청`);
            verifyCode = API_verify_POST_SendCode($('.input.email').val(), "인증 번호");


            if (verifyCode.length == 6) {
                alert('전송되었습니다.');
                logAppend(`[API 답변] 전송 완료`);
                $('.sign.email.title').addClass('passed');
                $('.sign.email.input').attr('disabled', 'disabled');
                $('.sign.email.btn').text('이메일 변경');
                $('.sign.verify').removeAttr('disabled');
                return;
            }

            $('.sign.email.input').val('');
            $('.sign.email.input').focus();

            if (verifyCode.indexOf("[Info]") != -1) {
                logAppend(`[API 답변] 이미 가입된 이메일`);
                alert('이미 가입된 이메일입니다');
                return;
            }
            if (verifyCode.indexOf("[Error]") != -1) {
                logAppend(`[API 답변] 에러 발생`);
                alert('에러 발생');
                return;
            }
        } else {
            // 이메일 변경
            logAppend(`[입력 정보, 인증번호 초기화]`);
            verifyCode = "";
            $('.sign.input').val('');
            $('.sign').removeClass('passed');
            $('.sign').attr('disabled', 'disabled');

            $('.sign.email').removeAttr('disabled');
            $('.sign.email.btn').text('인증번호 전송');
            $('.sign.email.input').focus();
        }
    });

    // 인증번호 입력
    $('.sign.verify.btn').on('click', function () {
        if ($('.sign.verify.input').val() == verifyCode) {
            logAppend(`인증번호 일치 확인`);
            $('.sign.verify.input').val('passed');
            $('.sign.verify.title').addClass('passed');
            $('.sign.verify').attr('disabled', 'disabled');
            $('.sign.pwd').removeAttr('disabled');
            $('.sign.cnfm.input').removeAttr('disabled');
        } else {
            logAppend(`인증번호 불일치 확인`);
            alert("인증번호가 일치하지 않습니다.");
        }
    });

    // 비밀번호 값 변경 감지 - 타이틀에 통과 표시 on/off
    $('.sign.pwd.input').on("propertychange change keyup paste input", function () {
        if ($(this).val() != '') {
            $('.sign.pwd.title').addClass('passed');
        } else {
            $('.sign.pwd.title').removeClass('passed');
        }
    });

    // 컨펌 값 비교 - 가입 버튼 잠금 해제
    $('.sign.cnfm.input').on("propertychange change keyup paste input", function () {
        if ($(this).val() == $('.sign.pwd.input').val()) {
            $('.sign.cnfm.title').addClass('passed');
            $('.sign.cnfm.btn').removeAttr('disabled');
        } else {
            $('.sign.cnfm.title').removeClass('passed');
            $('.sign.cnfm.btn').attr('disabled', 'disabled');
        }
    });

    // [회원가입 요청]
    $('.sign.cnfm.btn').on('click', function () {
        var response = API_members_POST_Join($('.input.email').val(), $('.input.pwd').val());
        logAppend(`[API 답변] 회원번호 ${response.id}번 회원으로 가입 성공`);
        alert('가입되었습니다.');
    });
})