
import {templateNoop as html} from "./template-noop.js"

export function renderDone() {
	const div = document.createElement("div")
	div.innerHTML = html`
		<p>Sorry, you can only use this link once and you already have</p>
	`
	return div
}
