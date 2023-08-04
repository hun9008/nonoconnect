from django.urls import path
from .views import *

app_name = "posting"

urlpatterns = [
    path('feed/', Feed_View_Set.as_view(), name='feed-view-set'),  # /feed/ 경로에 Feed_View_Set View를 매핑
    path('feed/<int:feed_id>/', Feed_View_Set.as_view(), name='feed-view-set-update-delete') # feed/id 경로에 Feed_View_Set View를 매핑하
]