let searchItemId;
$(document).ready(function () {

    // 검색창
    var placeholderTarget = $('.textbox input[type="text"]');

    //포커스시
    placeholderTarget.on('focus', function () {
        $(this).siblings('label').fadeOut('fast');
    });

    //포커스아웃시
    placeholderTarget.on('focusout', function () {
        if ($(this).val() == '') {
            $(this).siblings('label').fadeIn('fast');
        }
    });

    // 검색어 입력시
    $('#query').on('keypress', function (e) {
        if (e.key == 'Enter') {
            execSearch();
        }
    });

    showProduct();
})
// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }


// 장바구니 목록 출력
function showProduct() {
    $.ajax({
        type: 'GET',
        url: '/api/products',
        success: function (response) {
            $('#myproducts_body').empty();
            for (let i = 0; i < response.length; i++) {
                $('#myproducts_body').prepend(dtoToItem(response[i]));

                $('#log_body').append(`<br>장바구니 목록 출력 중<br>`)
                $('#log_body').append(JSON.stringify(response[i]));
                $("#log_body").scrollTop($("#log_body")[0].scrollHeight);
            }
        }
    })
}

// 상품 검색
function execSearch() {
    // 입력 확인
    let query = $('#query').val();
    if (query == '') {
        alert('검색어를 입력해주세요');
        $('#query').focus();
        return;
    }
    // 검색 결과 출력
    $.ajax({
        type: 'GET',
        url: `/api/search?query=${query}`,
        success: function (response) {
            $('#search_body').empty();
            searchItemId = 0;
            for (let i = 0; i < response.length; i++) {
                searchItemId++;
                let itemDto = response[i];
                itemDto.id = searchItemId;
                let item = dtoToItem(itemDto);
                $('#search_body').append(item);

                $('#log_body').append(`<br>검색 결과 출력 중<br>`)
                $('#log_body').append(JSON.stringify(itemDto));
                $("#log_body").scrollTop($("#log_body")[0].scrollHeight);
            }
        }
    })
}


// 장바구니로 이동
function addProduct(itemDto) {
    // 검색 결과 목록에서 삭제
    $('.content.search' + itemDto.id).hide();
    // 추가 요청
    $.ajax({
        type: "POST",
        url: '/api/products',
        contentType: "application/json",
        data: JSON.stringify(itemDto),
        success: function (response) {
            let item = dtoToItem(response);
            $('#myproducts_body').prepend(item);

            $('#log_body').append(`<br>장바구니로 이동 중<br>`)
            $('#log_body').append(JSON.stringify(response));
            $("#log_body").scrollTop($("#log_body")[0].scrollHeight);
        }
    })
}

// 장바구니에서 상품 삭제
function deleteProductItem(id) {
    $.ajax({
        type: 'DELETE',
        url: `/api/products?id=${id}`,
        success: function (response) {
            $('.content.myproducts' + response).hide();

            $('#log_body').append(`<br>장바구니에서 상품 삭제<br>`);
            $('#log_body').append(JSON.stringify(response));
            $("#log_body").scrollTop($("#log_body")[0].scrollHeight);
        }
    })
}

// 아이템 출력
function dtoToItem(itemDto) {
    var item = `<div class="inline content `;

    item += itemDto.tprice == null ?
        `search${itemDto.id}"><div class="itemDto block"><button onclick='addProduct(${JSON.stringify(itemDto)})'>담기</button>` :
        `myproducts${itemDto.id}"><div class="itemDto block"><button onclick='deleteProductItem(${itemDto.id})'>삭제</button>`;
    
    item += `<div class="thumbnail"><img src="${itemDto.image}" alt="상품 이미지"></div>
        <div class="title" onclick="window.open('${itemDto.link}')">${itemDto.title}</div>
        <div class="price">${itemDto.lprice}원`;
    
    item += itemDto.tprice == null ? `` : `<button class="check myproducts${itemDto.id}" onclick='checkPrice(${JSON.stringify(itemDto)})'>최저가 확인</button>`;
    
    return item + `</div></div></div>`;
}


function checkPrice(itemDto) {
    $('.check.myproducts' + itemDto.id).hide();
    
    $.ajax({
        type: 'GET',
        url: `/api/search?query=${itemDto.title}`,
        success: function (response) {
            for (let i = 0; i < response.length; i++) {

                $('#log_body').append(`<br>최저가 비교 중<br>`)
                $('#log_body').append(JSON.stringify(response[i]));
                $("#log_body").scrollTop($("#log_body")[0].scrollHeight);
                if (response[i].lprice < itemDto.lprice) {
                    $('.content.myproducts' + itemDto.id).append(status(response[i]));

                    $('#log_body').append(`<br>최저가 확인됨<br>`)
                    $("#log_body").scrollTop($("#log_body")[0].scrollHeight);
                    return;
                }
            }
            $('#log_body').append(`<br>현재 최저가<br>`)
            $("#log_body").scrollTop($("#log_body")[0].scrollHeight);
            $('.content.myproducts' + itemDto.id).append(`<div class="itemDto block" style="background-color: rgba(255, 0, 0, 0); border: 0;"><div style="height: 50%; border: 0;"></div><div class="lowprice">현재 최저가</div></div>`);
        }
    })
}

function hideStatus(itemDto) {
    $('.status' + itemDto.id).hide();
}

function status(itemDto) {
    return `<div class="itemDto block status${itemDto.id} lowprice"><button onclick='addProduct(${JSON.stringify(itemDto)}); hideStatus(${JSON.stringify(itemDto)});'>담기</button>
                <div class="thumbnail">
                    <img src="${itemDto.image}" alt="상품 이미지">
                </div>
                <div class="title" onclick="window.open('${itemDto.link}')">
                    ${itemDto.title}
                </div>
                <div class="price">
                    ${itemDto.lprice}원
                </div>
            </div>`;
}
