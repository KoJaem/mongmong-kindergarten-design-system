#!/usr/bin/env bash
#
# Packages point `exports` at `src/` and swap it for `dist/` via `publishConfig.exports`, a
# pnpm-only behaviour. The published export map is therefore never exercised by a local build,
# typecheck, or test run. Pack every package and validate the resulting tarball — the same bytes
# the registry receives. `pack` runs each `prepack` (i.e. `tsup`), so this also proves they build.
#
# attw is given the CSS subpaths to skip, since stylesheets carry no type declarations; it ignores
# the ones a package does not export. publint still proves every stylesheet is in the tarball.

set -uo pipefail

# `changeset publish` skips `private: true` packages with exit 0 — no error, no log. Changesets
# still bumps the version and CHANGELOG, and sibling packages still publish depending on it, so
# the break only surfaces later as a missing-version error for consumers. Catch it here instead.
private_pkgs=$(grep -l '"private": true' packages/*/package.json 2>/dev/null || true)
if [[ -n "$private_pkgs" ]]; then
  echo "packages/* must never be private (changeset publish silently skips them):" >&2
  echo "$private_pkgs" >&2
  exit 1
fi

dir=$(mktemp -d)
trap 'rm -rf "$dir"' EXIT

pnpm --filter './packages/*' --recursive pack --pack-destination "$dir" > /dev/null || exit 1

status=0
for tarball in "$dir"/*.tgz; do
  pnpm exec publint run "$tarball" --level warning --strict || status=1
  pnpm exec attw "$tarball" --profile node16 --exclude-entrypoints ./styles.css ./reset.css || status=1
done

exit $status
