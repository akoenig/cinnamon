          _                                         
      ___(_)_ __  _ __   __ _ _ __ ___   ___  _ __  
     / __| | '_ \| '_ \ / _` | '_ ` _ \ / _ \| '_ \ 
    | (__| | | | | | | | (_| | | | | | | (_) | | | |
     \___|_|_| |_|_| |_|\__,_|_| |_| |_|\___/|_| |_|

A continuous integration server for Node.js applications, that sits on top of [cicada](https://github.com/substack/cicada).

[image]

## Quickstart

### 1 Installation

    $ [sudo] npm install -g cinnamon
    $ cinnamon server

### 2 Configure your project

    $ cd /into/your/project
    $ $EDITOR package.json

    // Define your test script and pipe the output into the cinnamon loggile.
    ...
    "scripts": {
      "test": "npm install && grunt test > cinnamon.log"
    },
    ...

### 3 Triggering the CI process

That's it! I promise. Now you can use the _cinnamon push_ application in order to trigger the CI process.

**Important:** The _push_ application will also push your changes into your defined remote git repository. With other words: You can use

    $ cinnamon push <remote> <branch>

as a substitution of your well-known git workflow. _cinnamon_ will do both for you: Pushing into your remote git repository and pushing the changes into the _cinnamon_ CI server.

## Configuration

_cinnamon_ will save every build into the following directory:

    /home/<user>/.cinnamon



## Changelog

### Version 0.2.0 - beta 1 (Future)

- [ ] Source documentation.

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