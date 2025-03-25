import * as core from "@actions/core";
import { DependancyAlert } from "../types/common/main";
import { MyOctokit } from "./MyOctokit";
import {formatScanError} from "../utils/Utils";

export const DependabotAlerts = async (
  owner: string,
  repository: string,
): Promise<DependancyAlert[]> => {
  let res: Array<DependancyAlert> = [];
  try {
    const octokit = new MyOctokit();
    const iterator = await octokit.paginate(
      "GET /repos/{owner}/{repo}/dependabot/alerts",
      {
        owner: owner,
        repo: repository,
        per_page: 100,
      },
      (response) => {
        return response.data;
      },
    );
    res = iterator as DependancyAlert[];
  } catch (error) {
    const errorMessge = formatScanError("dependabot", owner, repository, error)
    core.setFailed(errorMessge);
  }
  return res;
};
