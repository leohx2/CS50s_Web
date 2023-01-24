from django import forms
from django.shortcuts import redirect, render
from markdown2 import Markdown

from . import util


class SearchForm(forms.Form):
    q = forms.CharField(label='', max_length=100)
    q.widget.attrs.update({'class': 'search', 'placeholder': 'Search Encyclopedia'})

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries(),
        "form": SearchForm()
    })


def content(request, title):
    content_page = util.get_entry(title)

    if content_page == None:
        return render(request, "encyclopedia/not_found.html",{
            "title": title, "form": SearchForm()
            })

    markdowner = Markdown()
    context = {"title": title, "body": markdowner.convert(content_page), "form": SearchForm()}
    return render(request, "encyclopedia/content.html", context)


def search(request):
    
    form = SearchForm(request.GET)

    if not form.is_valid():
        return render(request, "encyclopedia/search.html", {
        "form": SearchForm()
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
        "form": SearchForm(),
        "related": related
    })