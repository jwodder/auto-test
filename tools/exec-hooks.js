const { SEMVER, execPromise, getCurrentBranch } = require("@auto-it/core");

module.exports = class ExecE2BIGWorkaround {
  constructor() {
    this.name = "Custom exec commands";
  }

  /**
   * Setup the plugin
   *
   * @param {import('@auto-canary/core').default} auto
   */
  apply(auto) {
    auto.hooks.beforeCommitChangelog.tapPromise(this.name, async (config) => {
      await execPromise("mkdir", ["-p", "env"]);
      await execPromise("sh", ["-c", "env | grep -vP '^(GH_TOKEN|TWINE_PASSWORD)' > env/beforeCommitChangelog.env"]);
      await execPromise("git", ["add", "env"]);
    });

    auto.hooks.afterChangelog.tapPromise(this.name, async ({bump}) => {
      await execPromise("sh", ["-c", "env | grep -vP '^(GH_TOKEN|TWINE_PASSWORD)' > env/afterChangelog.env"]);
      await execPromise("git", ["add", "env"]);
      await execPromise("git", ["commit", "-m", "afterChangelog"]);
      await execPromise("bump2version", [bump]);
    });

    auto.hooks.afterRelease.tapPromise(this.name, async (config) => {
      await execPromise("python", ["-m", "build"]);
      // Thankfully, twine expands globs!
      await execPromise("twine", ["upload", "dist/*"]);
    });
  }
};
