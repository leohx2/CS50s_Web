function getCurrentURL () {
    return window.location.href
}

function attActiveClass(allContainers, keep) {
    allContainers.map((container) => {
        if (container !== null) {
            if (container !== keep && container.classList.contains('active'))
            {
                container.classList.remove("active")
            } else if (container === keep && !container.classList.contains('active')) {
                container.classList.add("active")
            }
        }
    })
}

function insertActiveClass(currentUrl, allContainers) {
    switch(currentUrl){
        case 'http://127.0.0.1:8000/':
            attActiveClass(allContainers, document.getElementById('allPosts'))
            break;
        case 'http://127.0.0.1:8000/login':
            attActiveClass(allContainers, document.getElementById('Log In'))
            break;
        case 'http://127.0.0.1:8000/register':
            attActiveClass(allContainers, document.getElementById('Register'))
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const allContainers = 
    [
        document.getElementById('allPosts'),
        document.getElementById('Following'),
        document.getElementById('Log In'),
        document.getElementById('Register')
    ]
    insertActiveClass(getCurrentURL(), allContainers)
})