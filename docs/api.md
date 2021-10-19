# API usage

## Authenticating

For each request you make to the Browserboard API, pass a header `Authorization=Token $YOUR_TOKEN`. Here is a small JavaScript object that will make interacting with the API easier if you're making these calls from a web browser.

```js
class BrowserboardAPI {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.baseURL = "http://localhost:8000";
    this.headers = {
      Authorization: `Token ${this.apiToken}`,
    };
  }

  getRequest(path, params) {
    let paramString = "";
    if (params.length > 0) {
      paramString =
        "?" +
        Object.keys(params)
          .map((k) => `${k}=${encodeURIComponent(params[k])}`)
          .join("&");
    }
    return fetch(`${this.baseURL}${path}${paramString}`, {
      headers: this.headers,
    }).then((response) => response.json());
  }

  postRequest(path, data) {
    return fetch(`${this.baseURL}${path}`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
}
```

## Creating a whiteboard

Creating a whiteboard and constructing its URL is a 3-step process.

1. Make a POST request to `/api/1.0/whiteboards/` with the `name` parameter. Store the response and extract the `wbid` field.
2. Make a GET request to `/api/1.0/whiteboards/<wbid>/access_keys`. Store the response.
3. Build the URL out of the parts like this, using the access key that fits your needs (admin/contribute/view): `https://browserboard.com/whiteboard/<wbid>?access_key=<access_key>`

Here's how you can do this in JavaScript using the helper class defined above:

```js
const browserboardAPI = new BrowserboardAPI(MY_API_TOKEN);
async function createWhiteboard(name) {
  const board = await browserboardAPI.postRequest("/api/1.0/whiteboards/", {
    name,
  });
  const accessKeys = await browserboardAPI.getRequest(
    `/api/1.0/whiteboards/${board.wbid}/access_keys`
  );
  return {
    board,
    accessKeys,
    shareURLs: {
      owner: `${browserboardAPI.baseURL}/whiteboard/${board.wbid}?access_key=${accessKeys.admin}`,
      contributor: `${browserboardAPI.baseURL}/whiteboard/${board.wbid}?access_key=${accessKeys.contribute}`,
      viewer: `${browserboardAPI.baseURL}/whiteboard/${board.wbid}?access_key=${accessKeys.view}`,
    },
  };
}
createWhiteboard("My cool whiteboard").then((result) => {
  console.log(result.shareURLs.owner);
});
```
