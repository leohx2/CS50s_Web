from django import forms


class SearchForm(forms.Form):
    q = forms.CharField(label='', max_length=100)
    q.widget.attrs.update({'class': 'search', 'placeholder': 'Search Encyclopedia'})


class NewPageForm(forms.Form):
    title = forms.CharField(label='Entry Title', max_length=100, widget=forms.TextInput(attrs={'class': 'newPageLabel'}))
    text = forms.CharField(label='MarkDown Content', widget=forms.Textarea(attrs={'class': 'newPageTa'}))
    