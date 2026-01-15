# greentill-cms

Customer: The user will able to scan the QR code receipts using the application and can view the stored receipts onto
their device. They can earn rewards/coins by referring application, uploading receipts and by many other means. Using
the application, coupons can be viewed of various retailers and can view the total coins earned. They can also go
through the CMS pages for further information.
Admin: The admin can manage all global settings and system through the web-based panel.

## Prerequisites

For development, you will only need Node.js and a node global package, installed in your environment. No other specific requirements are there.

# Node

- #### Node installation on Windows

  Just go on https://nodejs.org/ and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git https://git-scm.com/).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the https://nodejs.org/ and the https://npmjs.org/.

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.15.2

    $ npm --version
    6.14.9

### Quick Start Guide

1. Clone the repository from: https://gitlab.openxcell.dev/k-team/backend-team/greentill/greentill-cms.git
2. `npm install` the packages in root folder

3. Navigate towards the directory of the project using command: `cd PROJECT_TITLE`

4. Run `npm install` in the directory to install all the dependencies.

5. Run `npm start` to start all packages in the root directory.

### Commonly used commands

`npm start` - Runs the server to watch for changes.
`npm install` - Installs all the dependencies listed in package.json.

### Workspace usage

-Most of the common packages of each workspace can be added in `package.json` file.

-To install a global package to be utilized in all workspaces, we can simply navigate to root directly and run `npm install <package-name> -g`

-If we want to remove a package from a workspace: `npm uninstall <package-name>`

-If we want to remove a package from a global workspace: `npm uninstall -g <package-name>`

## Built With

- https://nodejs.org/ - Nodejs is the language used for the project
- https://create-react-app.dev/ - Set up a modern web app by running one command.
- https://gitlab.openxcell.dev/k-team/backend-team/cardixa/cardixa-cms - GitLab access for this project

### Files Present

- [.gitlab-ci-yml](/.gitlab-ci.yml) - .gitlab-ci-yml is uesd for GIT CI/CD
- [package.json](/package.json) - package.json is used to define dependencies and other required packages for the project

## Deployment

The deployment of this project is done with CI/CD after the subsequent changes are merged into the respective branches.
