// import { handleRequest } from './handler'

import { Router } from 'itty-router'
import index from './handlers/index'
import titlePost from './handlers/posttitle'
import titleGet from './handlers/titleget'
import titleList from './handlers/titlelist'



addEventListener('fetch', event => {

	event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
	const router =  Router()
	router.get('/', () => index(request))
	router.get('/posts/.+', () =>  titleGet(request))
	router.get('/posts/?', () => titleList(request))
	router.post('/posts/?', () => titlePost(request))
	const response = await router.handle(request)
	return response
}