from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render


# Create your views here.
def index (request):
    return render(request, "portfolio/index.html", {'pageToRender': "home"})

def contact (request):
    if request.method == "POST":
        print(f'{request.POST["message-name"]}')
        return JsonResponse({'email': 'sent'}, safe=False)
    return render(request, "portfolio/index.html", {'pageToRender': "contact"})
