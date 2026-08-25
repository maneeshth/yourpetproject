# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Use GitHub's private reporting instead:
**Security → Report a vulnerability** on this repository
(https://github.com/maneeshth/yourpetproject/security/advisories/new).

You'll get an acknowledgement within a few days. Once a fix is released the
advisory will be published with credit to the reporter (unless you prefer to
stay anonymous).

## Scope

Desktop Pet is a fully local application:

- It makes **no network requests** and has no update mechanism.
- It reads only the global cursor position; it does not read keystrokes,
  screen contents, or files.
- The renderer runs with `contextIsolation: true` and `nodeIntegration: false`
  and loads only the bundled `pet.html`.

Reports about the shipped app, the build/release workflow, or the checksums
process are all in scope.

## Supported versions

Only the latest release receives fixes.
