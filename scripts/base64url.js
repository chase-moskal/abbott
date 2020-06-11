
export function fromObject(object) {
	const text = JSON.stringify(object)
	const base64 = btoa(text)
	const base64url = encodeURIComponent(base64)
	return base64url
}

export function toObject(base64url) {
	const base64 = decodeURIComponent(base64url)
	const text = atob(base64)
	return JSON.parse(text)
}
