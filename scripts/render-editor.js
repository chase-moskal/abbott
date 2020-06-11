
import {templateNoop as html} from "./template-noop.js"
import {prepareComputeResult} from "./compute-result.js"

export function renderEditor() {
	const div = document.createElement("div")
	div.innerHTML = html`
		<h1>abbott</h1>
		<p>a/b split testing link redirector</p>
		<p>this app is serverless. no tracking</p>
		<p>open source: <a href="https://github.com/chase-moskal/abbott">github.com/chase-moskal/abbott</a></p>
		<textarea placeholder="enter one link per line"></textarea>
		<label><input name="once" type="checkbox"/> users can only use link once</label>
		<div class="result"></div>
	`

	const result = div.querySelector(".result")
	const textarea = div.querySelector("textarea")
	const onceCheckbox = div.querySelector("input[name=once]")
	const computeResult = prepareComputeResult({result, textarea, onceCheckbox})

	textarea.onkeyup = computeResult
	textarea.onchange = computeResult
	onceCheckbox.onchange = computeResult

	return div
}
