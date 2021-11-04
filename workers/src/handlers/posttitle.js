// this function is invoked by client using POST request
// This function reqads totalposts and add 1 to it and write back totalpost into KV
// Also writes new data to KV
// Payload for post request should be as follows
//      {
//               "data" : {"title":"My 10th Post","username":"coolguy44444","content":"Hey Love Cloudfare KV"}
//      }

import { htmlResponse } from '../lib/responses'

const setCache = (key, data) => MYDATA.put(key, data)
const getCache = key => MYDATA.get(key)
//const getTotalPosts  = key => MYDATA.get("TotalPosts")


const titlePost = async request => {

    // Get total post from KV and incremet value by 1
    const totalPosts = await getCache('TotalPosts')
    let newkey = JSON.parse(totalPosts) + 1
    console.log( 'Total Posts' + newkey)

    // Get the payload data and add it to KV using the newkey value heberated above
	const { data } = await request.json()
    // add id key to data
    data["id"] = newkey
    await setCache(newkey, JSON.stringify(data))
    await setCache('TotalPosts', newkey)
	return htmlResponse('SUCCESS')
}




export default titlePost