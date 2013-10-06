# cinnamon

![The cinnamon UI](https://raw.github.com/akoenig/cinnamon/master/cinnamon-ui.png)

A continuous integration server for Node.js applications.

## Quickstart

### Step 1 - Installation

    $ [sudo] npm install -g cinnamon
    $ cinnamon server

### Step 2 - Configure your project

    $ cd /into/your/project
    $ $EDITOR package.json

    // Define your test script and pipe the output into the cinnamon logfile.
    ...
    "scripts": {
      "test": "npm install && grunt test > cinnamon.log"
    },
    ...

### Step 3 - Trigger the CI process

That's it! I promise. Now you can use the _cinnamon push_ application in order to trigger the CI process.

**Important:** The _push_ application will also push your changes into your defined remote git repository. With other words: You can use

    $ cinnamon push <remote> <branch>

as a substitution of your well-known git workflow. _cinnamon_ will do both for you: Pushing into your remote git repository and pushing the changes into the _cinnamon_ CI server.

### Step 4 - The Frontend

Open your Browser and visit:

    http://localhost:7777

## Configuration

_cinnamon_ will save every build into the following directory:

    /home/<user>/.cinnamon

If you won't use _cinnamon_ on your local machine you can also install the module on a remote machine, start the server and trigger the CI process from your local computer. To do so, you have to configure the "endpoint" attribute in your local configuration file.

    $ $EDITOR ~/.cinnamonrc

## Changelog

### Version 0.3.0 (Future)

- [ ] WebSocket-Support

### Version 0.2.0 - beta 2 (Future)

- [ ] Backend / Frontend: Source documentation.
- [ ] Frontend: Loading indicator for the "Clear all builds" functionality.
- [ ] Frontend: Refresh overview when there were no builds before and a build has been started recently.

### Version 0.2.0 - beta 1 (20131005)

- Frontend: Implemented long polling for the build overview.

### Version 0.2.0 - beta 0 (20131005)

- Moved configuration file to ~/.cinnamonrc
- Moved data directory to ~/.cinnamon
- Implemented client and server CLI.
- Implemented 'push application' that wraps the git commands for pushing to main repo and the cinnamon CI server.

### Version 0.1.1 (20131005)

- Fixed startup via shell script.

### Version 0.1.0 (20131005)

- Implemented REST-API for the AngularJS frontend.
- Implemented data aggregation, service and DAO layer.
- Implemented CI server events.

## Author

2013, [André König](http://iam.andrekoenig.info) - akoenig@posteo.de

## Thank you @substack ...

... for your incredible [cicada](https://github.com/substack/cicada) module.
