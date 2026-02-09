from django.urls import path
from . import views

urlpatterns = [
    path('students/create/', views.create_student),
    path('students/read/', views.read_students),
    path('students/update/<int:pk>/', views.update_student),
    path('students/delete/<int:pk>/', views.delete_student),
]
