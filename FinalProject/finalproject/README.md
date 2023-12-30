# Portfolio for an artist

This is my final project for the course "CS50’s Web Programming with Python and JavaScript", and I made it thinking about the necessity of a friend of mine and a lot of artists around the globe.
This project is a personal portfolio for a Brazilian friend that can be constantly updated for a person that doesn't need to know how to code. All the pages that are visible only for the logged user are written in Portuguese, the "Home", "about me" and "contact me" pages have the english and portuguese version, that can be chosen at the navbar.
This is how a non logged user sees the navBar (image 1 is for desktop and 2 for mobile):
![navbar](readmepictures/language.jpg)
![navbar_mobile](readmepictures/navbar_mobile_nonloged.jpg)

This is how a logged user sees the navBar (image 1 is for desktop and 2 for mobile):
![navbar](readmepictures/navbar_loged.jpg)
![navbar_mobile](readmepictures/navbar_mobile_loged.jpg)

This project is a single page app that uses pure JavaScript to change the page without actually reloading it. With a fast fade transition, it gives the user a great experience for the scenario change, smoothly and not abrupt. 
This web app allows the user to post new posts that can be part of 3 categories, Design, Painting and Sculpture. It's really simple to creat a new post, everything is mobile responsive so the user doesn't have to worry about doing it only in the computer.

For the first part the user can choose the thumbnail image, by providing an image URL, select the border radius for the image from 0px to 50px, a title and a font weight.

Don't worry, if you forget something the error message will tell you so.

Next step the user will be able to write the post inserting all the texts and images that he wants to. The user needs to provide the URL image, choose the border radius but now from 0px to 100px and the size. **The image will be resized only if it has enough quality to*, no one wants a 144p big image in a portfolio.
Right below it, the user will have the preview of the post, to make it easier to know how it will look like after he posts it.

Tadaa! Now you have it on the projects page.

Everything above will be showed in the youtube video.

## Distinctiveness and Complexity

This project is different from the others, here I'm exploring the necessity of an artist to have a portfolio that can be constatly updated, by posting new projects from different categories. 
The user will be able not just to write a new post, but to style it as he needs to by choosing the border radius, image and title from the both parts of the post, thumbnail and project content.
While the user is creating the new post he will have the real time preview, every character written on the textarea will also appear on the post preview.

The user can add as many text or images as he wants to. The image has 3 sizes, small, medium and large, but it will only be resized if the quality of the image allows it, to keep the ratio and quality of it, otherwise the size does not change.
To have the possibility to log in you must create a super user in django database. I didn't create a register page to prevent someone without the permission to create a new account to create it, that's not the idea for the project, the idea is that only the person who owns the code can create users that can manipulate the website content.

To provide a better experience to the user I created a modern layout and a single page app using only javaScript, that was a real challenge. I organized my project almost like a React project, by components and rendering only one HTML file the `index.html`. The login page is a different file and can be accessed by the url /loginAuthor.
To make sure the user will have a great experience using the website I handled the previous and forward button, by setting the window.popstate and window.history. 

To change the URL without using an external library (like react router) I had to set the history.pushState and/or history.replace depending on the scenario.

Combining the Django views data and conditional render with JavaScript I was able to render the right page based on the data attribute, by sending the data from django as `{'pageToRender': "x"}` I can allocate it in a data attribute on main, like this:

`<main data-language="en" data-page-render="{{pageToRender}}">`

And in the main.js we have something like this:

`switch (main.dataset.pageRender)` 

That will run the most appropriate function for each scenario, it will be better explained on the right section of that README.md, where I'll explain file by file.
Then if the user changes the page by clicking on a navBar link it will change the data-page-render as well, to do it our navBarRedirect.js will handle it all.
First we'll apply the transition and change the `.active` class from the navbar item. 
After that the render page function will change the page content and if the main part of the page is black the scroll bar will be white, and if it's white the scroll bar will be black.

In the contact page you'll find a form to send an e-mail to the author, to get in touch with the Author.

For security reasons I'm not gonna let my password on gitHub. To make it work correctly you need to set those fields from the file finalproject/settings.py:
```
# Email Settings
EMAIL_HOST = 
EMAIL_HOST_USER =
EMAIL_HOST_PASSWORD = 
EMAIL_PORT = 
EMAIL_USE_TLS = 
```
***Here we have an example:***

![email sending](readmepictures/getInTouch.jpg)

***When someone sends an e-mail this is what the author will receive:***

