from django.db import models

class Comics(models.Model):
    book_name = models.CharField(max_length=100, unique=False, default="", null=True)
    book_author = models.CharField(max_length=50, unique=False, default="", null=True)
    book_year = models.CharField(max_length=50, default="", null=True)
    book_publisher = models.CharField(max_length=50, unique=False, default="", null=True)
    book_issues = models.CharField(max_length=50, unique=False, default="", null=True)
    book_price = models.DecimalField(max_digits=50, decimal_places=2, null=True, default=1)
    first_image = models.CharField(max_length=100, unique=False, default="", null=True)
    second_image = models.CharField(max_length=100, unique=False, default="", null=True)
    third_image = models.CharField(max_length=100, unique=False, default="", null=True)
    fourth_image = models.CharField(max_length=100, unique=False, default="", null=True)
    fifth_image = models.CharField(max_length=100, unique=False, default="", null=True)
    sixth_image = models.CharField(max_length=100, unique=False, default="", null=True)
    seventh_image = models.CharField(max_length=100, unique=False, default="", null=True)
    eighth_image = models.CharField(max_length=100, unique=False, default="", null=True)
    created_at = models.DateTimeField(auto_now_add=True)
