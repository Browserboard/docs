# Authentication

1. Create a user account
2. Visit this page: https://browserboard.com/whiteboards/user_details/api_tokens
3. Click "Generate token"
4. For each request you make to the Browserboard API, pass a header `Authorization=Token $YOUR_TOKEN`.

# Creating whiteboards

List whiteboards using `GET https://browserboard.com/api/1.0/whiteboards/`. You can test this using httpie like this: `http GET https://browserboard.com/api/1.0/whiteboards/ 'Authorization:Token $YOUR_TOKEN'`

Create a new board using `POST https://browserboard.com/api/1.0/whiteboards/ name="My Whiteboard"`, where "name" is in the form data in the POST body. You may also pass `constant_size_width` and `constant_size_height` to specify a size, but these fields are not yet used because I'm not finished with the size feature.

Viewing a board requires an access key. Access keys are either `admin`, `contribute`, or `view`. If you're creating one board per visit, you probably want the `admin` one. If multiple users are sharing a board, you probably want `contribute`.

Fetch access keys for a board using `GET /api/1.0/whiteboards/$board_id/access_keys`.

# Embedding whiteboards

Construct the URL for a whiteboard like this: `https://browserboard.com/whiteboard/$board_id?access_key=$access_key`

Use this HTML:

```
<iframe
  src="https://browserboard.com/whiteboard/52hTQVtV9mHqg3aKxnkhQ2?key=2btG73hGSCrnN9ZkH2vA32"
  allow="fullscreen"
  sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-forms"
  title="Embedded whiteboard"
  width="1024"
  height="768"
  style="border: 1px solid black"
    ></iframe>
```