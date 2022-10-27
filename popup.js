const nextButton = document.getElementById("next-post");
const prevButton = document.getElementById("prev-post");

let passwordsDiv = document.getElementById("passwords-div");

nextButton.addEventListener("click", () => {

    if (postNumber > codesmithPosts.length - 2) {

    }
    else {
        postNumber++;
        const currentPost = document.getElementById('currentPost')
        const newLine = document.createElement('p');
        newLine.innerText = `${codesmithPosts[postNumber].data.title}`
        currentPost.replaceChild(newLine, currentPost.firstChild)
        const postButton = document.getElementById('postButton')
        postButton.href = codesmithPosts[postNumber].data.url
        const currentXDisplay = document.getElementById('x')
        currentXDisplay.innerText = postNumber + 1;
    }
})

prevButton.addEventListener("click", () => {
    console.log(codesmithPosts)

    if (postNumber < 1) {

    }
    else {
        postNumber--;
        const currentPost = document.getElementById('currentPost')
        const newLine = document.createElement('p');
        newLine.innerText = `${codesmithPosts[postNumber].data.title}`
        // newLine.href = `${codesmithPosts[postNumber].data.url}`
        // newLine.target = '_blank'
        currentPost.replaceChild(newLine, currentPost.firstChild)
        const postButton = document.getElementById('postButton')
        postButton.href = codesmithPosts[postNumber].data.url
        const currentXDisplay = document.getElementById('x')
        currentXDisplay.innerText = postNumber + 1;
    }
})

let posts = []
let codesmithPosts = [];
let postNumber = 0

const getPosts = async () => {
    await fetch('https://www.reddit.com/r/codingbootcamp.json?limit=100').then((data) => data.json()).then((data) => {
        for (const post of data.data.children) {
            posts.push(post)
        }
    });
}

getPosts().then(() => {
    for (const post of posts) {
        let lowercaseSelftext = post.data.selftext.toLowerCase()
        let lowercaseTitle = post.data.title.toLowerCase()
        if (lowercaseSelftext.includes("codesmith") || lowercaseTitle.includes("codesmith")) {
            codesmithPosts.push(post)
        }
    }
}
).then(() => {
    console.log(codesmithPosts[0])
    const currentPost = document.getElementById('currentPost')
    const newLine = document.createElement('p');
    newLine.innerText = `${codesmithPosts[0].data.title}`
    currentPost.appendChild(newLine);
    const postButton = document.createElement('a')
    postButton.id = 'postButton'
    postButton.innerText = "Take me to the post"
    postButton.href = codesmithPosts[0].data.url
    postButton.target = '_blank'
    currentPost.appendChild(postButton)
    const currentXDisplay = document.getElementById('x')
    currentXDisplay.innerText = 1;
    const currentYDisplay = document.getElementById('y')
    currentYDisplay.innerText = codesmithPosts.length;
})

