// this function is invoked by client using POST request
// This function reqads totalposts and add 1 to it and write back totalpost into KV
// Also writes new data to KV
// Payload for post request should be as follows
//      {
//               "data" : {"title":"My 10th Post","username":"coolguy44444","content":"Hey Love Cloudfare KV"}
//      }

import { htmlResponse } from '../lib/responses'

const setCache = (key, data) => BLOGKV_PROD.put(key, data)
const getCache = key => BLOGKV_PROD.get(key)
//const getTotalPosts  = key => BLOGKV_PROD.get("TotalPosts")


const feddbackPost = async request => {

    // Get the payload data and add it to KV using the newkey value heberated above
	const { id,feedback } = await request.json()
    // {"id":5,"title":"My First Post","username":"xxxxx","content":"Hey Y'all!", "likes" : 10, "dislikes" : 20 }

    if ( feedback === 'P') { 

    const mydata = await getCache(id)
    mydata.likes = mydata.likes + 1
    await setCache(id, JSON.stringify(mydata))

    } else {

        const mydata = await getCache(id)
        mydata.dislikes = mydata.dislikes + 1
        await setCache(id, JSON.stringify(mydata))

    }
	return htmlResponse('SUCCESS')
}




export default feddbackPost