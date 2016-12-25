$(document).ready(function () {
    authorsJson = `{
                    "author1": {
                        "firstname": "Антон",
                        "midlname": "Павлович",
                        "secondname": "Чехов",
                        "birthdate": "29.01.1860"
                    },
                    "author2": {
                        "firstname": "Николай",
                        "midlname": "Васильевич",
                        "secondname": "Гоголь",
                        "birthdate": "31.03.1809"
                    },
                    "author3": {
                        "firstname": "Федор",
                        "midlname": "Михайлович",
                        "secondname": "Достоевский",
                        "birthdate": "11.11.1821"
                    },
                    "author4": {
                        "firstname": "Лев",
                        "midlname": "Николаевич",
                        "secondname": "Толстой",
                        "birthdate": "09.09.1828"
                    }
    }`;    
});
$(document).ready(function () {
    booksJson = `{
        "author1": {
                "book1": {
                    "name": "Дама с собачкой",
                    "genre": "рассказ",
                    "amount": "64"
                },
                "book2": {
                    "name": "Вишневый сад",
                    "genre": "комедия,драма",
                    "amount": "352"
                },
                "book3": {
                    "name": "Чайка",
                    "genre": "комедия",
                    "amount": "288"
                },
                "book4": {
                    "name": "Каштанка",
                    "genre": "рассказ",
                    "amount": "96"
                }
        },
        "author2": {
                "book1": {
                    "name": "Мертвые души",
                    "genre": "поэма в прозе",
                    "amount": "352"
                },
                "book2": {
                    "name": "Тарас Бульба",
                    "genre": "повесть",
                    "amount": "113"
                },
                "book3": {
                    "name": "Вий",
                    "genre": "повесть",
                    "amount": "39"
                },
                "book4": {
                    "name": "Нос",
                    "genre": "повесть",
                    "amount": "47"
                }
         },
        "author3": {
               "book1": {
                    "name": "Преступление и наказание",
                    "genre": "роман",
                    "amount": "574"
                },
                "book2": {
                    "name": "Братья карамазовы",
                    "genre": "роман",
                    "amount": "784"
                },
                "book3": {
                    "name": "Идиот",
                    "genre": "роман",
                    "amount": "672"
                },
                "book4": {
                    "name": "Бесы",
                    "genre": "роман",
                    "amount": "509"
                }
          },
          "author4": {
               "book1": {
                    "name": "Война и мир",
                    "genre": "роман",
                    "amount": "1274"
                 },
                "book2": {
                    "name": "Анна Каренина",
                    "genre": "роман",
                    "amount": "776"
                },
                "book3": {
                    "name": "Семейное счастие",
                    "genre": "роман",
                    "amount": "384"
                },
                "book4": {
                    "name": "Воскресение",
                    "genre": "роман",
                    "amount": "640"
               }
          }
    }`;
});
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
$(document).ready(function () {
    if (window.localStorage["bookStorage"] == null) {
        booksObj = JSON.parse(booksJson);
    }
    else {
        booksObj = JSON.parse(window.localStorage.getItem("bookStorage"));
    };   

   booksTable = function () {                                                                  //Функция создания таблицы со списком книг автора
        $("#authorsDiv").css({ 'visibility': 'hidden', 'position': 'absolute' });
        $("#booksDiv").css({ 'visibility': 'visible', 'position': 'relative' });
        $("#authorsForm").css({ 'visibility': 'hidden', 'position': 'absolute' });
        $("#booksForm").css({ 'visibility': 'visible', 'position': 'relative' });
        $("#searchDiv").css({ 'visibility': 'hidden', 'position': 'absolute' });
        $("#searchResult").css({ 'visibility': 'hidden', 'position': 'absolute' });
        $("#addAuthorForm").css('visibility', 'hidden');
        $("#editAuthorForm").css('visibility', 'hidden');
        $("#showAddAuthor").css('visibility', 'hidden');
        $("#showAddBook").css('visibility', 'visible');
        document.getElementById("searchField").value = "";

        var checkBook = document.getElementById("bookBody");
        if (checkBook != null) {
            checkBook.remove();
        };                                                                                              //При откритие списка книг автора показывается имя, отчество и фамилия автора

        $("#currentAuthor").text(authorsObj[booknum]["firstname"] + " " + authorsObj[booknum]["midlname"] + " " + authorsObj[booknum]["secondname"]);

        var bookTableBody = document.createElement("tbody");
        var bookHead = document.getElementById("booksInfo");
        bookTableBody.setAttribute("id", "bookBody");
        bookHead.appendChild(bookTableBody);

        for (var books in newBookObj) {                                                // Перебор свойств объекта и добавление строк и ячеек

            var bookRow = document.createElement("tr");
            bookRow.setAttribute("data-book", books);
            bookTableBody.appendChild(bookRow);

            for (var book in newBookObj[books]) {
                var bookColmn = document.createElement("td");
                bookColmn.innerHTML = newBookObj[books][book];
                bookRow.appendChild(bookColmn);
            };

            var delBookTd = document.createElement("td");                          // Добавление кнопок удаления и редактирования книг               
            delBookTd.setAttribute("data-delBook", books);
            delBookTd.innerHTML = '<input type="button" value="Удалить" class="btn btn-danger" id="delBook"/>';
            var editBookTd = document.createElement("td");
            editBookTd.setAttribute("data-editBook", books);
            editBookTd.innerHTML = '<input type="button" value="Редактировать" class="btn btn-info" id="editBook"/>';
            delBookTd.addEventListener("click", delBookFunc);
            editBookTd.addEventListener("click", editBookFunc);
            bookRow.appendChild(delBookTd);
            bookRow.appendChild(editBookTd);
        };

        window.localStorage["bookStorage"] = JSON.stringify(booksObj);                // Запись объекта в строку JSON и сохранение ее в Local Storage
    };

   delBookFunc = function() {                                                               //Удаления книги из таблицы
        var bookDel = this.getAttribute("data-delBook");
        delete newBookObj[bookDel];
        booksTable();
    };

    function editBookFunc() {                                                              //Редактирование данных про книгу
        var editBookForm = document.getElementById("editBookForm");
        editBookForm.style.visibility = "visible";
        var editBookNum = this.getAttribute("data-editBook");
        editBookForm.setAttribute("data-bookForm", editBookNum);
        document.getElementById("addBookName").value = newBookObj[editBookNum]["name"];
        document.getElementById("addBookGenre").value = newBookObj[editBookNum]["genre"];
        document.getElementById("addPageAmount").value = newBookObj[editBookNum]["amount"];
        document.getElementById("closeBookBtn").addEventListener("click", closeBookEdit);
        document.getElementById("editBookBtn").addEventListener("click", acceptBook);
    };

    function closeBookEdit() {                                                            // Закрытие формы для редактирования данных про книгу                                     
        $("#editBookForm").css("visibility", "hidden");
    };

    function acceptBook(e) {                                                              // Применение внесенных изменений 
        var editBookForm = document.getElementById("editBookForm");
        var acceptBookNum = editBookForm.getAttribute("data-bookForm");
        var bookNameEdit = document.getElementById("addBookName").value;
        var bookGenreEdit = document.getElementById("addBookGenre").value;
        var pageAmountEdit = document.getElementById("addPageAmount").value;
        if (bookNameEdit.length > 0 && bookGenreEdit.length > 0 && pageAmountEdit.length > 0) {
            newBookObj[acceptBookNum]["name"] = bookNameEdit;
            newBookObj[acceptBookNum]["genre"] = bookGenreEdit;
            newBookObj[acceptBookNum]["amount"] = pageAmountEdit;
            $("#editBookForm").css("visibility", "hidden");
            booksTable();
        }
        else {
            e.preventDefault();
            alert("Заполните все поля!");
        }
    };

    $("#addBookBtn").on("click", function (e) {
        var bookNameVal = document.getElementById("newBookName").value;
        var bookGenreVal = document.getElementById("newBookGenre").value;
        var pageVal = document.getElementById("newPageAmount").value;

        if (bookNameVal.length > 0 && bookGenreVal.length > 0 && pageVal.length > 0) {     //Если есть незаполненные поля, функция не выполнится

            var bookObjectName = {
                name: bookNameVal,
                genre: bookGenreVal,
                amount: pageVal
            };
            var bookNumber = 0;
            for (var i in newBookObj) {
                bookNumber++;
                var bookObjNumber = "book" + (bookNumber + 1);
            };
            newBookObj[bookObjNumber] = bookObjectName;
            booksTable();
            document.getElementById("newBookName").value = "";
            document.getElementById("newBookGenre").value = "";
            document.getElementById("newPageAmount").value = "";
            $("#addBookForm").css('visibility', 'hidden');
        }
        else {
            e.preventDefault();
            alert("Заполните все поля!");
        }
    });    
});
$(document).ready(function () {
    $("#search").on("click", function () {                                                    //Поиск книги по названию
        var result = document.getElementById("searchField").value;
        console.log(booksObj);
        for (authors in booksObj) {
            for (books in booksObj[authors]) {
                var compare = booksObj[authors][books]["name"];
                inspection(compare, result);
            }
        }
    });      
    
    function inspection(compare, result, e) {                                                    //Выведение результатов поиска
    console.log(e);
    if (compare == result) {
        $("#searchResult").css({ 'visibility': 'visible', 'position': 'relative' });
        document.getElementById("searchAuthor").value = (authorsObj[authors]["firstname"] + " " + authorsObj[authors]["midlname"] + " " + authorsObj[authors]["secondname"]);
        document.getElementById("searchName").value = booksObj[authors][books]["name"];
        document.getElementById("searchGenre").value = booksObj[authors][books]["genre"];
        document.getElementById("searchAmount").value = booksObj[authors][books]["amount"];
        document.getElementById("error").value = "";
        e.preventDefault();
    }
    else {                                                                       //Если книга не найдена, всплывает соответствующее сообщение
        document.getElementById("error").value = "Книга не найдена!";
        $("#searchResult").css({ 'visibility': 'hidden', 'position': 'absolute' });
        setTimeout(function () {
            document.getElementById("error").value = "";
        }, 4000);
    }
};
    
});




