from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from .models import Feed, Comment, User
# Create your views here.

class Feed_View_Set(APIView):
    def post(self, request):
        user_id = request.data.get("user_id")
        title = request.data.get('title')
        context = request.data.get('context')
        longitude = request.data.get('longitude')
        latitude = request.data.get('latitude')

        Feed.objects.create(
            user_id = user_id,
            title = title,
            context = context,
            status = True,
            longitude = longitude,
            latitude = latitude )
        
        return JsonResponse({"message": "Feed created successfully."})
    
    def get(self, request):
        # session에 user_id값이 없으면 로그인페이지 라우팅
        user_id = request.session.get('user_id', None)
        
        if user_id is None:
            return render(request, "user/login.html")
    
        user = User.objects.filter(user_id = user_id).first()

        feed_object_list = Feed.objects.all().order_by("-feed_id") #모든 피드를 다가져온다.
        feed_list = []
        for feed in feed_object_list: #피드를 하나씩 꺼내서
            user = User.objects.filter(user_id= feed.user_id).first() #피드를 쓴 user의 정보
            comment_object_list = Comment.objects.filter(feed_id=feed.feed_id) #피드에 달린 댓글 전부가져오기
            comment_list = []
            for comment in comment_object_list:
                user = User.objects.filter(user_id=comment.user_id).first() # 댓글을 쓴 유저 email 가져오기
                comment_list.append(dict(feed_id = comment.feed_id,
                                       user_id=user.user_id,
                                       comment_id=comment.comment_id,
                                       user_nickname = user.nickname,
                                       context = comment.context,
                                       ))
            
            feed_list.append(dict(id=feed.feed_id,
                                  context=feed.context,
                                  nickname=user.nickname,
                                  comment_list=comment_list,
                                  ))
        
        
        
        return JsonResponse({"feeds": feed_list, "user": user.user_id})

