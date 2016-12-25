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