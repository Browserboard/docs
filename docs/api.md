# API usage

Note that **it is not possible to call the API from a web browser.** You must do it on the server due to CORS restrictions. This is good for you because it forces you to keep your API token a secret; if Browserboard allowed API requests from web browsers, users would be able to trivially discover your private API token.

## Authenticating

For each request you make to the Browserboard API, pass a header `Authorization=Token $YOUR_TOKEN`.

## Example

You can see a complete example of creating a whiteboard in [this node.js example](https://github.com/Browserboard/docs/tree/main/examples/node.js). Feel free to write in and request additional examples.

## Creating a whiteboard

Creating a whiteboard and constructing its URL is a two-step process.

1. Make a POST request to `/api/1.0/whiteboards/` with the `name` parameter. Store the response and extract the `wbid` field.
2. Make a GET request to `/api/1.0/whiteboards/<wbid>/access_keys`. Use the approprate URL from the `share_urls` dictionary.

## Reference

### `/api/1.0/whiteboards/`

- GET: list all whiteboards
- POST: create a new whiteboard
  - `name`: Name of the new whiteboard

### `/api/1.0/whiteboards/<wbid>`

- GET: list details for one whiteboard
- PUT: update a whiteboard
  - `name`: Name of the new whiteboard

### `/api/1.0/whiteboards/<wbid>/access_keys`

- GET: list access keys and all share URLs for one whiteboard

### `/api/1.0/whiteboards/<wbid>/copy_from_template`

- POST: Copy another board's events into this board. Must include `template_id` in POST body. You must be the owner of both boards.
  `template_id`: wbid of the whiteboard to copy from.

## Output of the `node.js` example

```
> npm install
> node examples/node.js $API_TOKEN "Demo whiteboard"
/api/1.0/whiteboards/
{
  "name": "Demo whiteboard",
  "is_template": false,
  "wbid": "...",
  "t_created": "2021-10-19T23:08:26.205543Z",
  "t_updated": "2021-10-19T23:08:26.205551Z",
  "thumbnail_url": null,
  "absolute_url": "/whiteboard/..."
}
/api/1.0/whiteboards/.../access_keys
{
  "access_keys": {
    "view": "...",
    "contribute": "...",
    "admin": "..."
  },
  "share_urls": {
    "view": "https://browserboard.com/whiteboard/...?access_key=...",
    "contribute": "https://browserboard.com/whiteboard/...?access_key=...",
    "admin": "https://browserboard.com/whiteboard/...?access_key=..."
  }
}
Results:
{
  "board": {
    "name": "Demo whiteboard",
    "is_template": false,
    "wbid": "...",
    "t_created": "2021-10-19T23:08:26.205543Z",
    "t_updated": "2021-10-19T23:08:26.205551Z",
    "thumbnail_url": null,
    "absolute_url": "/whiteboard/..."
  },
  "shareURLs": {
    "view": "https://browserboard.com/whiteboard/...?access_key=...",
    "contribute": "https://browserboard.com/whiteboard/...?access_key=...",
    "admin": "https://browserboard.com/whiteboard/...?access_key=..."
  }
}
```
