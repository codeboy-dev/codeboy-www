#!/usr/bin/env bash
set -euo pipefail

readonly ROOT_DIR=$(readlink -e "$(dirname $0)/../..")
readonly DIVIDER="────────────────────────────────────────────────────────────────────────"

main() {
  show_versions
  do_npm_install
  do_hugo_build
}

# ---------------- Versions ----------------
show_versions() {
  echo -e "\n${DIVIDER}\nINFO: Versions"
  echo node version: $(node --version)
  echo npm version: $(npm --version)
  echo python3 version: $(python3 --version)
  # hugo version
}

# ---------------- Pre-Build ----------------
do_npm_install() {
  echo -e "\n${DIVIDER}\nTASK: Hugo: npm install"
  cd "${ROOT_DIR}/hugo"
  npm install
}

# ---------------- Build ----------------
do_hugo_build() {
  echo -e "\n${DIVIDER}\nTASK: Hugo: Build"
  cd "${ROOT_DIR}/hugo"
  npm run hugo:build
}

main

#=======================================================================
# Notes:
#  - Using deploy script instead of &&-chain of commands because
#    Netlify would not always do npm install so deploys would fail.
#    Could not fix so with this script npm install is done always.
#  - Using bash, not python, because Netlify doesn't print stdout
#    in the desired order. Stdout of all subprocess is printed first;
#    then the python scripts stdout after. Could not fix so using bash.
