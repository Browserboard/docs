// `npm install` or `yarn install` in the repo root, then run:
// `node examples/node.js <your_api_token> <name_of_whiteboard> [an existing board ID to copy from]`.

const axios = require("axios").default;

class BrowserboardAPI {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.baseURL = "http://localhost:8000";
    this.headers = {
      Authorization: `token ${this.apiToken}`,
      "Content-Type": "application/json; charset=utf-8",
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

async function runDemo() {
  console.log(process.argv);
  const api = new BrowserboardAPI(process.argv[2]);
  console.log("Creating board");
  const { board, shareURLs } = await api.createWhiteboard(process.argv[3]);

  console.log(JSON.stringify(board, null, "  "));
  console.log("Getting access keys");
  const keys = await api.getRequest(
    `/api/1.0/whiteboards/${board.wbid}/access_keys`
  );
  console.log(keys);

  if (process.argv.length > 3) {
    console.log("Copying events");
    const copyResult = await api.postRequest(
      `/api/1.0/whiteboards/${board.wbid}/copy_from_template`,
      {
        template_wbid: process.argv[4],
      }
    );
    console.log(copyResult);
  }
}

runDemo();
