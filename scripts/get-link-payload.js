
import * as base64url from "./base64url.js"

export function getLinkPayload() {
	let {hash} = window.location
	hash = hash.startsWith("#") ? hash.slice(1) : hash
	return hash
		? base64url.toObject(hash)
		: undefined
}
