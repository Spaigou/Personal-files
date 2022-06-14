var main = function () {
    "use strict";

    var $moderField = $("<div>").addClass("moder-field");
    $("main .container").append($moderField);
    $("main .container").append($("<div>").addClass("tabs"));
    var $select = $("<select>");
    $.getJSON("users.json", function (users) {
        users.forEach(function (user) {
            if (user.role == "user")
                $select.append($("<option>").val(user.username).text(user.username));
        })
    })
    $moderField.append($select);
    var $addButton = $("<button>").text("Добавить"),
        $editButton = $("<button>").text("Изменить"),
        $deleteButton = $("<button>").text("Удалить");
    $moderField.append($addButton).append($editButton).append($deleteButton);

    $editButton.on("click", function (e) {
        $.get("/files/" + $select.val(), function (file) {
            if (file) {
                $("main .tab").remove();
                $deleteButton.prop("disabled", false);
                var $tabName = $("<h3>").text("Общие сведения"),
                    $tab = $("<div>").addClass("tab");
                $tab.append($tabName);
                $("main .moder-field").append($tab);
                editField(function (err, $content) {
                    if (err !== null) {
                        alert("Возникла ошибка при обработке запроса: ", err);
                    } else {
                        $tab.append($content);
                    }
                }, $select);
            } else {
                alert("Для данного пользователя личное дело ещё не сформировано!");
            }
        })
    })

    $deleteButton.on("click", function (e) {
        if (confirm("Вы уверены?")) {
            $.ajax({
                "url": "files/" + $select.val(),
                "type": "DELETE"
            }).done(function (response) {
                alert("Deleted successfully!");
                location.reload();
            }).fail(function (err) {
                console.log("Error on delete 'user'!");
            });
        }
    })

    $addButton.on("click", function (e) {
        $("main .tab").remove();
        $.get("/files/" + $select.val(), function (file) {
            if (file) {
                alert("На данного пользователя уже составлено личное дело!");
                $deleteButton.prop("disabled", false);
            } else {
                $deleteButton.prop("disabled", true);
                var
                    $tab = $("<div>").addClass("tab");
                $("main .moder-field").append($tab);
                addField(function (err, $content) {
                    if (err !== null) {
                        alert("Возникла ошибка при обработке запроса: ", err);
                    } else {
                        $tab.append($content);
                    }
                }, $select);
            }
        })
    })
};

var addField = function (callback, $select) {
    var $content = $("<div>").addClass("content");
    $.get("/files/" + $select.val(), function (file) {
        var $tab1Name = $("<h3>").text("Общие сведения"),
            $tab2Name = $("<h3>").text("Информация об обучении");
        var $name = $("<p>").text("Имя"),
            $nameInput = $("<input>").val(''),
            $surname = $("<p>").text("Фамилия"),
            $surnameInput = $("<input>").val(''),
            $middle = $("<p>").text("Отчество"),
            $middleNameInput = $("<input>").val(''),
            $gender = $("<p>").text("Пол"),
            $genderInput = $("<select>").append($("<option>").text("муж")).append($("<option>").text("жен")),
            $age = $("<p>").text("Возраст"),
            $ageInput = $("<input type='number'>").val(''),
            $submitButton = $("<button>").text("Сохранить");

        $content.append($tab1Name).append($name).append($nameInput).append($surname).
            append($surnameInput).append($middle).append($middleNameInput).
            append($gender).append($genderInput).append($age).
            append($ageInput);
        var $qualification = $("<p>").text("Квалификация"),
            $qualificationInput = $("<input>").val(''),
            $profile = $("<p>").text("Профиль"),
            $profileInput = $("<input>").val(''),
            $faculty = $("<p>").text("Факультет"),
            $facultyInput = $("<input>").val(''),
            $dept = $("<p>").text("Кафедра"),
            $deptInput = $("<input>").val(''),
            $groupNumber = $("<p>").text("Номер группы"),
            $groupNumberInput = $("<input type='number'>").val(''),
            $recordBookNumber = $("<p>").text("Номер зачетной книжки"),
            $recordBookNumberInput = $("<input type='number'>").val('');
        $content.append($tab2Name).append($qualification).append($qualificationInput).
            append($profile).append($profileInput).append($faculty).
            append($facultyInput).append($dept).append($deptInput).
            append($groupNumber).append($groupNumberInput).append($recordBookNumber).
            append($recordBookNumberInput).append($submitButton);
        $submitButton.on("click", function (e) {
            var $personalFile = {
                minorInfo: {
                    name: $nameInput.val(),
                    surname: $surnameInput.val(),
                    middle_name: $middleNameInput.val(),
                    gender: $genderInput.val(),
                    age: $ageInput.val()
                },
                studyInfo: {
                    qualification: $qualificationInput.val(),
                    profile: $profileInput.val(),
                    faculty: $facultyInput.val(),
                    dept: $deptInput.val(),
                    groupNumber: $groupNumberInput.val(),
                    recordBookNumber: $recordBookNumberInput.val()
                }
            }
            console.log($personalFile);
            $.post("files", {
                "personalFile": $personalFile,
                "username": $select.val()
            }, function (result) {
                alert('Данные сохранены');
                location.reload();
            }).fail(function (err) {
                alert(err.responseText);
            })
        })
        callback(null, $content);
    })
}

