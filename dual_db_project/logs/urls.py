from django.urls import path
from . import views

urlpatterns = [
    path('logs/', views.get_logs),
    path('logs/create/', views.create_log),
    path('logs/delete/', views.clear_logs),
    path('logs/update/', views.update_log),
]
