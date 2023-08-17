from django.urls import path
from .views import *

app_name = "users"

urlpatterns = [
    path("login", LogIn.as_view(), name="login"),
    path("logout", Logout.as_view(), name="logout"),
    path("signup", SignUp.as_view(), name = "signup"),
]