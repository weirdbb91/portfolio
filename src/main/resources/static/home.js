// 홈 화면

$(document).ready(function () {
    // API 문서, 후기 이동
    $('#more-api').append($('#api-table'));
    $('#more-review').append($('.review-function'));


    // API 문서, 후기 필터링
    $('#home-tab').on('click', function () {
        $('.api-table').show();
        $('.review-function').hide();
    });

    // 회원가입
    $('#signup-tab').on('click', function () {
        $('.api-table').hide();
        $('.review-function').hide();

        logAppend('sign up API Docs, review init');
        $('.member-join').show();
        $('.member-sendCode').show();

        $('.signup-review').show();
    });

    // 로그인
    $('#login-tab').on('click', function () {
        $('.api-table').hide();
        $('.review-function').hide();

        logAppend('login API Docs, review init');
        $('.member-login').show();
        $('.member-sendCode').show();
        $('.member-update').show();

        $('.login-review').show();
    });

    // 개인정보
    $('#personal-tab').on('click', function () {
        $('.api-table').hide();
        $('.review-function').hide();

        logAppend('login API Docs, review init');
        $('.member-getMember').show();
        $('.member-update').show();
        $('.member-delete').show();

        $('.personal-review').show();
    });

    // 커뮤니티
    $('#community-tab').on('click', function () {
        $('.api-table').hide();
        $('.review-function').hide();

        logAppend('community API Docs, review init');
        // $('.member-getMember').show();
        // $('.member-update').show();
        // $('.member-delete').show();

        $('.community-review').show();
    });
})

// 로그 추가
function logAppend(message) {
    var date = new Date();
    $('#more-log').append(`[ ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()} ${date.getSeconds()}:${date.getMilliseconds()} ] ${message}<br>`);
    $(".more-tab-box").scrollTop($(".more-tab-box")[0].scrollHeight);
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

// API
function API_JSON_Body(type, url, request) {
    var result;
    $.ajax({
        type: type,
        url: url,
        async: false,
        data: JSON.stringify(request),
        contentType: 'application/json',
        success: function (response) {
            result = response;
        }
    });
    return result;
}

function API_Join(email, pwd) {
    var request = { "email": email, "password": pwd };
    logAppend(`[API - member-join] request : ${JSON.stringify(request)}`);
    return API_JSON_Body("POST", "/api/members", request);
}

function API_SendCode(email, purpose) {
    var request = { "email": email, "purpose": purpose };
    logAppend(`[API - member-sendCode] request : ${JSON.stringify(request)}`);
    return API_JSON_Body("POST", "/api/verify", request);
}

function API_Login(email, password) {
    var request = { 'email': email, 'password': password };
    logAppend(`[API - member-login] request : ${JSON.stringify(request)}`);
    return API_JSON_Body("POST", "/api/login", request);
}

function API_Update(email, nick, password) {
    var request = { 'email': email, 'nick': nick, 'password': password };
    logAppend(`[API - member-update] request : {"email":"${email}","nick":${nick},"password":"******"}`);
    return API_JSON_Body("PUT", "/api/members", request);
}

function API_GetMember(id) {
    logAppend(`[API - member-getMember]`);
    var result;
    $.ajax({
        type: "GET",
        url: `/api/members?id=${id}`,
        async: false,
        success: function (response) {
            result = response;
        }
    });
    return result;
}


function API_DeleteMember(id) {
    logAppend(`[API - member-deleteMember]`);
    var result;
    $.ajax({
        type: "DELETE",
        url: `/api/members?id=${id}`,
        async: false,
        success: function (response) {
            result = response;
        }
    });
    return result;
}


function API_GetNicks() {
    logAppend(`[API - member-getNicks]`);
    var result;
    $.ajax({
        type: "GET",
        url: `/api/members/nicks`,
        async: false,
        success: function (response) {
            result = response;
        }
    });
    return result;
}

