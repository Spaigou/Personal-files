var main = function () {
    "use strict";
    var tabs = [],
        $content = $("<div>").addClass("content");
    tabs.push({
        "name": "Пользователи",
        "content": function (callback) {
            $.getJSON("users.json", function (users) {
                var $list = $("<ul>");
                users.forEach(function (user) {
                    var $userListItem = liaWithEditAndDeleteOnClick(user);
                    $list.append($userListItem);
                });
                $content.append($list);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            })
            var $inputBox = $("<div>").addClass("input-box"),
                $inputLabel = $("<p>").text("Имя"),
                $input = $("<input>").addClass("input"),
                $roleLabel = $("<p>").text("Роль"),
                $selectRole = $("<select>"),
                $button = $("<button>").text("Добавить").addClass("button");
            $selectRole.append($("<option>").val("user").text("Пользователь")).
                append($("<option>").val("moderator").text("Модератор")).
                append($("<option>").val("admin").text("Администратор"));
            $input.keydown(function (e) {
                if (e.keyCode == 13) {
                    $button.click();
                }
            })
            $button.on("click", function () {
                var username = $input.val(),
                    role = $selectRole.val();
                if (username !== '') {
                    $.post("users", { "username": username, "role":  role }, function (result) {
                        alert("Добавлено успешно!");
                        $(".tabs a:nth-child(1) span").trigger("click");
                    }).fail(function (err) {
                        alert(err.responseText);
                    })
                } else {
                    alert("Поля не должны быть пустыми!");
                }
            })

            $inputBox.append($inputLabel).append($input).append($roleLabel).append($selectRole).append($button);
            $content.append($inputBox);
            callback(null, $content);
        }
    })

    tabs.forEach(function (tab) {
        var $aElement = $("<a>").attr("href", "#"),
            $spanElement = $("<span>").text(tab.name);
        $aElement.append($spanElement);
        $("main .tabs").append($aElement).append($content);
        $spanElement.on("click", function () {
            $(".tabs a span").removeClass("active");
            $spanElement.addClass("active");
            $("main .content").empty();
            tab.content(function (err, $content) {
                if (err !== null) {
                    alert("Возникла ошибка при обработке запроса: ", err);
                } else {
                    $("main .content").append($content);
                }
            });
            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

var liaWithEditAndDeleteOnClick = function (user) {
    var $userListItem = $("<li>").text(user.username + " (" + user.role + ")"),
        $userRemoveLink = $("<a>").attr("href", "users/" + user._id),
        $userEditLink = $("<a>").attr("href", "users/" + user._id);
    $userRemoveLink.text("Удалить");
    $userEditLink.text("Редактировать");

    $userEditLink.on("click", function () {
        var newUsername = prompt(
            "Введите новое значение для пользователя \"" + user.username + "\""
        );
        if (newUsername !== null && newUsername.trim() !== "") {
            $.ajax({
                "url": "users/" + user._id,
                "type": "PUT",
                "data": { "username": newUsername }
            }).done(function (response) {
                alert("Updated successfully!");
                if (user.role == 'Админ') {
                    location.href = "/" + newUsername + "/admin.html";
                } else {
                    location.reload();
                }
            }).fail(function (err) {
                alert("Error:", err);
            })
        }
        return false;
    })

    $userRemoveLink.on('click', function () {
        if (user.role != 'Админ') {
            if (confirm("Вы уверены?")) {
                $.ajax({
                    "url": "users/" + user._id,
                    "type": "DELETE"
                }).done(function (response) {
                    alert("Deleted successfully!");
                    location.reload();
                }).fail(function (err) {
                    console.log("Error on delete 'user'!");
                });
            }
        } else {
            alert('Удалить администратора невозможно.');
        }
        return false;
    })

    $userListItem.append($userRemoveLink).append($userEditLink);
    return $userListItem;
}

$(document).ready(main);
