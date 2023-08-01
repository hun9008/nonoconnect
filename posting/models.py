from django.db import models
# from user.models import User

class Feed(models.Model):
    feed_id = models.BigAutoField(help_text="Feed ID", primary_key=True)
    title = models.CharField(max_length=100)
    context = models.TextField(max_length=2000, null=True)  
    created_date = models.DateTimeField(auto_now_add=True) # 레코드 추가 시 자동 추가
    updated_date = models.DateTimeField(auto_now=True) # 레코드 변경 시 자동추가
    status = models.BooleanField()
    longitude = models.FloatField()
    latitude = models.FloatField()

    class Meta:
        db_table = 'Feed'

class Feed_image(models.Model):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE) # 다대일 관계 지정
    image = models.ImageField(default='media/posting/default_image.jpeg', upload_to='posting', blank=True, null=True)

    class Meta:
        db_table = 'Feed_image'

class Comment(models.Model):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE) # 다대일 관계 지정
    comment_id = models.BigAutoField(help_text="Comment ID", primary_key=True)
    # feed_id = models.BigIntegerField() # 내가 어떤 컨텐츠에 대한 댓글이냐
    context = models.TextField(max_length=2000)  
    created_date = models.DateTimeField(auto_now_add=True) # 레코드 추가 시 자동 추가
    updated_date = models.DateTimeField(auto_now=True) # 레코드 변경 시 자동추가
    
    class Meta:
        db_table = 'Comment'

class Comment_image(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE) # 다대일 관계 지정
    image = models.ImageField(default='media/posting/default_image.jpeg', upload_to='posting', blank=True, null=True)

    class Meta:
        db_table = 'Comment_image'