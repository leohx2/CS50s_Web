from random import randrange

from django import forms
from django.contrib import messages
from django.shortcuts import redirect, render
from markdown2 import Markdown

from . import formsfield, util


def index(request):
    # Render the index page with all the entries
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries(),
        "form": formsfield.SearchForm()
    })


def content(request, title):
    # Get the entry content based on the title
    content_page = util.get_entry(title)

    # If the entry doesn't exist render the not found page
    if content_page == None:
        return render(request, "encyclopedia/not_found.html",{
            "title": title, "form": formsfield.SearchForm()
            })
    # Convert the markdown content to a "normal" content
    markdowner = Markdown()
    context = {"title": title, "body": markdowner.convert(content_page), "form": formsfield.SearchForm()}
    return render(request, "encyclopedia/content.html", context)


def search(request):
    
    form = formsfield.SearchForm(request.GET)
    
    if not form.is_valid():
        return render(request, "encyclopedia/search.html", {
        "form": formsfield.SearchForm()
    })

    # Get the field Search content.
    query = form.cleaned_data['q']
    content_page = util.get_entry(query)

    # If there is an entry with the title it shows it, otherwise shows related results
    if content_page:
        return redirect('encyclopedia-content', title = query)
    else:
        all_entries = util.list_entries()
        related = []
        for i in all_entries:
            if query.lower() in i.lower():
                related.append(i)

    return render(request, "encyclopedia/search.html", {
        "form": formsfield.SearchForm(),
        "related": related
    })


# New page will be used to create or edit a page
# When the user click on new page, edit and title keep as false
# When the user click on edit page, the function edit_page calls newpage with edit == True and Title == entry title
def newpage(request, edit=False, title=None):
    if request.method == 'POST':
        form = formsfield.NewPageForm(request.POST)

        if form.is_valid():
            entryTitle = form.cleaned_data['title']
            content = form.cleaned_data['text']

            if (edit == True and title != entryTitle):
                # If edit is true it's not supposed to be abble to change the title but if the user change it somehow the back end denies it.
                messages.error(request, 'Entry title must be the same.')
                return(redirect('encyclopedia-edit', title_edit=title))
            elif edit == False:
                # The user is creating a new page and if the title already exist the web site doesn't allow the creation.
                if not util.pass_requirements(entryTitle):
                    messages.error(request, 'Entry title already exist.')
                    return render(request, "encyclopedia/newpage.html", {'formnew': form, "form": formsfield.SearchForm()})
        
        if edit == True and title != None:
            # If the user is editing the page and pass all the requirements get redirected to the entry page with a sucess message 
            messages.success(request, 'Page edited with success!')
            util.save_entry(entryTitle, content)
            return redirect('encyclopedia-content', title=entryTitle)
        else:
            # If the user is creating a new page and pass all the requirements get redirected to the index page with a success message
            messages.success(request, 'Page created with success!')
            util.save_entry(entryTitle, content)
            return redirect('encyclopedia-index')
    
    # render the page depending based on the user choise, edit or creat a page
    if edit == True and title != None:
        entry_content = util.get_entry(title)
        form = formsfield.NewPageForm(initial={'title': str(title), 'text': entry_content})
        form.fields['title'].widget.attrs.update({'class': 'dont_click'})
    else:
        form = formsfield.NewPageForm()
        
    return(render(request, "encyclopedia/newpage.html", {
        'formnew': form, 'edit_bool': edit , 'title_entry': title, "form": formsfield.SearchForm()
        }))


def random_page(request):
    all_entries = util.list_entries()
    random_entry = all_entries[randrange(0, len(all_entries))]
    return redirect('encyclopedia-content', title=random_entry)


def edit_page(request, title_edit):
    return newpage(request, edit=True, title=title_edit)


def page_not_found(request, exception='404'):
    messages.error(request, f'Error 404 Page not found, here bellow you will find the list with all the entries!')
    return redirect('encyclopedia-index')

