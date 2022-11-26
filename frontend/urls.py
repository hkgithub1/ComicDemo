from django.urls import path
from .views import IndexEP

urlpatterns = [
    path("", IndexEP),
    path("inventory/", IndexEP),
    path("search/", IndexEP),
    path("book/<int:pk>", IndexEP),
    path("checkout/", IndexEP),
    path("date/", IndexEP),
    path("signup/", IndexEP),
    path("login/", IndexEP),
    path("account/", IndexEP),
]