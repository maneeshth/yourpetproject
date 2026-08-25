# Packaging

Package-manager manifests for Desktop Pet. These are kept here as the source
of truth; the public registries are updated from them on each release.

- `winget/` — manifests for the [winget community repo](https://github.com/microsoft/winget-pkgs)
  (`winget install maneeshth.DesktopPet`). Validate with
  `winget validate --manifest winget/manifests/m/maneeshth/DesktopPet/<version>`.
- `homebrew/` — contents of the `maneeshth/homebrew-tap` tap
  (`brew tap maneeshth/tap && brew install --cask desktop-pet`).

On a new release: bump `version`, update the installer URL/sha256 (from the
release's `SHA256SUMS`) and, for winget, the `ProductCode` if `appId` changed.
