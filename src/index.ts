import * as core from "@actions/core";
import { ReleaseClient } from "./client";

export async function application() {
  const version = core.getInput("version");
  const endpoint = core.getInput("endpoint");
  const packageName = core.getInput("package-name");
  const assetsString = core.getInput("assets");
  const username = core.getInput("username");
  const password = core.getInput("password");

  const assets: string[] = assetsString.split(",");

  const client = new ReleaseClient(endpoint, username, password);
  await client.uploadAssets(packageName, version, assets);
}