$(document).ready(function () {
    $("#showAuthor").on("click", function () {                                               // Переход к списку авторов
        $("#authorsDiv").css({ 'visibility': 'visible', 'position': 'relative' });
        $("#booksDiv").css({ 'visibility': 'hidden', 'position': 'absolute' });
        $("#authorsForm").css({ 'visibility': 'visible', 'position': 'relative' });
        $("#booksForm").css({ 'visibility': 'hidden', 'position': 'absolute' });
        $("#searchDiv").css({ 'visibility': 'visible', 'position': 'relative' });
        $("#showAddAuthor").css('visibility', 'visible');
        $("#addBookForm").css('visibility', 'hidden');
        $("#editBookForm").css('visibility', 'hidden');
        $("#showAddBook").css('visibility', 'hidden');
    });

    $("#showAddAuthor").on("click", function () {                                            // Открытие формы для добавления автора
        $("#addAuthorForm").css('visibility','visible');
        $("#showAddAuthor").css('visibility','hidden');
    });
    $("#addAuthorClose").on("click", function () {                                           // Закрытие формы для добавления автора
        $("#addAuthorForm").css('visibility','hidden');
        $("#showAddAuthor").css('visibility', 'visible');
        document.getElementById("newFirstName").value = "";                                  
        document.getElementById("newMidleName").value = "";                                  
        document.getElementById("newSecondName").value = "";
        document.getElementById("newBirthDate").value = "";
    });   
    $("#showAddBook").on("click", function () {                                              // Открытие формы для добавления книги
        $("#addBookForm").css('visibility', 'visible');
        $("#showAddBook").css('visibility', 'hidden');
    });
    $("#addBookClose").on("click", function () {                                             // Закрытие формы для добавления книги
        $("#addBookForm").css('visibility', 'hidden');
        $("#showAddBook").css('visibility', 'visible');
        document.getElementById("newBookName").value = "";                             
        document.getElementById("newBookGenre").value = "";                            
        document.getElementById("newPageAmount").value = "";
    });
    $("#closeSearch").on("click", function () {                                              // Закрытие результата поиска книги
        $("#searchResult").css({ 'visibility': 'hidden', 'position': 'absolute' });
        document.getElementById("searchField").value = "";
    });

});