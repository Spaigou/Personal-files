var main = function () {
    "use strict";

    var tabs = [];
    tabs.push({
        "name": "Общие сведения",
        "content": function (callback) {
            var $content = $("<div>").addClass("content");
            $.getJSON("files.json", function (files) {
                var $name = $("<p>").text("Имя: " + files[0].minorInfo.name),
                    $surname = $("<p>").text("Фамилия: " + files[0].minorInfo.surname),
                    $middle = $("<p>").text("Отчество: " + files[0].minorInfo.middle_name);
                $content.append($name).append($surname).append($middle);
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            })
        }
    })
    tabs.push({
        "name": "Студент",
        "content": function (callback) {
            var $content = $("<div>").addClass("content");
            $.getJSON("files.json", function (files) {
                var $qualification = $("<p>").text("Квалификация: " + files[0].student.qualification);
                $content.append($qualification);
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            })
        }
    })

    tabs.forEach(function (tab) {
        var $tabName = $("<h3>").text(tab.name),
            $tab = $("<div>").addClass("tab");
        $tab.append($tabName);
        $("main .fields").append($tab);
        tab.content(function (err, $content) {
            if (err !== null) {
                alert("Возникла ошибка при обработке запроса: ", err);
            } else {
                $tab.append($content);
            }
        });
    });

};

$(document).ready(main);
