import notFoundHtml from '../../html/404.html'

export const htmlResponse = html =>
	new Response(html, {
		headers: { 'content-type': 'text/html' , 'Access-Control-Allow-Origin': '*' },
	})

export const JsonResponse = html =>
new Response(html, {
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-type': 'application/json'
	  },
})


export const notFoundResponse = () =>
	new Response(notFoundHtml, {
		headers: { 'content-type': 'text/html', 'Access-Control-Allow-Origin': '*' },
		status: 404,
	})