
import * as base64url from "./base64url.js"
import {templateNoop as html} from "./template-noop.js"

const max = 2048

function validateLink(link) {
	return !!(link && /^https?:\/\//i.test(link))
}

function encodeCompositeLink(options) {
	const {payload, baseUrl} = options
	return `${baseUrl}#${base64url.fromObject(payload)}`
}

export function prepareComputeResult({textarea, onceCheckbox, result}) {

	// run whenever the user changes the inputs
	return function computeResult() {

		//
		// compute the payload, which contains the links
		//

		const empty = !textarea.value
		const links = textarea.value
			.split("\n")
			.map(line => line.trim())
			.filter(line => line.length > 0)
		const once = onceCheckbox.checked
		const payload = {once, links}

		//
		// encode the payload into a composite link
		//

		const {origin, pathname, search} = location
		const baseUrl = origin + pathname + search
		const compositeLink = encodeCompositeLink({
			payload,
			baseUrl,
		})

		//
		// validation to collect any warnings
		//

		const warnings = []
		{
			// warn when not enough links
			if (links.length < 2)
				warnings.push("you must enter at least two links")
		
			// warn when composite link is too long
			if (compositeLink.length > max)
				warnings.push(`composite link must be less than ${max} characters long`
					+ ` (currently ${compositeLink.length})`)
		
			// warn on each invalid link
			for (const link of links) {
				if (!validateLink(link))
					warnings.push(`invalid link: "${link}"`)
			}
		}

		//
		// if validation fails, display the warnings div
		//

		if (empty) {
			result.innerHTML = ""
		}

		else if (warnings.length) {
			result.innerHTML = html`
				<div class="warnings">
					<h2>input errors</h2>
					<ol class="invalid">
						${warnings.map(warning => `
							<li>${warning}</li>
						`).join("")}
					</ol>
				</div>
			`
		}

		//
		// if validation succeeds, render the success div
		//

		else {
			const linkPreview = compositeLink.length > 50
				? compositeLink.substr(0, 50) + "..."
				: compositeLink
			result.innerHTML = html`
				<div class="success">
					<h2>composite link for random redirect</h2>
					<p><a target="_blank" href="${compositeLink}">${linkPreview}</a></p>
					<ul class="breakdown">
						<li>users who click the composite link are randomly redirected to one of the input links</li>
						<li>click link to test in new tab, or right-click and copy link address to share with your users</li>
						<li>${links.length} links are encoded in the composite link</li>
						<li>composite link is ${compositeLink.length} characters long (max ${max})</li>
						${once
							? html`<li>user can only use this link one time</li>`
							: html`<li>user can use this link multiple times</li>`}
					</ul>
				</div>
			`
		}
	}
}
