function getCurrentURL () {
    return window.location.href
}

// Add a class "Active" to the current navItem related to the page.
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
        case 'http://127.0.0.1:8000/login':
            attActiveClass(allContainers, allContainers.logIn)
            break;
        case 'http://127.0.0.1:8000/register':
            attActiveClass(allContainers, allContainers.register)
            break;
        default:
            attActiveClass(allContainers, allContainers.allPosts)
            break;
    }
}


function like_post(is_liked, post_id) {
    console.log(this)
}

// check if the user already liked it or not, like button &#9825; liked button &hearts;
function is_liked(user_id, users_likes, post_id) {
    if (!users_likes){
        return `<button onClick="like_post(${false}, ${post_id})" class="likeBtn">&#9825;</button>`
    }
    else if (users_likes.includes(user_id)){
        return `<button onClick="like_post(${true}, ${post_id})" class="likedBtn">&hearts;</button>`
    }
    else {
        return `<button onClick="like_post(${false}, ${post_id})" class="likeBtn">&#9825;</button>`
    }
}

async function renderPosts(divPost){
    // by fetching infopost our answer is an array with all the posts and the last item is the user info
    try {
        const respose = await fetch('http://127.0.0.1:8000/infoPost')
        const json = await respose.json()

        // now we loop the json const until the last item in the array
        for (let i = 0; i < json.length - 1; i++ ) {
            postHTML = `
                <div class="post">
                    <div class="usernameAndTimestamp">
                        <p class="postUserName">${json[i].username}</p>
                        <p class="postTimestamp"> ${json[i].timestamp} </p>
                    </div>
                    <pre>${json[i].content}</pre>
                    ${is_liked(json[json.length - 1].id, json[i].users_likes, json[i].id)}
                </div>`
            divPost.insertAdjacentHTML("beforeend",postHTML)
        }
        
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Creating a dict with all containers needed to use the activeClass
    const allContainers = 
    {
        allPosts: document.getElementById('allPosts'),
        following: document.getElementById('Following'),
        logIn: document.getElementById('Log In'),
        register: document.getElementById('Register')
    }

    const divPost = document.getElementById('postInsert')
    if (divPost) {
        renderPosts(divPost)
    }
    insertActiveClass(getCurrentURL(), allContainers)
})