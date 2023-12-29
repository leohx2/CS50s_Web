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

from .helper import content_organizer
from .models import Image, Post, Text, Thumbnail

# Those global variables refers to the position of each item inside the list sent via js
IMAGE_URL = 0
BORDER_RADIUS = 1
IMAGE_SIZE = 2
IMAGE_ORDER = 3
TEXT_CONTENT = 0
TEXT_ORDER = 1

# Render the home page view
def index (request):
    return render(request, "portfolio/index.html", {'pageToRender': "home"})

def about (request):
    return render(request, "portfolio/index.html", {'pageToRender': "about_me"})

# Render the projects page, containing only the thumbanails of the projects, clickable 
def projects (request):
    return render(request, "portfolio/index.html", {"pageToRender": "projects"})

# Send thumbnail details
def thumb_details(request, categoryRender):
    # query the thumb details
    thumb = Thumbnail.objects.filter(category=categoryRender)
     # Serialize it to make easier to select them into our JS file.
    # To know more about the serialize function check the models.py
    data = [i.serialize() for i in thumb]
    return JsonResponse(data, safe=False)


# Render the contact page
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


# Render the new project view
@login_required
@csrf_exempt
def newProject(request):
    # Check if the user are sending a new post info
    if request.method == "POST":
        # Catch all the data the js sent and save it into a database, using the modelos Post, Text, Image
        data = json.loads(request.body)
        #----
        # Data contains 2 dict inside of it, 'thumbnail' and 'post'. 
        # The 'thumbnail' has the 'borderOutput', 'categoryInputm', 'imgInput' (URL), 'titleInput'
        # The 'post' another 3 keys inside of it, 'title', 'text' and 'image'. 'title' contains the title
        # 'text' have a list of lists, each list has the text content and position, like 'text': [['Texto 1 ', 1], ['Text 2', 3]], where the text 2 will be displayed in the 3rd position
        # in that scenario the 2nd element is an image.
        # 'image' also have a list of lists, but with a little bit more informations - 'image': [[URL, borderRadius, height, position], [[URL, borderRadius, height, position]]]
        #----
        # Spliting up the data content
        postTitle =  data['post']['title']
        imageContent = data['post']['image']
        textContent = data['post']['text']
        thumbnailContent = data['thumbnail']
        # Now we already now what we have in data variable we can save it in our database
        print(f"\n{postTitle}\n{imageContent}\n{textContent}\n{thumbnailContent}\n")
        # 1st, create the post
        post = Post(title=postTitle)
        post.save()

        # 2snd, create the thumbnail
        thumbnail = Thumbnail(FK_post=post, borderRadius=thumbnailContent['borderOutput'] ,category=thumbnailContent['categoryInput'], image_url=thumbnailContent['imgInput'], 
        title=thumbnailContent['titleInput'], title_weight=thumbnailContent['titleFontWeight'])
        thumbnail.save()

        # 3rd, create the image 
        for i in imageContent:
            image = Image(borderRadius=i[BORDER_RADIUS], FK_post=post, position=i[IMAGE_ORDER], size=i[IMAGE_SIZE], url=i[IMAGE_URL])
            image.save()
        
        # 4th, create the text
        for i in textContent:
            text = Text(text_content=i[TEXT_CONTENT], FK_post=post, position=i[TEXT_ORDER])
            text.save()

    return render(request, "portfolio/index.html", {"pageToRender": "newProject"})


# Send data to the project page and render it if necessary
@csrf_exempt
def project_render(request, id):
    # If the method is post info django sends the data to JavaScript to render the post
    if request.method == "POSTINFO":
        # Query all the data needed
        post = Post.objects.get(pk=id)
        texts = Text.objects.filter(FK_post__id=id)
        images = Image.objects.filter(FK_post__id=id)
        
        # organize the content position to send to js
        content = content_organizer(texts, images)

        # Pass it to a dict
        dataToSend = {
            'title': post.title,
            'content': content
        }

        #print(f"\n\n{dataToSend}\n\n")
        # Send it in a json format
        return JsonResponse(dataToSend, safe=False)
    return render(request, "portfolio/index.html", {"pageToRender": "project"})
