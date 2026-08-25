cask "desktop-pet" do
  version "0.1.0"
  sha256 "5db8ec00697c2d8de5d8264515d7fe85887af71a27e5029d9a5f044d54f3b47a"

  url "https://github.com/maneeshth/yourpetproject/releases/download/v#{version}/Desktop.Pet-#{version}-arm64.dmg"
  name "Desktop Pet"
  desc "Tiny desktop pet that chases your cursor in a click-through overlay"
  homepage "https://github.com/maneeshth/yourpetproject"

  livecheck do
    url :url
    strategy :github_latest
  end

  # v0.1.0 ships an Apple Silicon build only; an Intel build is added from the next release.
  depends_on arch: :arm64

  app "Desktop Pet.app"

  # The app is unsigned: on first launch, right-click the app -> Open (see the project README).
  caveats do
    unsigned_accessibility
  end

  zap trash: [
    "~/Library/Application Support/desktop-pet",
    "~/Library/Logs/desktop-pet",
    "~/Library/Preferences/io.github.desktoppet.plist",
    "~/Library/Saved Application State/io.github.desktoppet.savedState",
  ]
end
