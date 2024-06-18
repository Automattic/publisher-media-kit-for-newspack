# Contributing to Newspack ✨

Hi! Thank you for your interest in contributing to Newspack!

These guidelines explain how the contribution process works. Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, we will reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

There are many ways to contribute – reporting bugs, fixing or triaging bugs, feature suggestions, submitting pull requests for enhancements, improving the documentation. Your help making Newspack awesome will be greatly appreciated.

**Please don't use the issue tracker for support questions or general inquiries. We are not currently looking for plugins or services to recommend within Newspack.**

## Installation

The following commands are required to start contribution. This command will install required dependencies.

```sh
composer install
npm install
```

### NPM commands

* `npm run start` (install dependencies)
* `npm run watch` (start watch on files)
* `npm run build` (build all files)
* `npm run format-js` (format JS using eslint)
* `npm run lint-js` (lint JS)
* `npm run lint-style` (lint CSS)
* `npm run test` (run phpunit)
* `npm run clean-dist` (remove the `dist` folder)

### Composer commands

* `composer run lint` (run PHP code sniffer)
* `composer run lint-fix` (auto correct fixable PHP coding standards errors)

## Pull requests

To submit a patch to the plugin, simply create a pull request to the `trunk` branch of the repository. Please test and provide an explanation for your changes. When opening a pull request, please follow these guidelines:

- **Ensure you stick to the [WordPress Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/php/) and the [VIP Go Coding Standards](https://vip.wordpress.com/documentation/vip-go/code-review-blockers-warnings-notices/)**
- Install our pre-commit hook using composer. It'll help with the coding standards by automatically checking code when you commit.
- Ensure you use LF line endings in your code editor. Use [EditorConfig](http://editorconfig.org/) if your editor supports it so that indentation, line endings and other settings are auto configured.
- When committing, reference your issue number (#1234) and include a note about the fix.
- Please **don't** modify the changelog or update the .pot files. These will be maintained by the Newspack team.

## Workflow

The `develop` branch is the development branch which means it contains the next version to be released.  `trunk` contains the latest released version as reflected in the WordPress.org plugin repository.  Always work on the `develop` branch and open up PRs against `develop`.

### Code review process

Code reviews are an important part of the Newspack workflow. They help to keep code quality consistent, and they help every person working on Newspack learn and improve over time. We want to make you the best Newspack contributor you can be.

Every PR should be reviewed and approved by someone other than the author, even if the author has write access. Fresh eyes can find problems that can hide in the open if you’ve been working on the code for a while.

_Everyone_ is encouraged to review PRs and add feedback and ask questions, even people who are new to Newspack. Also, don’t just review PRs about what you’re working on. Reading other people’s code is a great way to learn new techniques, and seeing code outside of your own feature helps you to see patterns across the project. It’s also helpful to see the feedback other contributors are getting on their PRs.
