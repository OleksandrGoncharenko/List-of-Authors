$(document).ready(function () {
    if (window.localStorage["authorStorage"] == null) {                            // Проверка наличия записей в Local Storage
        authorsObj = JSON.parse(authorsJson);                                                                                   // Если их нет, создается новый объект из строки JSON
    }                                                                              // Если есть, то создается объект из строки JSON в Local Storage
    else {
        authorsObj = JSON.parse(window.localStorage.getItem("authorStorage"));
    };

    $("#newBirthDate").datepicker({ dateFormat: "dd.mm.yy" });                     //Добавление datepicker
    $("#addBirthDate").datepicker({ dateFormat: "dd.mm.yy" });
        function createTable  () {                                                // Функция для создания таблицы на основе объекта
        var checkAuthor = document.getElementById("authorBody");                   // Если таблица уже существует, то она удаляется, 
        if (checkAuthor != null) {                                                 // и создается новая, на основе обновленного объекта
            checkAuthor.remove();
        };
        var authorTableBody = document.createElement("tbody");                     // Создание таблицы авторов и добавление ее в разметку
        var authorHead = document.getElementById("authorsInfo");
        authorTableBody.setAttribute("id", "authorBody");
        authorHead.appendChild(authorTableBody);

        for (var authors in authorsObj) {                                           // Перебор свойств объекта и добавление строк и ячеек

            var authorRow = document.createElement("tr");
            authorRow.setAttribute("data-author", authors);
            authorTableBody.appendChild(authorRow);

            for (var author in authorsObj[authors]) {
                var colmn = document.createElement("td");
                colmn.innerHTML = authorsObj[authors][author];
                authorRow.appendChild(colmn);

            }
            var authorListTd = document.createElement("td");                             // Добавление кнопки редаткирование, удаления автора и вызова списка книг
            authorListTd.setAttribute("data-list", authors);
            authorListTd.innerHTML = '<input type="button" value="Список книг" class="btn btn-success" id="listBtn"/>';
            var delAuthorTd = document.createElement("td");
            delAuthorTd.setAttribute("data-delnum", authors);
            delAuthorTd.innerHTML = '<input type="button" value="Удалить" class="btn btn-danger" id="delAuthBtn"/>';
            var editAuthorTd = document.createElement("td");
            editAuthorTd.setAttribute("data-authEdit", authors);
            editAuthorTd.innerHTML = '<input type="button" value="Редактировать" class="btn btn-info" id="editAuthBtn"/>';
            authorListTd.addEventListener("click", booksTableCreate);
            delAuthorTd.addEventListener("click", delAuthorFunc);
            editAuthorTd.addEventListener("click", editAuthorFunc);
            authorRow.appendChild(authorListTd);
            authorRow.appendChild(delAuthorTd);
            authorRow.appendChild(editAuthorTd);
        }

        window.localStorage["authorStorage"] = JSON.stringify(authorsObj);                // Запись объекта в строку JSON и сохранение ее в Local Storage
    };

    function delAuthorFunc() {                                                            // Удаления из таблицы данных про автора
        var authordel = this.getAttribute("data-delnum");
        delete authorsObj[authordel];                                                     //Удаление из объекта данных про автора 
        delete booksObj[authordel];                                                       //и данных про список книг удаленного автора
        window.localStorage["bookStorage"] = JSON.stringify(booksObj);
        createTable();
    };


    function editAuthorFunc() {                                                           // Открытие формы для редактированния данных про автора
        var editAuthorForm = document.getElementById("editAuthorForm");
        editAuthorForm.style.visibility = "visible";
        var editAuthorNum = this.getAttribute("data-authEdit");
        editAuthorForm.setAttribute("data-authForm", editAuthorNum);
        document.getElementById("addFirstName").value = authorsObj[editAuthorNum]["firstname"];
        document.getElementById("addMidleName").value = authorsObj[editAuthorNum]["midlname"];
        document.getElementById("addSecondName").value = authorsObj[editAuthorNum]["secondname"];
        document.getElementById("addBirthDate").value = authorsObj[editAuthorNum]["birthdate"];
        document.getElementById("close").addEventListener("click", closeAuthorEdit);
        document.getElementById("edit").addEventListener("click", acceptAuthor);
    };

    function closeAuthorEdit() {                                                       // Закрытие формы для редактирования
        $("#editAuthorForm").css("visibility", "hidden");
    };

    function acceptAuthor(e) {                                                         // Применение внесенных изменений 
        var editAuthorForm = document.getElementById("editAuthorForm");
        var authorAcceptNum = editAuthorForm.getAttribute("data-authForm");
        var firstNameEdit = document.getElementById("addFirstName").value;
        var midlNameEdit = document.getElementById("addMidleName").value;
        var secondNameEdit = document.getElementById("addSecondName").value;
        var birthDateEdit = document.getElementById("addBirthDate").value;
        if (firstNameEdit.length > 0 && midlNameEdit.length > 0 && secondNameEdit.length > 0 && birthDateEdit.length > 0) {   //Если есть незаполненные поля,
            authorsObj[authorAcceptNum]["firstname"] = firstNameEdit;                                                         //функция не выполнится
            authorsObj[authorAcceptNum]["midlname"] = midlNameEdit;
            authorsObj[authorAcceptNum]["secondname"] = secondNameEdit;
            authorsObj[authorAcceptNum]["birthdate"] = birthDateEdit;
            $("#editAuthorForm").css("visibility", "hidden");
            createTable();
        }
        else {
            e.preventDefault();
            alert("Заполните все поля!");
        }
    };

    $("#addAuthorBtn").on("click", function (e) {
        var firstval = document.getElementById("newFirstName").value;
        var midlval = document.getElementById("newMidleName").value;
        var secondval = document.getElementById("newSecondName").value;
        var birthval = document.getElementById("newBirthDate").value;

        if (firstval.length > 0 && midlval.length > 0 && secondval.length > 0 && birthval.length > 0) {

            var objectname = {                                                              //Если есть незаполненные поля,
                firstname: firstval,                                                        //функция не выполнится
                midlname: midlval,
                secondname: secondval,
                birthdate: birthval
            };
            var authorNumber = 0;
            for (var i in authorsObj) {
                authorNumber++;
                var objNumber = "author" + (authorNumber + 1);
            };
            authorsObj[objNumber] = objectname;                                             //При добавлении автора                                        
            booksObj[objNumber] = {};                                                       //в объект списка книг добавляется новый объект
            createTable();
            document.getElementById("newFirstName").value = "";                             //После добавления автора, поля для заполнения
            document.getElementById("newMidleName").value = "";                             //данных остаются пустыми
            document.getElementById("newSecondName").value = "";
            document.getElementById("newBirthDate").value = "";
            $("#addAuthorForm").css('visibility', 'hidden');
            $("#showAddAuthor").css('visibility', 'visible');
            window.localStorage["bookStorage"] = JSON.stringify(booksObj);
        }
        else {
            e.preventDefault();
            alert("Заполните все поля!");
        }
    });
    createTable();

    function booksTableCreate() {
        booknum = this.getAttribute("data-list");
        newBookObj = booksObj[booknum];
        booksTable();
    };
});