const ID_REGEX = /\d+$/

export const enrichId = (content) => {
	return content.map((item) => {
		item.self_id = item.links.find((link) => link.rel === "self").href.match(ID_REGEX)[0]
		return item
	})
}