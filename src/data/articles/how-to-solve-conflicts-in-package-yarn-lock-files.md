---
title: How To Solve Conflicts In Package/Yarn Lock Files
author: LamboCreeper
date: '2023-11-24'
description: One of the most frustrating things you'll come across as a developer is conflicts, what makes them even worse is when they are in programatically generated lock files.
---

One of the most frustrating things you will face as a developer is merge conflicts; however, sometimes there is no avoiding them. While merge conflicts aren't necessarily difficult to solve within your own code, they can be tricky if they occur in a pre-generated file like `package-lock.json` or `yarn.lock`. Thankfully, solving a merge conflict in one of these files is a lot simpler than it looks.

The first thing to do when you run into a merge conflict within `package-lock.json` or `yarn.lock` is to make sure you do not have any merge conflicts within your `package.json`. If you do have one, make sure to resolve it first - simply keep in the list of packages the ones you want to keep and remove any you do not.

Next, replace the contents of the `package-lock.json` or `yarn.lock` file with the contents of the file on the branch you are merging in from (for example, the `main` or `master` branch). This should mean that there are no changes if you went to merge from this point.

Finally, rerun `npm i` or `yarn` to install the missing dependencies. This will add or remove any dependencies you've changed in the `package.json` updating the `package-lock.json` or `yarn.lock` in the process. Your merge conflict will now be sorted!
