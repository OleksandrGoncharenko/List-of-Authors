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