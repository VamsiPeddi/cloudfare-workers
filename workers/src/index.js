// import { handleRequest } from './handler'

import { Router } from 'itty-router'
import index from './handlers/index'
import titlePost from './handlers/posttitle'
import titleGet from './handlers/titleget'
import titleList from './handlers/titlelist'


  // We support the GET, POST, HEAD, and OPTIONS methods from any origin,
  // and accept the Content-Type header on requests. These headers must be
  // present on all responses to all CORS requests. In practice, this means
  // all responses to OPTIONS or POST requests.
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
  
  function handleOptions(request) {
    if (request.headers.get("Origin") !== null &&
      request.headers.get("Access-Control-Request-Method") !== null &&
      request.headers.get("Access-Control-Request-Headers") !== null) {
      // Handle CORS pre-flight request.
      return new Response(null, {
        headers: corsHeaders
      })
    } else {
      // Handle standard OPTIONS request.
      return new Response(null, {
        headers: {
          "Allow": "GET, HEAD, POST, OPTIONS",
        }
      })
    }
  }

addEventListener('fetch', event => {

	event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
	if (request.method === "OPTIONS") {
		return handleOptions(request)
	  } 
	const router =  Router()
	router.get('/', () => index(request))
	router.get('/posts/.+', () =>  titleGet(request))
	router.get('/posts/?', () => titleList(request))
	router.post('/posts/?', () => titlePost(request))
	const response = await router.handle(request)
	return response
}
