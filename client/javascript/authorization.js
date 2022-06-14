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
                        $.get("/files/" + $input.val(), function (file) {
                            if (file) {
                                location.href = username + "/user.html";
                            } else {
                                alert("Ваше личное дело ещё не сформировано. Обратитесь к модератору.")
                            }
                        })
                    } else if (user.role == 'moderator') {
                        location.href = username + "/moderator.html";
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