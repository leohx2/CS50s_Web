from .models import Bids


# Listing class works to make it easier to have all the LISTINGS requiraments together,making it easier to
# find errors or pass all the items to a validate function.
class ListingClass():
    # The title, description and bid are mandatories, category and url are optionals.
    def __init__(self, title, description, bid, category="", url=""):
        self.title = title
        self.description = description
        self.bid = bid
        self.category = category
        self.url = url
    
    def valid_data(self):
        errors = []
        if self.title == "" or len(self.title) <= 1:
            errors.append("Invalid Title. This field can't be empty and need to have more than 1 character.")
        if self.description == "" or len(self.description) <= 1:
            errors.append("Invalid Description. This field can't be empty and need to have more than 1 character.")
        if self.bid == "" or self.bid <= 0:
            errors.append("Invalid Bid. It's must be greater than 0.")
        if self.category != "" and len(self.category) < 2:
            errors.append("Invalid category, this field can be empty or need to have more than 2 characters.")
       
        return errors