![email received](readmepictures/emailReceived.jpg)

*Obs: please ignore the fact I'm sending it from me to myself, that's not a bug.*

***And this is the automatic message the site sends to the person that sent the e-mail:***

![email automatic anwser](readmepictures/received.jpg)

## Files and what they do part 1

Starting with my python files:

#### - views.py

In this file we have my project router divided and global variable.

First we have the views `index`, `about` and `projects` that will only render the `index.html` sending the data `{"pageToRender": "home"}`, `{"pageToRender": "about_me"}` and `{"pageToRender": "projects"}` respectively.
That will make the right page be rendered by a function in main.js.

Then we can find the `thumb_details` that has a "categoryRender" as a parameter.
This is an endpoint to send the thumbnail details for the project page serialized and in json format.

Then the `contact` that is another endpoint, but this one use "POST" method, sends the e-mail to provided address.

The `login_view`, that will autheticate the user and redirect to the home page or just show an error message. After that we have the `logout_view` that will just logout the user.

Now the `newProject` is an endpoint that uses the "POST" method and require a login to be used. That endpoing will catch all the data sent from JavaScript and send it to the righ database model. 
From the JavaScript we'll receive here 4 items:
- title
- An array of arrays called imageContent, each array contains the borderRadius, related post, position to display it (if there's a text and an image on the post here is how we know which one render first. Or 10 images and 3 texts, position will tell us the position of every single item), size of the image and the URL address of each image.
- An array of arrays called textContent, each array contains the text content, related post and position to display (follow the same logic as the position to display from imageContent)
- A dictionary called thumbnailContent, this dictionary contains a few keys such borderOutput, categoryInput, imgInput, titleInput, titleFontWeight.

Here this view will use all the global variables:
```
IMAGE_URL = 0
BORDER_RADIUS = 1
IMAGE_SIZE = 2
IMAGE_ORDER = 3
TEXT_CONTENT = 0
TEXT_ORDER = 1
```
They are the positions of each related item on the array received from JavaScript.

The `project_render` will send the data from the database to JavaScript to render. Here we call the helper function `content_organizer` to serialize and send a sorted list to JavaScript to now exactly the order of each text and image.

#### - urls.py

Register the url patterns to know what should the program do when the user access each url.

#### - models.py

Contains all the database models, like:

- User, a model imported from the `django.contrib.auth.models`
- Post, a model that contains the id and the title for each post.
- Image, a model that contains all the details from each image, the related post and a function to serialize it.
- Text, same logic as above, a model that contains all the details from each text, related post and a function to serialize it.
- Thumbnail, same logic as above too, a model that contains all the details from each thumbnail, related post and a function to serialize it.

#### - helper.py

Contain one function called `content_organizer` that will receive 2 arrays one of texts and the other one with the images information. The function will combine both in one array and send it to JavaScript to render in the correct position with all the details for each item.

#### - admin.py

Register the models for the admin page have access to it.

## Files and what they do part 2

HTML files:

#### - index.html

Base layout for every page, here on the top every item will have this
```
data-page="home"
class="material-symbols-outlined navA {% if pageToRender == 'home' %} active {% endif %} navBar-smallScreen"
``` 
or
```
data-page="home"
class="navA {% if pageToRender == 'home' %} active {% endif %} navBar-bigScreen"
```
The word "home" will be different for each item, the pageToRender will be difined first on the django and latter for JavaScript. Depending on the pageToRender we'll insert the class .active making it easier for the user knows the current page, and better for the layout.
The `<main>` is basicly empty containing only a wave generated by https://www.shapedivider.app/, all the content will be inserted depending on the pageToRender as well, here is how the main tag looks like
`<main data-language="en" data-page-render="{{pageToRender}}">`
If the pageToRender changes, the data-page-render changes to, and it will make the JavaScript main.js render the correct content.

#### - login.html

Login page that will login the user and redirect to the home page.

## Files and what they do part 3 

JavaScript files:

#### - main.js

Here we have the heart of the project, the first thing we do it to catch all the informations, like the main data, the container to render the content, the body and the buttons tho change the language.

Then we check if the screen is bigger or smaller than 850px to know which version of the navBar we'll render, the desktop or mobile version.
We also have the `window.onpopstate` settings to handle the previous and foward buttons behavior, one of the main problems of a bad single page app is to not handle it and when the user clicks on the previous button go back to another site instead move to the previous content rendered.

Then we have the `setNavBarBehavior` that set the .active class and the rendering functions associated to the navBar behavior

Last but not less important is the `choosePageToRender` that literally choose which content we render based on the `main.dataset.pageRender`.

#### - projectsPage.js

First we call the function `cleandAndUpdateState` to change the url and update the history state.

Then based on the `main.dataset.language` we render the content in english or portuguese, this file will render the projects page that contains all the posts from every category.

#### - projectContentPage.js

First we call the function `cleandAndUpdateState` to change the url and update the history state.

Then render the post page with all the data provided for the author initially.

#### - newProject.js

Probably the biggest file on the project, contains a few functions like:
- renderNewProject, it's the "container" that will have all the steps to create a new post, the thumbnail and project content
- creatingCarousel, it will create the carousel with the thumbnail options.
- thumbnailPreview, render the thumbnail with the data provided on the function above, it will render "in real time", every change the user make on the carousel will reflect on the thumbnail preview.
When the user clicks on the button to save and continue we'll render the next part of that page, the post content, that page will have 2 buttons an one text area, the text area is for the title, the two button will create a "new text" text area and the other an image field.
- newImageContent, render the field to insert a new image to the project.
- newTextContent, same as above but with text
- projectMakerPreview, a real time preview for every change on the fields mentioned above, rendering the texts and images on change.

#### - homePage.js

First we call the function `cleandAndUpdateState` to change the url and update the history state.

Then render the home page and the about me page content on the `main.dataset.language`, inside the homePage.js we call the aboutMe() located at aboutMe.js

#### - aboutMe.js

Renders the aboutMe content.

#### - contactPage.js

First we call the function `cleandAndUpdateState` to change the url and update the history state.

Then render the form to send an e-mail to the author. If there's missing an field of form the submit button we'll be disabled. After the user submit the form a loading content replace the button content, after the request is completely done the loading ends and the button backs to "normal"

#### - navBarRedirect.js

This file will manage to change every content when the user clicks on each link in the navbar. It will change the .active class and render the correct version of the file, it will also check the scroll bar should be white or black.

### - transiction.js

Make the page transiction and it has 2 functions inside it, the `transictionMaker (func, mode)` apply the transiction for whole page, used to change pages and `transictionMakerSection (func, mode)` apply the transiction only for the section, used on the newProject page to change from the thumbNail part ton the project content part.

Both accepts two different modes, "opacity slow" or "opacity fast" that will determine how long the transiction will last, the "func" parameter is the function to run in this time, like the new page will render while the transiction is happening, have a look:
```
if (mode === "opacity slow") {
  transition.classList.add("transitionOpacity");
  setTimeout(() => func(), 500);
  setTimeout(() => transition.classList.remove("transitionOpacity"), 1000);
}
```

### - renderWarning.js

Render error message with a button to close it

### - language.js

Listen to the clicks on the "EN" and "PT" buttons, and based on which one is clicked change the `main.dataset.language` and the navBar items name, like from "About me" to "Sobre mim".

### - cleanAndUpdateState.js

Clean the html content to allow the content to be rendered in a "empty" place.
Change the URL, update the state and scroll to the top of the page.

### - buttonsFunctions.js

Copy the e-mail to the transfer area and display a tooltip "copiado" or "copied" based on the language.

## Files and what they do part 4

Css files:

files: aboutMe.css, animation.css, contact.css, footer.css, homePage.css, index.css, login.css, newProject.css, projectPage.css, projects.css, reset.css 

I belive they are self explainatory, they are used to style each corresponding content.

## How to run:

If you need to set the contact page to work properly don't forget to set the fields from finalproject/settings.py:
```
# Email Settings
EMAIL_HOST = 
EMAIL_HOST_USER =
EMAIL_HOST_PASSWORD = 
EMAIL_PORT = 
EMAIL_USE_TLS = 
```
First of all, create a super user on django to be able to create projects and to log in.

 - `python3 manage.py createsuperuser`
and then
-  `python3 manage.py runserver`

to acess to login page use the url 
127.0.0.1:8000/loginAuthor, don't forget to change the "127.0.0.1:8000" if are using a different hoster.

## Aditional information:

Please if you change the screen size from mobile to desktop (vice versa) you need to reload the page to work properly.
Also, if you need the 404 to work properly set DEBUG = False and run the project like `manage.py runserver --insecure` here you have a better explanation for that -> [Stackoverflow](https://stackoverflow.com/questions/5836674/why-does-debug-false-setting-make-my-django-static-files-access-fail) 
