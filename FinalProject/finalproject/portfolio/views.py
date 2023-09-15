import json

from django.conf import settings
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def index (request):
    return render(request, "portfolio/index.html", {'pageToRender': "home"})


@csrf_exempt
def contact (request):
    if request.method == "POST":
        # Load the form data
        data = json.loads(request.body)

        # Send e-mail with the data loaded from the form
        send_mail(
            f'Portfolio webSite, message from {data["name"]}', # Subject
            f'Message from: {data["email"]}\nContent:\n{data["message"]}', # Message
            data['email'], # Sender
            ['leobgse@gmail.com'], # E-mail to receive
        )
        send_mail(
            f'Jonarth', # Subject
            f"Hello {data['name']}!\nWe just received your e-mail and we'll answer as soon as possible.\nThank you for contacting us!", # Message
            'leobgse@gmail.com', # Sender
            [data['email']], # E-mail to receive
        )
        return JsonResponse({'email': 'sent'}, safe=False)
    return render(request, "portfolio/index.html", {'pageToRender': "contact"})


# There will be only one user in the website, the portfolio author. 
# The author will be able to add and modify the projects displayid in the site
# The login option will not be available in the webSite navBar, only the author should acess it, so for the
# sake of security, no option will be available in the navBar for users.
def login_view (request):
    if request.method == "POST":
        # Login the user
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if the authentication sucessfull 
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            messages.warning(request, "Invalid User.")
            return render(request, "portfolio/login.html")

    return render(request, "portfolio/login.html")

@login_required
def logout_view (request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


@login_required
def newProject(request):
    return render(request, "portfolio/index.html", {"pageToRender": "newProject"})