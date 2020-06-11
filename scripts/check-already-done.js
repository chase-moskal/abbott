
export function checkAlreadyDone(payload) {
	let done = false
	const checksum = JSON.stringify(payload)
	if (payload.once) {
		const storedChecksum = window.localStorage.getItem("done")
		window.localStorage.setItem("done", checksum)
		if (storedChecksum === checksum) {
			done = true
		}
	}
	return done
}
