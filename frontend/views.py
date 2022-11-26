from django.shortcuts import render

def IndexEP(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
