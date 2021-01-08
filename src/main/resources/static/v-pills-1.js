

// 1번째 포폴 - 회원가입

var verifyCode = 0;
$(document).ready(function () {
    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    // 이메일 확인
    $('.sign.email.btn').on('click', function () {
        if (!validateEmail($('.sign.email.input').val())) {
            $('#more-log').append(`이메일 부적합<br>`);
            alert('올바른 이메일이 아닙니다.');
            return;
        }

        // 인증번호 전송 - 인증번호 잠금 해제
        if (!$('.sign.email.input').attr('disabled')) {
            $('.sign.email.title').addClass('passed');
            $('.sign.email.input').attr('disabled', 'disabled');
            $('.sign.email.btn').text('이메일 변경');
            $('.sign.verify').removeAttr('disabled');

            // [서버로 입력 이메일 전송]
            $('#more-log').append($('.input.email').val() + `로 인증번호 발신 요청<br>`);
            sendCodeMail($('.input.email').val());
        } else {
            // 이메일 변경
            $('#more-log').append(`[입력 정보, 인증번호 초기화]<br>`);
            verifyCode = 0;
            $('.sign.email.input').val('');
            $('.sign').removeClass('passed');
            $('.sign').attr('disabled', 'disabled');

            $('.sign.email').removeAttr('disabled');
            $('.sign.email.btn').text('인증번호 전송');
            $('.sign.email.input').focus();
        }
    })

    // 인증번호 입력
    $('.sign.verify.btn').on('click', function () {
        if ($('.sign.verify.input').val() == verifyCode) {
            $('#more-log').append(`인증번호 일치 확인<br>`);
            $('.sign.verify.input').val('passed');
            $('.sign.verify.title').addClass('passed');
            $('.sign.verify').attr('disabled', 'disabled');
            $('.sign.pwd').removeAttr('disabled');
            $('.sign.cnfm.input').removeAttr('disabled');
        } else {
            $('#more-log').append(`인증번호 불일치 확인<br>`);
            alert("인증번호가 일치하지 않습니다.");
        }
    })

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
        signIn($('.input.email').val(), $('.input.pwd').val());
    })
})

// [회원가입 요청]
function signIn(email, pwd) {
    var memberRequestDto = { "email": email, "password": pwd };
    $('#more-log').append(`-> [개인서버 - 신규 회원 정보 생성]<br>[API 요청] { type : "POST", contentType: application/json, url : /api/member }<br>`);

    $.ajax({
        type: "POST",
        url: '/api/members',
        data: JSON.stringify(memberRequestDto),
        contentType: 'application/json',
        success: function (response) {
            $('#more-log').append(`[API 답변] 회원번호 ${response.id}번 회원으로 가입 성공`);
            alert('가입되었습니다.');
        }
    })
}

// [서버로 입력 이메일 전송]
function sendCodeMail(email) {
    $('#more-log').append(`-> [개인서버 - 기존회원확인, 인증번호생성, emailjs 식별키 생성]<br>[API 요청] { type : "GET", url : /api/verify?email=${email} }<br>`);
    $.ajax({
        type: "GET",
        url: `/api/verify?email=${email}`,
        success: function (response) {

            $('#more-log').append(response);
            if (response == "0") {
                $('#more-log').append(`[API 답변] 이미 가입된 회원<br>`);
                alert('이미 가입이 된 이메일입니다.');
                return;
            }
            $('#more-log').append(`[API 답변] emailjs 식별키<br>`);
            $('#more-log').append(`-> [emailjs - 이메일 전송 요청]<br>[API 요청] { type : "POST", contentType: application/json, url : https://api.emailjs.com/api/v1.0/email/send<br>`);
            // $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            //     type: 'POST',
            //     data: response,
            //     contentType: 'application/json'
            // }).done(function () {
            //     $('#more-log').append(`[API 답변] 이메일 전송 완료<br>`);
            //     alert('전송되었습니다.');

            // }).fail(function (error) {
            //     $('#more-log').append(`[API 답변] 문제 발생<br>`);
            //     alert('문제가 발생했습니다. ' + JSON.stringify(error));
            // });
            // verifyCode = JSON.parse(response).template_params.verify;
            // $('#more-log').append(`[인증번호 저장] ${verifyCode}<br>`);
        }
    })
}