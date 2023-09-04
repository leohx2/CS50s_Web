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

// function to edit post
async function editPost(post, divContent) {
    divContent.innerHTML = `
    <textarea id="idEditTextArea" class="textAreaEdit">${post.content}</textarea>
    <button id="saveBtn" class="saveDiscard save">Save</button>
    <button id="discardBtn" class="saveDiscard discard">Discard</button>
    `
    document.getElementById("saveBtn").addEventListener("click", async () => {
        textarea = document.getElementById("idEditTextArea")
        post.content = textarea.value
        divContent.innerHTML=`<pre>${post.content}</pre>`
        await fetch(`http://127.0.0.1:8000/editPost/${post.id}`, {
            method: "PUT",
            body: JSON.stringify({
                content: post.content
            })
        }) 
    })
    document.getElementById("discardBtn").addEventListener("click", () => {divContent.innerHTML=`<pre>${post.content}</pre>`})
}

function pageLink(typeOfPage) {
    if (typeOfPage === null) {
        return 'http://127.0.0.1:8000'
    } else if (typeOfPage === 'following') {
        return 'http://127.0.0.1:8000/followingPosts'
    } else {
        return `http://127.0.0.1:8000/profile/${typeOfPage}`
    }
}

// function to create pagination buttons
function createPaginationButtons (paginatorDiv, numPages, currentPage, typeOfPage) {
    // creat an array with the pages to kmow how many buttons we need
    const pageList = []
    for (let i = 1; i <= numPages; i++){
        pageList.push(i)
    }

    // if the currentPage is the first we don't ad a "previous button" and if it's the last one (currentPage === numPages) we don't add the "next" button
    // if numPages is greater we can insert the pagination
    if (numPages > 1) {
        // If the current page is not the first we add the previous page link.
        if (currentPage > 1){
            const linkPre = document.createElement("a")
            if (currentPage == 2) {
                linkPre.href = pageLink(typeOfPage)
            } else {
                linkPre.href = `${pageLink(typeOfPage)}/page/${parseInt(currentPage) - 1}`
            }
            linkPre.textContent = `<< Previous`
            linkPre.classList.add("paginatorNumber")
            paginatorDiv.appendChild(linkPre)
        }
        // check each number of the pageList
        pageList.forEach((page) => {
            const link = document.createElement("a")
    
            if (page === parseInt(currentPage)){
                link.href = "#"
                link.classList.add("current")
            } 
            else if (page === 1) {
                link.href = pageLink(typeOfPage)
            }
            else {
                link.href = `${pageLink(typeOfPage)}/page/${page}`
            }
            link.textContent = `${page}`
            link.classList.add("paginatorNumber")
            paginatorDiv.appendChild(link)
        })
        if (currentPage < numPages){
            const linkNext = document.createElement("a")
            linkNext.href = `${pageLink(typeOfPage)}/page/${parseInt(currentPage) + 1}`
            linkNext.textContent = "Next >>"
            linkNext.classList.add("paginatorNumber")
            paginatorDiv.appendChild(linkNext)
        }
    }
}

