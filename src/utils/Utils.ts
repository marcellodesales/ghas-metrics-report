
export function secondsToReadable(seconds: number): string {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

export function createUrlLink(url: string | null, text: string): string {
  return `<a target=_blank href="${url}">${text}</a>`;
}

export function formatScanError(feature, org, repo, error: string ):string {
  const serverUrl = process.env.GITHUB_API_URL.replace("/api", "").replace("/v3", "")
  let githubObject = `${serverUrl}/${org}`
  if (repo && repo.length > 0) {
    githubObject = `${githubObject}/${repo}`
  }
  return `There was an error fetching '${feature}' from '${githubObject}'. This feature might be disabled at ${githubObject}/security: ${error}`;
}