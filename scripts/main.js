
import {checkAlreadyDone} from "./check-already-done.js"
import {renderDone} from "./render-done.js"
import {getLinkPayload} from "./get-link-payload.js"
import {renderEditor} from "./render-editor.js"
import {randomRedirect} from "./random-redirect.js"

const payload = getLinkPayload()
function insert(div) {
	document.body.appendChild(div)
}

if (payload) {
	const done = checkAlreadyDone(payload)
	if (done) insert(renderDone())
	else randomRedirect(payload.links)
}
else {
	insert(renderEditor())
}
