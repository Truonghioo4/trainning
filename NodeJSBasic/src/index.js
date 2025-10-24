const API_URL = "https://jsonplaceholder.typicode.com"
// 1. get users, posts, comments from api
const getAllData = async () => {
    try {
        const [ users, posts, comments ] = await Promise.all([
            fetch(`${API_URL}/users`).then((res) => res.json()),
            fetch(`${API_URL}/posts`).then((res) => res.json()),
            fetch(`${API_URL}/comments`).then((res) => res.json())
        ])
        return {
            users,
            posts,
            comments
        }
    } catch (e){ console.error(e) }
}

// 2. Get all the user, posts and comments from the API. Map the data with the users array. 
const usersWithData = async () => {
    const users = await getAllData().then(data => data.users)
    const posts = await getAllData().then(data => data.posts)
    const comments = await getAllData().then(data => data.comments)
	const usersData = users.map(user => {
		const userPosts = posts.filter(post => user.id === post.userId)
		const userComments = comments.filter(comment => userPosts.some(post => post.id === comment.postId))
		// console.log(userComments.map(({id, postId, name, body}) =>({id, postId, name, body})))
		return {
			id: user.id,
			name: user.name,
			username: user.username,
			comments: userComments.map(({id, postId, name, body}) =>({id, postId, name, body})),
			posts: userPosts.map(({id, title, body}) =>({id, title, body}))
		}
	})
	return usersData
}

// 3. Filter only users with more than 3 comments.
const getUserWithMoreThreeComment = async () => {
	const usersData = await usersWithData()
	const userWithMoreThreeComment = usersData.filter(user => user.comments.length >= 3)
	return userWithMoreThreeComment
}

// 4. Reformat the data with the count of comments and posts
const usersReformat = async () => {
	const users = await usersWithData();
	const usersReformat = users.map(user => (
		{
			...user,
			comments: user.comments.length,
			posts: user.posts.length
		}
	))
	return usersReformat
} 

// 5. Who is the user with the most comments
const getUserMostComments = async () => {
	const users = await usersReformat()
	const userMostComments = users.reduce((maxUser, currentUser) => (
		currentUser.comments.length > maxUser.comments.length ? currentUser : maxUser
	))
	return userMostComments;
}

// 6. Who is the user with the most posts
const getUserMostPosts = async () => {
	const users = await usersReformat()
	const userMostPosts = users.reduce((maxUser, currentUser) => (
		currentUser.posts > maxUser.posts ? currentUser : maxUser
	))
	return userMostPosts;
}

// 7. Sort the list of users by the postsCount value descending
const SortUserByPostsCount = async () =>{
	const users = await usersReformat()
	const usersSorted = users.sort( (a,b) => b.posts - a.posts)
	return usersSorted

}

// 8. Post Merge Comments
const getPostMergeComment = async (postId) => {
    const [post, postComments] = await Promise.all([
        fetch(`${API_URL}/posts/${postId}`).then((res) => res.json()),
        fetch(`${API_URL}/posts/${postId}/comments`).then((res) => res.json()),
      ])
		return {
			...post,
			comments: postComments
		}
}

// Test function to view data for each requirement

// getAllData().then(data => console.log("Get data from all users from API:\n",
//     JSON.stringify(data.users, null, 2)))

// usersWithData().then(data => console.log("Users with posts and comments for each:\n",
//     JSON.stringify(data, null, 2)))

// getUserWithMoreThreeComment().then(data => console.log("Users with more than 3 comments:\n",
//     JSON.stringify(data, null, 2)))

// usersReformat().then(data => console.log("Reformat the data with the count of comments and posts:\n",
//     JSON.stringify(data, null, 2)))

// getUserMostComments().then(data => console.log("User with the most comments:\n",
//     JSON.stringify(data, null, 2)))

// getUserMostPosts().then(data => console.log("User with the most posts:\n",
//     JSON.stringify(data, null, 2)))

// SortUserByPostsCount().then(data => console.log("Sort the list of users by the postsCount value descending:\n",
//     JSON.stringify(data, null, 2)))

// getPostMergeComment(1).then(data => console.log("Posts Merge Comments:\n",
//     JSON.stringify(data, null, 2)))





