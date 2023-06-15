function getCurrentURL () {
    return window.location.href
}

function attActiveClass(allContainers, keep) {
    for (container in allContainers)
    {
        if (allContainers[container] !== null) {
            if (allContainers[container] !== keep && allContainers[container].classList.contains('active'))
            {
                allContainers[container].classList.remove("active")
            } else if (allContainers[container] === keep && !allContainers[container].classList.contains('active')) {
                allContainers[container].classList.add("active")
            }
        }
    }
}

function insertActiveClass(currentUrl, allContainers) {
    switch(currentUrl){
        case 'http://127.0.0.1:8000/':
            attActiveClass(allContainers, allContainers.allPosts)
            break;
        case 'http://127.0.0.1:8000/login':
            attActiveClass(allContainers, allContainers.logIn)
            break;
        case 'http://127.0.0.1:8000/register':
            attActiveClass(allContainers, allContainers.register)
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const allContainers = 
    {
        allPosts: document.getElementById('allPosts'),
        following: document.getElementById('Following'),
        logIn: document.getElementById('Log In'),
        register: document.getElementById('Register')
    }

    insertActiveClass(getCurrentURL(), allContainers)
})