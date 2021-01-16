// // 4번째 포폴 기능 - 게시판
var boardList = [];
var currentBoard;
var currentPost;

$(document).ready(function () {

    // 새 게시판 생성
    $('.new-board-yes').on('click', function () {
        API_boards_POST_PostBoard(memberId, $('.new-board-name.input').val(), $('.new-board-content.input').val(), "정상");
        $('.community.input').val('');
        loadBoardList();
    })



    // 글쓰기
    $('.new-post-yes').on('click', function () {
        API_posts_POST_PostPost(memberId, $('.new-post-name.input').val(), $('.new-post-content.input').val(), "정상");
        $('.community.input').val('');
        // loadBoardList();
    })

    // 글 수정
    $('.update-post-yes').on('click', function () {
        API_posts_PUT_UpdatePost(memberId, $('.new-post-name.input').val(), $('.new-post-content.input').val(), "정상");
        $('.community.input').val('');
        // loadBoardList();
    })

    // 글 삭제
    $('.post-delete').on('click', function () {
        API_posts_DELETE_DeletePost(memberId, $('.new-post-name.input').val(), $('.new-post-content.input').val(), "정상");
        $('.community.input').val('');
        // loadBoardList();
    })
    


    loadBoardList();
    $('.board-new').attr('disabled', 'disabled');

    login(93); // 임시

});

function loadBoardList() {
    boardList = API_boards_GET_GetBoards();

    $('.board-list').empty();

    if (boardList != null) {
        loadBoard(boardList[0].id);
        for (let index = 0; index < boardList.length; index++) {
            $('.board-list').append(`<li><a class="dropdown-item" onclick="loadBoard(${boardList[index].id});">${boardList[index].title} 게시판</a></li>`);
        }
    }

    $('.board-list').append(`<li><hr class="dropdown-divider"></li>
                    <li><button type="button" class="btn board-new" data-bs-toggle="modal" data-bs-target="#new-board-modal">
                        새 게시판</button></li>`);
};

function loadBoard(boardId) {
    currentBoard = API_boards_GET_GetBoardById(boardId);
    $('.board-title').empty();
    $('.board-title').append(currentBoard.title);

    $('.board-creator').empty();
    $('.board-creator').append(API_members_GET_GetMember(currentBoard.memberId).nick);

    $('.board-content').empty();
    $('.board-content').append(currentBoard.content);
};



//     logAppend('personal function loaded');

//     $('.signout-yes').hide();
//     $('.signout-no').hide();

//     // 로그인시 회원정보 표시
//     $('#personal-tab').on('click', function () {
//         if (memberId != 0) {
//             member = API_GetMember(memberId);
//             $('.personal').removeAttr('disabled');
//             $('.personal.input.email').val(member.email);
//             $('.personal.input.email').attr('disabled', 'disabled');
//             $('.personal.input.nick').val(member.nick);
//             $('.personal.signout-btn').removeAttr('disabled');
//         } else {
//             $('.personal.input').val('');
//             $('.personal.input').attr('disabled', 'disabled');
//             $('.personal.signout-btn').attr('disabled', 'disabled');
//         }
//     });

//     // [변경 요청]
//     $('.personal.cnfm.btn').on('click', function () {
//         if ($('.personal.input.pwd').val() != $('.personal.input.cnfm').val()) {
//             alert("비밀번호와 확인이 일치하지 않습니다");
//             return;
//         }
//         if ($('.personal.input.nick').val() == '') {
//             alert("닉네임을 입력하지 않았습니다");
//             return;
//         }

//         var requestNick = $('.personal.input.nick').val();
//         if (requestNick != member.nick) {
//             // 닉 중복 확인
//             var nicks = API_GetNicks();
//             for (var i = 0; i < nicks.length; i += 1) {
//                 logAppend("닉네임 비교중 " + nicks[i]);
//                 if (requestNick == nicks[i] && member.nick != nicks[i]) {
//                     alert("이미 사용중인 닉네임 입니다");
//                     return;
//                 }
//             }
//         }

//         if (requestNick == member.nick && ($('.personal.input.pwd').val() == "" || $('.personal.input.pwd').val() == member.password)) {
//             alert("변경할 정보가 없습니다");
//             return;
//         }

//         var result = API_Update($('.personal.input.email').val(), $('.personal.input.nick').val(), $('.personal.input.pwd').val());
//         if (result == null) {
//             alert("에러 발생");
//             return;
//         }
//         alert("회원정보 변경 완료");
//     });

//     $('.personal.signout-btn').on('click', function () {
//         $('.signout-yes').show();
//         $('.signout-no').show();
//         $('.personal.signout-btn').attr('disabled', 'disabled');
//     });

//     $('.signout-yes').on('click', function () {
//         API_DeleteMember(memberId);
//         location.reload();
//     });

//     $('.signout-no').on('click', function () {
//         $('.signout-yes').hide();
//         $('.signout-no').hide();
//         $('.personal.signout-btn').removeAttr('disabled');
//     });
// });
