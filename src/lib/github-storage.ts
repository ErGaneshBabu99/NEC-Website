// Stores uploaded files (CVs, photos) directly in a GitHub repo via the
// Contents API, served back through raw.githubusercontent.com. No billing
// card required — just a personal access token on a free GitHub account.
// Same general pattern used for ERG's district-rate PDF storage.
//
// Note: the Contents API's single-request create endpoint tops out around
// 1MB per file, so uploads are capped below that in the route handler.

const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_BRANCH ?? "main";
const TOKEN = process.env.GITHUB_TOKEN!;

export async function uploadToGithub(path: string, bytes: Buffer, message: string) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: bytes.toString("base64"),
        branch: BRANCH,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub upload failed: ${res.status} ${err}`);
  }

  return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;
}
