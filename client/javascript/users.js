var main = function () {
    "use strict";

    var tabs = [];
    tabs.push({
        "name": "Общие сведения",
        "content": function (callback) {
            var $content = $("<div>").addClass("content");
            $.getJSON("files.json", function (file) {
                var $name = $("<p>").text("Имя: " + file.minorInfo.name),
                    $surname = $("<p>").text("Фамилия: " + file.minorInfo.surname),
                    $middle = $("<p>").text("Отчество: " + file.minorInfo.middle_name),
                    $gender = $("<p>").text("Пол: " + file.minorInfo.gender),
                    $age = $("<p>").text("Возраст: " + file.minorInfo.age);
                $content.append($name).append($surname).append($middle).
                    append($gender).append($age);
                callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
                callback(error, null);
            })
        }
    })
    tabs.push({
        "name": "Информация об обучении",
        "content": function (callback) {
            var $content = $("<div>").addClass("content");
            $.getJSON("files.json", function (file) {
                var $qualification = $("<p>").text("Квалификация: " + file.studyInfo.qualification),
                    $profile = $("<p>").text("Профиль обучения: " + file.studyInfo.profile),
                    $faculty = $("<p>").text("Факультет: " + file.studyInfo.faculty),
                    $dept = $("<p>").text("Кафедра: " + file.studyInfo.dept),
                    $groupNumber = $("<p>").text("Номер группы: " + file.studyInfo.groupNumber),
                    $recordBookNumber = $("<p>").text("Номер зачетной книжки: " + file.studyInfo.recordBookNumber);
                $content.append($qualification).append($profile).append($faculty).
                    append($dept).append($groupNumber).append($recordBookNumber);
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
