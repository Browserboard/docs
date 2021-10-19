# Embedding whiteboards

## Example

Construct the URL for a whiteboard like this: `https://browserboard.com/whiteboard/$board_id?access_key=$access_key`

Use this HTML, with your own values for width, height, and style:

```html
<iframe
  src="https://browserboard.com/whiteboard/$board_id?access_key=$access_key"
  allow="fullscreen"
  sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-forms"
  id="browserboard"
  title="Embedded whiteboard"
  width="1024"
  height="768"
  style="border: 1px solid black"
></iframe>
```

Note that _only_ whiteboards created using the API may be embedded. This limitation is a little arbitrary; it mostly exists to ensure we have a small amount of control over people embedding boards

## iframe tag details

`id`, `title`, `width`, `height`, and `style` can all be changed to fit in with your site.

`src` must be a valid URL from the `share_urls` object on [the `access_keys` API](/api.md#api-1-0-whiteboards-wbid-access-keys).

`allow=fullscreen` lets Browserboard use the web browser's fullscreen capabilities. It isn't exposed in the UI today but might be in the future. You can also omit this to disallow Browserboard from going fullscreen.

`sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-forms"` lets Browserboard perform its basic functions. This attribute can't be modified.
