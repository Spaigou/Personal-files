var main = function () {
    "use strict";

    var $input = $('<input>'),
        $inputLabel = $('<h2>').text('Добро пожаловать!'),
        $button = $('<button>').text('Войти');

    $("main .authorization").append($inputLabel).append($input).append($button);

    $button.on('click', function () {
        var username = $input.val();
        if (username !== null && username.trim() !== "") {
            $.get("user/" + username, function (user) {
                if (user !== null) {
                    if (user.role == 'admin') {
                        location.href = username + "/admin.html";
                    } else if (user.role == 'user') {
                        location.href = username + "/users.html";
                    } else if (user.role == 'moderator') {
                        location.href = username + "/moderators.html";
                    }
                } else {
                    alert("Неверное имя пользователя");
                    $input.val("");
                }
            })
        } else {
            alert("Вы ничего не ввели...");
        }
    })

    $input.keypress(function (e) {
        if (e.keyCode === 13) {
            $button.click();
        }
    })
}

$(document).ready(main);