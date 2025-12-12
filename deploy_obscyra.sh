#!/usr/bin/env bash
set -euo pipefail

REPO="https://github.com/jmunuswajobs-lab/Obscyra_dev.git"
BRANCH="main"

echo "Deploying Obscyra to ${REPO} (branch: ${BRANCH})"

git init || true
git remote remove origin 2>/dev/null || true
git remote add origin "${REPO}"
git add .
git commit -m "Obscyra v4 — PWA bundle" || true
git branch -M ${BRANCH}
git push -u origin ${BRANCH} --force

echo "Pushed. If you want to enable Pages automatically, run:"
echo "  gh api --method POST /repos/jmunuswajobs-lab/Obscyra_dev/pages -f source.branch=main -f source.path='/'"
echo "Or enable Pages in the repository Settings → Pages → choose Branch: main / root."

