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
