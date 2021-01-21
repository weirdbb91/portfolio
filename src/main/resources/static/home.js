// 홈 화면

$(document).ready(function () {
    // API 문서, 후기 이동
    $('#more-api').append($('#api-table'));
    $('#more-review').append($('.review-function'));

    $('.review-function').hide();
    $('.finished-review').show();

    // API 문서, 후기 필터링
    $('#home-tab').on('click', function () {
        logAppend('All API Docs, finished review init');
        $('.api-table').show();
        $('.review-function').hide();

        $('.finished-review').show();
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

        logAppend('personal info API Docs, review init');
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
        $('.member-getMember').show();

        $('.board-post').show();
        $('.board-getBoards').show();
        $('.board-getBoardById').show();
        $('.board-update').show();
        $('.board-DeleteBoard').show();

        $('.post-post').show();
        $('.post-getPostListByBoardId').show();
        $('.post-update').show();
        $('.post-DeletePost').show();

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
    if (result.length != 6) {
        logAppend(`[API - response] : ${JSON.stringify(result)}`);
    }
    return result;
}

function API_Params(type, url) {
    var result;
    $.ajax({
        type: type,
        url: url,
        async: false,
        success: function (response) {
            result = response;
        }
    });
    logAppend(`[API - response] : ${JSON.stringify(result)}`);
    return result;
}



function API_verify_POST_SendCode(email, purpose) {
    var request = { "email": email, "purpose": purpose };
    logAppend(`[API - member-sendCode] request : ${JSON.stringify(request)}`);
    return API_JSON_Body("POST", "/api/verify", request);
}

function API_login_POST_Login(email, password) {
    var request = { 'email': email, 'password': password };
    logAppend(`[API - member-login] request : ${JSON.stringify(request)}`);
    return API_JSON_Body("POST", "/api/login", request);
}


// members
function API_members_POST_Join(email, password) {
    var request = { "email": email, "password": password };
    logAppend(`[API - member-join] request : ${JSON.stringify(request)}`);
    return API_JSON_Body("POST", "/api/members", request);
}

function API_members_GET_GetMember(id) {
    logAppend(`[API - member-getMember] id = ${id}`);
    return API_Params("GET", `/api/members?id=${id}`);
}

function API_members_PUT_Update(email, nick, password) {
    var request = { 'email': email, 'nick': nick, 'password': password };
    logAppend(`[API - member-update] request : {"email":"${email}","nick":${nick},"password":"******"}`);
    return API_JSON_Body("PUT", "/api/members", request);
}

function API_members_DELETE_DeleteMember(id) {
    logAppend(`[API - member-deleteMember] id = ${id}`);
    return API_Params("DELETE", `/api/members?id=${id}`);
}

function API_members_nicks_GET_GetNicks() {
    logAppend(`[API - member-getNicks]`);
    return API_Params("GET", `/api/members/nicks`);
}





// boards
function API_boards_POST_PostBoard(memberId, title, content, status) {
    var request = { "memberId": memberId, "title": title, "content": content, "status": status };
    logAppend(`[API - board-post] request : ${JSON.stringify(request)}`);
    return API_JSON_Body("POST", "/api/boards", request);
}

function API_boards_GET_GetBoardList() {
    logAppend(`[API - board-getBoardList]`);
    return API_Params("GET", "/api/boards");
}

function API_boards_GET_GetBoardById(id) {
    logAppend(`[API - board-getBoardById] id = ${id}`);
    return API_Params("GET", `/api/boards/${id}`);
}

function API_boards_PUT_UpdateBoard(id, title, content, status) {
    var request = { "id": id, "title": title, "content": content, "status": status };
    logAppend(`[API - board-update] request : ${JSON.stringify(request)}`);
    return API_JSON_Body("PUT", "/api/boards", request);
}

function API_boards_DELETE_DeleteBoard(id) {
    logAppend(`[API - board-deleteBoard] id = ${id}`);
    return API_Params("DELETE", `/api/boards?id=${id}`);
}




// posts
function API_posts_POST_PostPost(memberId, boardId, title, content, status) {
    var request = { "memberId": memberId, "boardId": boardId, "title": title, "content": content, "status": status };
    logAppend(`[API - post-post] request : ${JSON.stringify(request)}`);
    return API_JSON_Body("POST", "/api/posts", request);
}

function API_posts_GET_GetPostListByBoardId(boardId) {
    logAppend(`[API - post-getPostsByBoardId] boardId = ${boardId}`);
    return API_Params("GET", `/api/posts/${boardId}`);
}

function API_posts_PUT_UpdatePost(id, title, content, status) {
    var request = { "id": id, "title": title, "content": content, "status": status };
    logAppend(`[API - post-update] request : ${JSON.stringify(request)}`);
    return API_JSON_Body("PUT", "/api/posts", request);
}

function API_posts_DELETE_DeletePost(id) {
    logAppend(`[API - post-deletePost] id = ${id}`);
    return API_Params("DELETE", `/api/posts?id=${id}`);
}

