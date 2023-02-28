import fs from "fs";
import FormData from "form-data";
import axios, { AxiosError } from "axios";
import * as core from "@actions/core";

export class ReleaseClient {
  endpoint: string;
  username: string;
  password: string;

  constructor(endpoint: string, username: string, password: string) {
    this.endpoint = endpoint;
    this.username = username;
    this.password = password;
  }

  /**
   * Uploads assets to the release server.
   */
  async uploadAssets(packageName: string, version: string, assets: string[]) {
    const formData = new FormData();
    formData.append("version", version);
    formData.append("name", packageName);
    for (const asset of assets) {
      formData.append("files", fs.createReadStream(asset));
    }

    try {
      await axios.post(`${this.endpoint}/release`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        auth: {
          username: this.username,
          password: this.password,
        },
      });
      core.info("Uploaded assets to release server");
    } catch (e: any) {
      const error = e as AxiosError;
      throw new Error(`${(error.response?.data as any).detail}`);
    }
  }
}
