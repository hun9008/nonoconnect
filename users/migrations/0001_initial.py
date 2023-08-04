# Generated by Django 4.2.3 on 2023-08-03 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=300, verbose_name='비밀번호')),
                ('name', models.CharField(max_length=64, verbose_name='이름')),
                ('email', models.EmailField(max_length=128, unique=True, verbose_name='사용자 이메일')),
                ('createdDate', models.DateTimeField(auto_now_add=True, verbose_name='생성일자')),
                ('modifiedDate', models.DateTimeField(auto_now=True, verbose_name='수정일자')),
                ('sex', models.BooleanField()),
                ('birthdate', models.DateTimeField()),
                ('nickname', models.CharField(max_length=64, unique=True, verbose_name='이름')),
                ('profileImage', models.ImageField(upload_to='')),
                ('phone', models.CharField(max_length=15, unique=True, verbose_name='전화번호')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
            ],
        ),
    ]
