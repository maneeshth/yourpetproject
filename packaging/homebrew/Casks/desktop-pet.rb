cask "desktop-pet" do
  arch arm: "arm64", intel: "x64"

  version "0.1.1"
  sha256 arm:   "949862557c0753d743a6f2344f6a68f17fbed54baa85c67089366b57cf11737b",
         intel: "d9cc42ff70d00894c305228feb6f3754b4556623a62485dae9cfdacd47a44300"

  url "https://github.com/maneeshth/yourpetproject/releases/download/v#{version}/DesktopPet-#{version}-mac-#{arch}.dmg"
  name "Desktop Pet"
  desc "Tiny desktop pet that chases your cursor in a click-through overlay"
  homepage "https://github.com/maneeshth/yourpetproject"

  livecheck do
    url :url
    strategy :github_latest
  end

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
