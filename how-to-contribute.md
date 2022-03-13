# How to contribute

**Remember to sync with remote repository every time before and after devlopment!**

**Make your design decisions with great care, follow KISS principles, and _if it ain't broke, don't fix it_.**

**Opening an issue to discuss ideas comprehensively would be great.**

## Basic workflow

### Preparation

1. Clone
2. Install Hugo.
3. `npm install`
4. `npm update`

### Development

1. `npm run watch`
2. `hugo server` in directory `/exampleSite/`
3. Make changes
4. Preview changes in browser
5. Terminate

### Build

1. `npm run prod`

### Update theme in Weekly

In Weekly project, do -

1. `git submodule update --remote --merge`
2. `git commit -am "update submodule`
3. `git push`

## Tricks

1. Use Chrome.
2. DevTool to inspect, narrow down stylesheet, mobile device emulation, lighthouse test, and so more.
3. Peek around the whole project before putting your hands on it.
4. Use 'Find in Project' wisely.
5. Use the latest Hugo to avoid problems.
6. Install necessary extensions.
