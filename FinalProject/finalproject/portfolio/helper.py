# File with functions to help
from operator import itemgetter


# Organize the content to send to js
# Receive 2 models which one of the items inside of them is the position to display.
def content_organizer(texts, images):
    data = [i.serialize() for i in texts]
    [data.append(i.serialize()) for i in images]
    listToReturn = sorted(data, key=itemgetter('position'))
    return listToReturn
    