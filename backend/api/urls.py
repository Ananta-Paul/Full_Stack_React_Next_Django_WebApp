from django.urls import path
from . import views

urlpatterns=[
    path('watch/',views.WatchListCreate.as_view(),name='watch'),
    path('watch/<int:pk>/',views.WatchDelete.as_view(),name='watch-delete'),
]