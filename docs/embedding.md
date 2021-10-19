# Embedding whiteboards

## Example

Construct the URL for a whiteboard like this: `https://browserboard.com/whiteboard/$board_id?access_key=$access_key`

Use this HTML, with your own values for width, height, and style:

```html
<iframe
  id="browserboard"
  src="https://browserboard.com/whiteboard/$board_id?access_key=$access_key"
  allow="fullscreen"
  sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-forms"
  title="Embedded whiteboard"
  width="1024"
  height="768"
  style="border: 1px solid black"
></iframe>
```

Note that _only_ whiteboards created using the API may be embedded. This limitation is a little arbitrary; it mostly exists to ensure we have a small amount of control over people embedding boards

## Details