// function to render posts and pagination no matter which page the user is
async function renderPosts(divPost, username=null, page=1){
    // by fetching infopost our answer is an array with all the posts and the last item is the user info
    try {
        let response
        const paginatorContainer = document.getElementById("paginatorDiv")

        if (page === 1) {
            response = await fetch(username===null ? `http://127.0.0.1:8000/infoPost/all` : `http://127.0.0.1:8000/infoPost/${username}`)
        }
        else {
            response = await fetch(username===null ? `http://127.0.0.1:8000/infoPost/all/page/${page}` : `http://127.0.0.1:8000/infoPost/${username}/page/${page}`)
        }
        const json = await response.json()
        // if there is no posts, render some "post" telling there is no posts
        if (json['posts'] === 0) {
            renderNoPosts(divPost)
            return
        }
        // the json const recevied 4 itens "posts", "user" and "num_pages"
        let postHTML
        // For each post we render the posts
        json['posts'].forEach( (post, i) => {
            postHTML = `
                <div class="post">
                    <img class="profilePicturePost" src="${post.picture}">
                    <div class="postContent">
                        <div class="userAndTimestamp">
                            <a href="http://127.0.0.1:8000/profile/${post.username}" class="postUserName">${post.username}</a>
                            ${json['user'].id === post.user_id ? `<button id="editButton${i}" class="edit">&#9998;</button>` : ''}
                            <p class="postTimestamp"> ${post.timestamp} </p>
                        </div>
                        <div id="divContent${i}">
                            <pre>${post.content}</pre>
                        </div>
                        ${is_liked((json['user'] ? json['user'].id : null), post.users_likes, i, post.users_likes.length)}
                    </div>
                </div>`
                divPost.insertAdjacentHTML("beforeend", postHTML)
                document.getElementById(`btn${i}`).addEventListener("click", () => like_post(`btn${i}`, post.id, (json['user'] ? json['user'].id : null), i ))
                if (json['user'].id === post.user_id) {
                    document.getElementById(`editButton${i}`).addEventListener("click", () => {editPost(post, document.getElementById(`divContent${i}`))})
                }
        })
        // Creating a pagination
        if (json['num_pages'] > 1) {
            createPaginationButtons(paginatorContainer, json['num_pages'], page, username)
        }
    } catch (error) {
        console.log(error)
    }
}

// This function will create the open and close modal functionalities 
function createModal(modal, openModal, closeModal) {
    // get the 3 parts of the modal, itself, the way to open and the element to close it
    const v_modal = document.getElementById(modal)
    const v_openModal = document.getElementById(openModal)
    const v_closeModal = document.getElementById(closeModal)
    
    v_openModal.addEventListener('click', () => {
        v_modal.showModal()
        document.querySelector("body").addEventListener('click', (e) => {
        // Check if the e.target === v_modal, if yes the user is clicking outside of the modal and we close it
        // Because of the itens inside of the modal the target can't select the modal unless the user click outside of it
        // all the paddings were removed from dialog, causing a dialog area 100% filled with another elements.
        // but the margin of the dialog still filling the rest of the page, causing the necessary result
        console.log("clicking")
        if (e.target === v_modal) {
            v_modal.close()
        }
        })
    })
    
    v_closeModal.addEventListener('click', () => {
        v_modal.close()
    })

}

// Function to follow and unfllow users and to change a picture in case the user needs to
function profileSettings(username) {
    // the btnSettings is a button that will be used to change a picture from a profile or to follow and unfollow users
    const btn = document.getElementById('btnSettings')
    if (btn.classList.contains("follow") || btn.classList.contains("unfollow")) {
        // that means we have the follow button instead the edit profile picture
        btn.addEventListener('click', async () => {
            const res = await fetch(`http://127.0.0.1:8000/follow/${username}`, { method: "PUT" })
            const json = await res.json()
            // according to the info coming from django we set the button value and followers number, status can be unfollowing or following
            // if the status is unfollwing the user just unfollowed the profile than we change the button to "Follow", otherwise whe change it o "Unfollow"
            if (json['status'] === "unfollowing") {
                btn.classList.replace("unfollow", "follow")
                btn.innerHTML="Follow"
                document.getElementById("FollowersCounter").innerHTML = json['current']
            } else {
                btn.classList.replace("follow", "unfollow")
                btn.innerHTML="Unfollow"
                document.getElementById("FollowersCounter").innerHTML = json['current']
            }
        })
    }
    else if (btn.classList.contains("changePicture")) {
        // If we access our profile we'll be able to change the picture.
        // That part of the code works to change the style of the text to display on the button file
        const fileInput = document.getElementById("file-upload")
        const imageNameText = document.getElementById("image-name-text")

        fileInput.addEventListener('change', () => {
            if (fileInput.value === '') {
                // If it's there no files, set to nothing to display
                imageNameText.innerHTML = ""
            }
            else {
                // If the user uploads an image  we display the file name
                const imagePath = fileInput.value.split('\\');

                imageNameText.innerHTML= imagePath.pop()
            }
        })
    }
    // After render the profile page now we render the modal to be displayed everytime the user wants to see
    // who are the following and followers, just by clicking on "Followers" or "Following"
    // The only reason I'm calling the function here is to makesure we are in the rightPage.
    createModal("modalFollowers", "followers", "closeModalFollowers")
    createModal("modalFollowing", "following", "closeModalFollowing")
}

function getCurrentPage() {
    // Get the page number based on the url
    const currentUrl = getCurrentURL().split('/')
    if (currentUrl.includes('page'))
        return currentUrl.pop();
    return 1;
    
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
        renderPosts(document.getElementById('postInsert'), null ,getCurrentPage())
    } 
    else if (document.getElementById('userPostsInsert')) {
        const username = getCurrentURL().split('/')
        renderPosts(document.getElementById('userPostsInsert'), username[4], getCurrentPage())
    }
    else if (document.getElementById('followingPostsInsert')) {
        renderPosts(document.getElementById('followingPostsInsert'), "following", getCurrentPage())
    }

    // Checking if the user is on the profile page
    if (document.getElementById('profileContainer')) {
        const username = getCurrentURL().split('/').pop()
        profileSettings(username)
    }
    insertActiveClass(getCurrentURL(), allContainers)
})