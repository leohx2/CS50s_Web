from random import randrange

from django import forms
from django.contrib import messages
from django.shortcuts import redirect, render
from markdown2 import Markdown

from . import formsfield, util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries(),
        "form": formsfield.SearchForm()
    })


def content(request, title):
    content_page = util.get_entry(title)

    if content_page == None:
        return render(request, "encyclopedia/not_found.html",{
            "title": title, "form": formsfield.SearchForm()
            })

    markdowner = Markdown()
    context = {"title": title, "body": markdowner.convert(content_page), "form": formsfield.SearchForm()}
    return render(request, "encyclopedia/content.html", context)


def search(request):
    
    form = formsfield.SearchForm(request.GET)

    if not form.is_valid():
        return render(request, "encyclopedia/search.html", {
        "form": formsfield.SearchForm()
    })

    query = form.cleaned_data['q']
    content_page = util.get_entry(query)

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


def newpage(request, edit=False, title=None):
    print(f'\n\n\nTESTE {edit}\n')
    if request.method == 'POST':
        form = formsfield.NewPageForm(request.POST)

        if form.is_valid():
            entryTitle = form.cleaned_data['title']
            content = form.cleaned_data['text']

            if (edit == True and title != entryTitle) and not util.pass_requirements(entryTitle):
                messages.error(request, 'Entry title already exist, keep the same or change to a non existent one.')
                return(redirect('encyclopedia-edit', title_edit=title))
            elif edit == False:
                if not util.pass_requirements(entryTitle):
                    messages.error(request, 'Entry title already exist.')
                    return(render(request, "encyclopedia/newpage.html", {'formnew': form}))
            else:
                util.save_entry(entryTitle, content)
        if edit == True and title != None:
            return redirect('encyclopedia-content', title=entryTitle)
        else:
            return redirect('encyclopedia-index')
    
    if edit == True and title != None:
        entry_content = util.get_entry(title)
        form = formsfield.NewPageForm(initial={'title': str(title), 'text': entry_content})
    else:
        form = formsfield.NewPageForm()
        
    return(render(request, "encyclopedia/newpage.html", {'formnew': form, 'edit_bool': edit , 'title_entry': title}))


def random_page(request):
    all_entries = util.list_entries()
    random_entry = all_entries[randrange(0, len(all_entries))]
    print(f'TESTANDO \n\n\n{random_entry}\n\n\n')
    return redirect('encyclopedia-content', title=random_entry)


def edit_page(request, title_edit):
    return newpage(request, edit=True, title=title_edit)