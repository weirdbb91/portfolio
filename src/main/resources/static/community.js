// // 4번째 포폴 기능 - 게시판
var boardList = [];
var postList = [];
var currentBoard;
var currentPost;

$(document).ready(function () {

    loadBoardList();
    $('.board-new').attr('disabled', 'disabled');

    login(93); // 임시

    $('.post-new').on('click', function () {
        $('.community.input').val('');
        $('.new-yes').addClass('post-new-yes');
    });
    $('.post-update').on('click', function () {
        if (currentPost.memberId != memberId) {
            alert('작성자만 할 수 있습니다');
            return;
        }
        $('.community.input').val('');
        $('.new-yes').addClass('post-update-yes');
        if (currentPost == null) {
            alert("수정할 글이 없습니다");
            return;
        }
        $('.new-name.input').val(currentPost.title);
        $('.new-content.input').val(currentPost.content);
    });
    $('.post-delete').on('click', function () {
        if (currentPost.memberId != memberId) {
            alert('작성자만 할 수 있습니다');
            return;
        }
        API_posts_DELETE_DeletePost(currentPost.id);
        loadPostList(currentBoard.id);
    });

    $('.board-new').on('click', function () {
        $('.community.input').val('');
        $('.new-yes').addClass('board-new-yes');
    });
    $('.board-update').on('click', function () {
        if (currentBoard.memberId != memberId) {
            alert('작성자만 할 수 있습니다');
            return;
        }
        $('.community.input').val('');
        $('.new-yes').addClass('board-update-yes');
        $('.new-name.input').val(currentBoard.title);
        $('.new-content.input').val(currentBoard.content);
    });
    $('.board-delete').on('click', function () {
        if (currentBoard.memberId != memberId) {
            alert('작성자만 할 수 있습니다');
            return;
        }
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

            $('.board-post').empty();
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
    boardList = API_boards_GET_GetBoards();

    $('.board-list').empty();

    if (boardList != null) {
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
    $('.board-creator').append(API_members_GET_GetMember(currentBoard.memberId).nick);

    $('.board-content').empty();
    $('.board-content').append(currentBoard.content);

    loadPostList(boardId);
};

function loadPostList(boardId) {
    postList = API_posts_GET_GetPostListByBoardId(boardId);

    $('.board-post-list').empty();
    $('.board-post').empty();
    if (postList != null) {
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

    var creator = API_members_GET_GetMember(currentPost.memberId);    
    $('.board-post').empty();
    $('.board-post').append(`   <div class="col-12 p-3">${currentPost.title}</div>
                                <div class="col-12 p-1 border-bottom"> 작성자 : ${creator.nick}</div>
                                <div class="p-2">${currentPost.content}</div>`);
}