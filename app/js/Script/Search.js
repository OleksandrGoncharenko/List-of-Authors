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



