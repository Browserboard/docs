# Iframe API

## Sending messages

## Receiving messages

## Downloading images

Once you have the whiteboard loaded in an iframe, you can ask it to render you a PNG of its contents. You do this using the `postMessage` API provided by web browsers to communicate between windows.

First, listen for your own message events so you can get communication from the iframe:

```js
window.addEventListener("message", (e) => {
  console.log("MESSAGE:", e.data);
});
```

Then, make a request like this:

```js
const iframe = document.querySelector("iframe#browserboard");
iframe.contentWindow.postMessage(
  { action: "downloadImage" },
  "https://browserboard.com"
);
```

Right now, there are two possible message types.

```js
{
    "action": "updateDownloadImageProgress",
    "progress": number,
}
{
    "action": "downloadImageComplete",
    "url": string, // this is a data URL
}
```

## Configuring colors, line widths, tools, and more

You can configure a few of Browserboard's features using the URL hash. Here is a comprehensive example:

`#colors=%23f00,%2300f&strokeWidths=2,3,4,20&defaultLineCap=square&tools=line,select&isZoomAllowed=false`

- `colors`: Comma-separated list of colors. Make sure to escape `#` characters as `%23`.
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
- `isZoomAllowed`: If `false`, zoom controls are disabled.

## Inserting images and PDFs

To insert an image into the board, call this method on your iframe instance. The value of `url` must point to an image that already exists on the web.

```js
iframe.contentWindow.postMessage(
  { action: "insertImage", url: "https://the/image/url" },
  "https://browserboard.com"
);
```

To insert a PDF, use this message. Browserboard will prompt the user for a page range.

```js
iframe.contentWindow.postMessage(
  { action: "insertPDF", url: "https://the/pdf/url" },
  "https://browserboard.com"
);
```
