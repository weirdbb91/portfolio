// // 4번째 포폴 기능 - 게시판
var boardList = [];
var postList = [];
var currentBoard;
var currentPost;
var creator;

$(document).ready(function () {

    loadBoardList();
    $('.board-new').attr('disabled', 'disabled');

    $('.post-new').on('click', function () {
        $('.community.input').val('');
        $('.new-yes').addClass('post-new-yes');
    });
    $('.post-update').on('click', function () {
        $('.community.input').val('');
        $('.new-yes').addClass('post-update-yes');
        $('.new-name.input').val(currentPost.title);
        $('.new-content.input').val(currentPost.content);
    });
    $('.post-delete').on('click', function () {
        API_posts_DELETE_DeletePost(currentPost.id);
        loadPostList(currentBoard.id);
    });

    $('.board-new').on('click', function () {
        $('.community.input').val('');
        $('.new-yes').addClass('board-new-yes');
    });    
    $('.board-update').on('click', function () {
        $('.community.input').val('');
        $('.new-yes').addClass('board-update-yes');
        $('.new-name.input').val(currentBoard.title);
        $('.new-content.input').val(currentBoard.content);
    });
    $('.board-delete').on('click', function () {
        API_boards_DELETE_DeleteBoard(currentBoard.id);
        loadBoardList();
    });

    // 새 게시판/글
    $('.new-yes').on('click', function () {
        if ($(this).hasClass('post-new-yes')) {
            API_posts_POST_PostPost(memberId, currentBoard.id, $('.new-name.input').val(), $('.new-content.input').val(), "정상");
            $('.community.input').val('');
            loadPostList(currentBoard.id);
            return;
        }
        if ($(this).hasClass('board-new-yes')) {
            API_boards_POST_PostBoard(memberId, $('.new-name.input').val(), $('.new-content.input').val(), "정상");
            $('.community.input').val('');
            loadBoardList();
            return;
        }

        if (currentBoard.memberId != memberId) {
            alert('작성자만 할 수 있습니다');
            return;
        }

        if ($(this).hasClass('post-update-yes')) {
            API_posts_PUT_UpdatePost(currentPost.id, $('.new-name.input').val(), $('.new-content.input').val(), "정상");
            $('.community.input').val('');
            
            var updatedPostId = currentPost.id;
            loadPostList(currentBoard.id);

            $('.board-post-content').empty();
            loadPost(updatedPostId);
        }
        if ($(this).hasClass('board-update-yes')) {
            API_boards_PUT_UpdateBoard(currentBoard.id, $('.new-name.input').val(), $('.new-content.input').val(), "정상");
            $('.community.input').val('');
            loadBoardList();
        }

        $('.new-yes').removeClass('post-new-yes');
        $('.new-yes').removeClass('board-new-yes');
        $('.new-yes').removeClass('post-update-yes');
        $('.new-yes').removeClass('board-update-yes');
    })
});

function loadBoardList() {
    currentPost = null;
    boardList = API_boards_GET_GetBoardList();

    $('.board-list').empty();

    if (Object.keys(boardList).length > 0) {
        loadBoard(boardList[0].id);
        for (let index = 0; index < boardList.length; index++) {
            $('.board-list').append(`<li><a class="dropdown-item" onclick="loadBoard(${boardList[index].id});">${boardList[index].title} 게시판</a></li>`);
        }
    }

    $('.board-list').append(`<li><hr class="dropdown-divider"></li>
                    <li><button type="button" class="btn board-new" data-bs-toggle="modal" data-bs-target="#new-modal">
                        새 게시판</button></li>`);
};

function loadBoard(boardId) {
    currentBoard = API_boards_GET_GetBoardById(boardId);
    currentPost = null;
    $('.board-title').empty();
    $('.board-title').append(currentBoard.title);

    $('.board-creator').empty();
    creator = API_members_GET_GetMember(currentBoard.memberId);
    $('.board-creator').append(creator.nick);

    $('.board-content').empty();
    $('.board-content').append(currentBoard.content);
    if (memberId == currentBoard.memberId) {
        $('.board-update').removeAttr("disabled");
        $('.board-delete').removeAttr("disabled");
    } else {
        $('.board-update').attr("disabled", "disabled");
        $('.board-delete').attr("disabled", "disabled");
    }

    loadPostList(boardId);
};

function loadPostList(boardId) {
    postList = API_posts_GET_GetPostListByBoardId(boardId);

    $('.board-post-list').empty();
    $('.board-post-content').empty();
    if (Object.keys(postList).length > 0) {
        loadPost(postList[0].id);
        for (let index = 0; index < postList.length; index++) {
            $('.board-post-list').append(`<li><div class="btn" onclick="loadPost(${postList[index].id});">${postList[index].title}</div></li>`);
        }
        return;
    }
};

function loadPost(id) {
    for (let index = 0; index < postList.length; index++) {
        if (postList[index].id == id) {
            currentPost = postList[index];
            break;
        }
    }

    creator = API_members_GET_GetMember(currentPost.memberId);
    $('.board-post-content').empty();
    $('.board-post-content').append(`   <div class="col-12 p-3 fs-2">${currentPost.title}</div>
    <div class="col-12 p-2 border-bottom fs-6"> 작성자 : ${creator.nick}</div>
    <div class="p-2">${currentPost.content}</div>`);
    
    $('.board-post-content').append(`   <div class="input-group mb-3 px-2">
    <button class="post-update btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#new-modal" disabled="disabled">수정</button>
    <button class="post-delete btn btn-outline-secondary" type="button" disabled="disabled">삭제</button>
    </div>`);

    if (memberId == currentPost.memberId) {
        $('.post-update').removeAttr("disabled");
        $('.post-delete').removeAttr("disabled");
    }
}