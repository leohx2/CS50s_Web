function getCurrentURL () {
    return window.location.href
}

// Add a class "Active" to the current navItem related to the page and remove from the orders.
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

// Depending on the URL add a active class to a specific navbar item
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

// Func to update the state on db, we send to our db true if the user is clicking on like or false if
//the user is clicking on to remove the like
async function like_post(btnid, post_id, user_id) {
    if (user_id === null) {
        window.location.replace('/login')
        return
    }
    const btn = document.getElementById(btnid)
    const isLiked = (btn.classList.contains("liked") ? false : true)
    await fetch(`postLikes/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({
            like: isLiked,
        })
    })
    if (isLiked === false) {
        btn.classList.replace("liked", "like")
        btn.innerHTML = '&#9825;'
    } else {
        btn.classList.replace("like", "liked")
        btn.innerHTML = '&hearts;'
    }
    
}

// check if the user already liked it or not, like button &#9825; liked button &hearts;
function is_liked(user_id, users_likes, index) {
    if (!users_likes){ //testar !users_likes || !users_likes.includes(user_id)
        return `<button id="btn${index}"class="postBtn like">&#9825;</button>`
    }
    else if (user_id && users_likes.includes(user_id)){
        return `<button id="btn${index}" class="postBtn liked">&hearts;</button>`
    }
    else {
        return `<button id="btn${index}" class="postBtn like">&#9825;</button>`
    }
}

function renderNoPosts(divPost) {
    const postHTML = `
        <div class="post">
            <p>There are no posts yet, check here our <a class="postUserName" href="/">home</a> page!</p>
        </div>`
        divPost.insertAdjacentHTML("beforeend", postHTML)
}

async function renderPosts(divPost, username=null){
    // by fetching infopost our answer is an array with all the posts and the last item is the user info
    try {
        const respose = await fetch(username===null ? `infoPost/all` : `infoPost/${username}`)
        const json = await respose.json()
        
        // if there is no posts, render some "post" telling there is no posts
        if (json.length === 1) {
            renderNoPosts(divPost)
            return
        }
        // now we loop the json const until the last item in the array
        let postHTML
        for (let i = 0; i < json.length - 1; i++ ) {
            postHTML = `
                <div class="post">
                    <div class="usernameAndTimestamp">
                        <a href="${json[i].username}" class="postUserName">${json[i].username}</a>
                        <p class="postTimestamp"> ${json[i].timestamp} </p>
                    </div>
                    <pre>${json[i].content}</pre>
                    ${is_liked((json[json.length - 1] ? json[json.length - 1].id : null), json[i].users_likes, i)}
                </div>`
                divPost.insertAdjacentHTML("beforeend", postHTML)
                document.getElementById(`btn${i}`).addEventListener("click", () => like_post(`btn${i}`, json[i].id, (json[json.length - 1] ? json[json.length - 1].id : null) ))
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

    if (document.getElementById('postInsert')) {
        renderPosts(document.getElementById('postInsert'))
    }
    else if (document.getElementById('userPostsInsert')) {
        const username = getCurrentURL().split('/').pop()
        renderPosts(document.getElementById('userPostsInsert'), username)
    }
    insertActiveClass(getCurrentURL(), allContainers)
})