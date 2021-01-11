var memberId = 0;

$(document).ready(function () {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    $('.member-id.btn').on('click', function () {
        memberId = 0;
    });

    $("#home").load("home.html");
    $("#signup").load("signup.html");
    $("#login").load("login.html");
    $("#personal").load("personal.html");
})
