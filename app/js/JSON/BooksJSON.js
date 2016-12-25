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