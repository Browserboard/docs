// `npm install` or `yarn install` in the repo root, then run `node examples/node.js <your_api_token> <name_of_whiteboard>`.

const axios = require("axios").default;

class BrowserboardAPI {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.baseURL = "https://browserboard.com";
    this.headers = {
      Authorization: `token ${this.apiToken}`,
    };
  }

  async getRequest(path, params) {
    console.log(path);
    const result = (
      await axios.get(`${this.baseURL}${path}`, {
        params,
        headers: { ...this.headers },
      })
    ).data;
    console.log(JSON.stringify(result, null, "  "));
    return result;
  }

  async postRequest(path, data) {
    console.log(path);
    const result = (
      await axios.post(`${this.baseURL}${path}`, data, {
        headers: { ...this.headers },
      })
    ).data;
    console.log(JSON.stringify(result, null, "  "));
    return result;
  }

  async createWhiteboard(name) {
    const board = await this.postRequest("/api/1.0/whiteboards/", {
      name,
    });
    const accessKeysResponse = await this.getRequest(
      `/api/1.0/whiteboards/${board.wbid}/access_keys`
    );
    return {
      board,
      shareURLs: accessKeysResponse.share_urls,
    };
  }
}

const api = new BrowserboardAPI(process.argv[2]);
api.createWhiteboard(process.argv[3]).then((rsp) => {
  console.log("Results:");
  console.log(JSON.stringify(rsp, null, "  "));
});
// api.getRequest("/api/1.0/whiteboards/", {});
