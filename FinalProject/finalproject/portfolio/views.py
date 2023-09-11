from django.http import JsonResponse
from django.shortcuts import render


# Create your views here.
def index (request):
    return render(request, "portfolio/index.html", {'pageToRender': "home"})

def contact (request):
    if request.method == "POST":
        return JsonResponse({'email': 'sent'}, safe=False)
    return render(request, "portfolio/index.html", {'pageToRender': "contact"})
