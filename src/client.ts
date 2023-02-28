import fs from "fs";
import FormData from "form-data";
import axios from "axios";

export class ReleaseClient {
  endpoint: string;
  username: string;
  password: string;

  constructor(endpoint: string, username: string, password: string) {
    this.endpoint = endpoint;
    this.username = username;
    this.password = password;
  }

  async uploadAssets(packageName: string, version: string, assets: string[]) {
    const formData = new FormData();
    formData.append("version", version);
    formData.append("name", packageName);
    for (const asset of assets) {
      formData.append("files", fs.createReadStream(asset));
    }

    await axios.post(`${this.endpoint}/release`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      auth: {
        username: this.username,
        password: this.password,
      },
    });
  }
}
