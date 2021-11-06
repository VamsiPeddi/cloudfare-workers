

// Adding This default data when there is no data in our KV DataBase.
const defaultData = {
    "1":
					{
					"title":"My First Post",
					"username":"coolguy123",
					"content":"Hey Y'all!"
					},
	"2":		{
					"title":"Story About my Dogs",
					"username": "kn0thing",
					"content": "So the other day I was in the yard, and..."
					},
	"TotalPosts": 2

  }

const getCache = key => BLOGKV_PROD.get(key)


// this functions check KV database , if there is no data it adds defaultData
// If there us data
async function titleGet(request) {
	const url = new URL(request.url)
	const id = url.pathname.substring(7)
	let data
	const cache = await getCache(id)
	data = JSON.stringify((JSON.parse(cache)))
	console.log('Got request', data)
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Content-type': 'application/json'
	  }
	return new Response(data, { headers })

  }
export default titleGet
