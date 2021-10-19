# Iframe API

This page assumes you've added an `iframe` to your HTML as described in [the embedding example](/embedding.md#example) and assigned it to a variable called `iframeElement`. For example:

```js
const iframeElement = document.getElementById("browserboard");
```

Iframes allow two-way communication. To get a message in, you use the [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method on your iframe element. To get messages out, you listen to the [`"message"`](https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event) event on `window`. Browserboard uses both of these things to communicate with your code in the web browser.

The "in" and "out" message objects both use `"action"` as an object key representing what should be done. You can "send a message" to Browserboard or "receive a message" from Browserboard, and the "action" tells us what to do with the message.

## Configuring the interface using the URL hash

You can configure a few of Browserboard's features using the URL hash, appended to the URL you pass to the iframe. Here is a comprehensive example:

```html
<iframe
  src="https://browserboard.com/whiteboard/$board_id?access_key=$access_key#colors=%23f00,%2300f&strokeWidths=2,3,4,20&defaultLineCap=square&tools=line,select&isZoomAllowed=false"
  ...
>
</iframe>
```

Append this to the URL you put in the iframe.

- `colors`: Comma-separated list of colors. Make sure to escape `#` characters as `%23`. Translucent colors defined with `rgba` are allowed.
- `strokeWidths`: Comma-separated list of stroke widths.
- `defaultLineCap`: `round`, `butt`, or `square`. Google "MDN linecap" for details. Browserboard's default is `round`.
- `tools`: Comma-separated list of tools to display. Possible values are:
  - `arrow`
  - `line`
  - `pan`
  - `pen`
  - `marker`
  - `rect`
  - `diamond`
  - `ellipse`
  - `select`
  - `eraser`
  - `text`
  - `sticky`
  - `imageLibrary`
  - `imageUpload`
- `isZoomAllowed`: If `false`, zoom controls are disabled.

## Sending messages

Telling Browserboard to do things always looks like this:

```js
iframeElement.contentWindow.postMessage(
  // what to send
  { action: "actionName", ...otherArguments },
  // tell the browser who we expect the iframe to be
  "https://browserboard.com"
);
```

You might want to condense this down with a helper function:

```js
function sendBrowserboardMessage(message) {
  iframeElement.contentWindow.postMessage(message, "https://browserboard.com");
}
```

## Receiving messages

Subscribe to the `"message"` event on `window`, like this:

```js
window.addEventListener("message", (e) => {
  switch (e.data.action) {
    case "actionName":
      break; /* handle the action */
    /* the rest of this file will explain what actions exist and how to handle them. */
  }
});
```

## Downloading images

To convert the whiteboard to a PNG and get a copy of it, send this message:

```js
{ "action": "downloadImage" }
```

Then, wait for these messages:

```js
{
    // This action may fire if the image takes a long time to render.
    "action": "updateDownloadImageProgress",
    "progress": number, // 0-1
}
{
    "action": "downloadImageComplete",
    "url": string, // this is a data URL
}
```

## Inserting images and PDFs

To insert an image into the board, use the `insertImage` message. The value of `url` must point to an image that already exists on the web.

```js
sendBrowserboardMessage({
  action: "insertImage",
  url: "https://the/image/url",
});
```

To insert a PDF, use the `insertPDF` message. Browserboard will prompt the user for a page range to insert.

```js
sendBrowserboardMessage({ action: "insertPDF", url: "https://the/pdf/url" });
```
