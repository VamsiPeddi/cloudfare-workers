// Author : Vamsi Peddi
// This function is invoked when user makes get request on <site>/posts/
// This function checks in Cloudfare KV store to see if there is data. If not it just add 2 default records
// If there is data in KV , It will fecth all keys and corresponding values and form a json  array and return to the client
// we are also maintaining TotalPosts in KV. this is useful to add new POSTs
// user invokes the https request http://127.0.0.1:8787/posts/
// this program return [{"title":"My First Post","username":"coolguy123","content":"Hey Y'all!"},{"title":"Story About my Dogs","username":"kn0thing","content":"So the other day I was in the yard, and..."},{"title":"My 3rd Post","username":"coolguy134","content":"Hey Y'all!"},{"title":"My4th Post","username":"coolguy134","content":"Hey Y'all!"}]


// Adding This default data when there is no data in our KV DataBase.

const defaultData = {
    "1":
					{
					"id" : 1,
					"title":"My First Post",
					"username":"coolguy123",
					"content":"Hey Y'all!"
					},
	"2":		{
					"id" : 2,
					"title":"Story About my Dogs",
					"username": "kn0thing",
					"content": "So the other day I was in the yard, and..."
					},
	"TotalPosts": 2

  }


// Following 2 lines of code set and get data into Cloudflare’s Workers KV - it’s a
// simple key-value store that you can access inside of your Worker script to read data.
const setCache = (key, data) => MYDATA.put(key, data)
const getCache = key => MYDATA.get(key)

// you can only fecth 1000 keys, hence we need to go into multiple fetchs using cursor
async function* listAllKeys(namespace, options) {
	let cursor;
	let hasNextPage = true;
	while (hasNextPage) {
	  const results = await namespace.list({ ...options, cursor })
	  const { keys: queue } = results
	  hasNextPage = !results.list_complete

	  while (queue.length > 0) {
		const key = queue.shift()
		if (key !== undefined) yield key
	  }
	}
  }

  async function setdefaultData(defaultData) {
	for (var key in defaultData) {
		if (defaultData.hasOwnProperty(key)) {
			console.log(key + " -> " + JSON.stringify(defaultData[key]));
			await setCache(key, JSON.stringify(defaultData[key]))
		}
	}

  }


// this functions check KV database , if there is no data it adds defaultData
// If there us data
async function titleList(request) {
	// defaultkey = 1 is only to check if there is data in KV
	const defaultkey = '1'
	let data
	const cache = await getCache(defaultkey)
	if (!cache) {
		setdefaultData(defaultData)
	}
	let myjsonlist = []
	for await (const key of listAllKeys(MYDATA, {type: 'json'})) {
		if ( key.name != "TotalPosts") {
			const cache = await getCache(key.name)
			myjsonlist.push(JSON.parse(cache))
		}
	}
	data = JSON.stringify(myjsonlist)
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Content-type': 'application/json'
	  }
	return new Response(data, { headers })

  }


export default titleList
