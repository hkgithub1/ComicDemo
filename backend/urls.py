from django.urls import path
from .views import SearchBooksEndPoint, AddBookEndPoint, DeleteBookEndPoint, AddUserEndPoint

urlpatterns = [
    path("search-books/", SearchBooksEndPoint.as_view()),
    path("add-book/", AddBookEndPoint.as_view()),
    path("delete-book/<int:id>", DeleteBookEndPoint.as_view()),
    path("add-user/", AddUserEndPoint.as_view()),
]