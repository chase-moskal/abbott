
export function randomRedirect(links) {
	const randomIndex = Math.floor(Math.random() * links.length)
	const link = links[randomIndex]
	window.location = link
}
