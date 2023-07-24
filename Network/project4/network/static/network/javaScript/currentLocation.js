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
        case 'http://127.0.0.1:8000/followingPosts':
            attActiveClass(allContainers, allContainers.following)
            break
        default:
            attActiveClass(allContainers, allContainers.allPosts)
            break;
    }
}

// Func to update the state on db, we send to our db true if the user is clicking on like or false if
//the user is clicking on to remove the like
async function like_post(btnid, post_id, user_id, index) {
    if (user_id === null) {
        window.location.replace('/login')
        return
    }
    const btn = document.getElementById(btnid)
    const likeCounter = document.getElementById(`likeCounter${index}`)
    const isLiked = (btn.classList.contains("liked") ? false : true)
    const res = await fetch(`http://127.0.0.1:8000/postLikes/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({
            like: isLiked,
        })
    })
    const json = await res.json()

    if (isLiked === false) {
        btn.classList.replace("liked", "like")
        btn.innerHTML = '&#9825;'
        likeCounter.innerHTML = json > 0 ? json : ""
    } else {
        btn.classList.replace("like", "liked")
        btn.innerHTML = '&hearts;'
        likeCounter.innerHTML = json
    }
    
}

// check if the user already liked it or not, like button &#9825; liked button &hearts;
function is_liked(user_id, users_likes, index, likeCounter) {
    if (!users_likes){ //testar !users_likes || !users_likes.includes(user_id)
        return `<button id="btn${index}"class="postBtn like">
                    &#9825; 
                </button>
                <span class="likeCounter" id="likeCounter${index}">${likeCounter > 0 ? likeCounter : ""}</span>`
    }
    else if (user_id && users_likes.includes(user_id)){
        return `<button id="btn${index}" class="postBtn liked">
                    &hearts;
                </button>
                <span class="likeCounter" id="likeCounter${index}">${likeCounter}</span>`
    }
    else {
        return `<button id="btn${index}" class="postBtn like">
                    &#9825;
                </button>
                <span class="likeCounter" id="likeCounter${index}">${likeCounter > 0 ? likeCounter : ""}</span>`
                
    }
}

function renderNoPosts(divPost) {
    // Render a message telling there is no posts yet
    const postHTML = `
        <div class="post">
            <p>There are no posts yet, check here our <a class="postUserName" href="/">home</a> page!</p>
        </div>`
        divPost.insertAdjacentHTML("beforeend", postHTML)
}

async function renderPosts(divPost, username=null){
    // by fetching infopost our answer is an array with all the posts and the last item is the user info
    try {
        const respose = await fetch(username===null ? `http://127.0.0.1:8000/infoPost/all` : `http://127.0.0.1:8000/infoPost/${username}`)
        const json = await respose.json()
        // if there is no posts, render some "post" telling there is no posts
        console.log(json)
        if (json.length === 1) {
            renderNoPosts(divPost)
            return
        }
        // the json const recevied 2 itens "posts" and "user"
        let postHTML
        json['posts'].forEach( (post, i) => {
            postHTML = `
                <div class="post">
                    <img class="profilePicturePost" src="${post.picture}">
                    <div class="postContent">
                        <div class="userAndTimestamp">
                            <a href="http://127.0.0.1:8000/profile/${post.username}" class="postUserName">${post.username}</a>
                            <p class="postTimestamp"> ${post.timestamp} </p>
                        </div>
                        <pre>${post.content}</pre>
                        ${is_liked((json['user'] ? json['user'].id : null), post.users_likes, i, post.users_likes.length)}
                    </div>
                </div>`
                divPost.insertAdjacentHTML("beforeend", postHTML)
                document.getElementById(`btn${i}`).addEventListener("click", () => like_post(`btn${i}`, post.id, (json['user'] ? json['user'].id : null), i ))
        })
        
    } catch (error) {
        console.log(error)
    }
}

// Function to follow and unfllow users and to change a picture in case the user needs to
function profileSettings(username) {
        // the btnSettings is a button that will be used to change a picture from a profile or to follow and unfollow users
        const btn = document.getElementById('btnSettings')
        if (btn.classList.contains("follow")) {
            // that means we have the follow button instead the edit profile picture
            btn.addEventListener('click', async () => {
                const res = await fetch(`http://127.0.0.1:8000/follow/${username}`, { method: "PUT" })
                const json = await res.json()
                // according to the info coming from django we set the button value and followers number, status can be unfollowing or following
                // if the status is unfollwing the user just unfollowed the profile than we change the button to "Follow", otherwise whe change it o "Unfollow"
                if (json['status'] === "unfollowing") {
                    btn.innerHTML="Follow"
                    document.getElementById("FollowersCounter").innerHTML = json['current']
                } else {
                    btn.innerHTML="Unfollow"
                    document.getElementById("FollowersCounter").innerHTML = json['current']
                }
            })
        }
        else if (btn.classList.contains("changePicture")) {
            console.log("Config Change Pic")
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
    else if (document.getElementById('followingPostsInsert')) {
        renderPosts(document.getElementById('followingPostsInsert'), "following")
    }

    // Checking if the user is on the profile page
    if (document.getElementById('profileContainer')) {
        const username = getCurrentURL().split('/').pop()
        profileSettings(username)
    }
    insertActiveClass(getCurrentURL(), allContainers)
})