var editField = function (callback, $select) {
    var $content = $("<div>").addClass("content");
    $.get("/files/" + $select.val(), function (file) {
        var $tab1Name = $("<h3>").text("Общие сведения"),
            $tab2Name = $("<h3>").text("Информация об обучении");
        var $name = $("<p>").text("Имя"),
            $nameInput = $("<input>").val(file.minorInfo.name),
            $surname = $("<p>").text("Фамилия"),
            $surnameInput = $("<input>").val(file.minorInfo.surname),
            $middle = $("<p>").text("Отчество"),
            $middleNameInput = $("<input>").val(file.minorInfo.middle_name),
            $gender = $("<p>").text("Пол"),
            $genderInput = $("<select>").append($("<option>").text("муж")).append($("<option>").text("жен")).val(file.minorInfo.gender),

            $age = $("<p>").text("Возраст"),
            $ageInput = $("<input>").val(file.minorInfo.age),
            $submitButton = $("<button>").text("Сохранить");
        $content.append($name).append($nameInput).append($surname).
            append($surnameInput).append($middle).append($middleNameInput).
            append($gender).append($genderInput).append($age).
            append($ageInput);
        var $qualification = $("<p>").text("Квалификация"),
            $qualificationInput = $("<input>").val(file.studyInfo.qualification),
            $profile = $("<p>").text("Профиль"),
            $profileInput = $("<input>").val(file.studyInfo.profile),
            $faculty = $("<p>").text("Факультет"),
            $facultyInput = $("<input>").val(file.studyInfo.faculty),
            $dept = $("<p>").text("Кафедра"),
            $deptInput = $("<input>").val(file.studyInfo.dept),
            $groupNumber = $("<p>").text("Номер группы"),
            $groupNumberInput = $("<input type='number'>").val(file.studyInfo.groupNumber),
            $recordBookNumber = $("<p>").text("Номер зачетной книжки"),
            $recordBookNumberInput = $("<input type='number'>").val(file.studyInfo.recordBookNumber);
        $content.append($tab2Name).append($qualification).append($qualificationInput).
            append($profile).append($profileInput).append($faculty).
            append($facultyInput).append($dept).append($deptInput).
            append($groupNumber).append($groupNumberInput).append($recordBookNumber).
            append($recordBookNumberInput).append($submitButton);
        $submitButton.on("click", function (e) {
            var $minorInfo = {
                minorInfo: {
                    name: $nameInput.val(),
                    surname: $surnameInput.val(),
                    middle_name: $middleNameInput.val(),
                    gender: $genderInput.val(),
                    age: $ageInput.val()
                }
            }
            $.ajax({
                "url": "files/" + $select.val(),
                "type": "PUT",
                "data": { "minorInfo": $minorInfo }
            }).done(function (response) {
                alert("Updated successfully!");
                location.reload();
            }).fail(function (err) {
                alert("Error:", err);
            })
        })
        callback(null, $content);
    })
}

$(document).ready(main);
