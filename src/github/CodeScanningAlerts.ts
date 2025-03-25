import * as core from "@actions/core";
import { CodeScanningAlert } from "../types/common/main";
import { MyOctokit } from "./MyOctokit";
import { formatScanError } from "../utils/Utils"

export const CodeScanningAlerts = async (
  owner: string,
  repository: string,
): Promise<CodeScanningAlert[]> => {
  let res: Array<CodeScanningAlert> = [];
  try {
    const octokit = new MyOctokit();
    const iterator = await octokit.paginate(
      "GET /repos/{owner}/{repo}/code-scanning/alerts",
      {
        owner: owner,
        repo: repository,
        per_page: 100,
      },
      (response) => {
        return response.data;
      },
    );
    res = iterator as CodeScanningAlert[];

  } catch (error) {
    const errorMessge = formatScanError("code-scanning", owner, repository, error)
    core.warning(errorMessge);
  }
  return res;
};
