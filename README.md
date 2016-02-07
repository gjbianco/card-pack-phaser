# card-pack-phaser

> Bootstrap files for making card games in [Phaser](http://phaser.io).

## Requirements

You can either just take the game source (`www/game.js`) or use the built in server to host the file. If you just want the game source, you can skip the installation steps and you will not need anything else.

 - npm
 - grunt
 - bower

## Running the Server

Install necessary dependencies for running server using NPM (runs Bower):
```shell
npm install
```

Copy Bower files to necessary location via Grunt:
```shell
grunt
```

Start the server with:
```shell
npm start
```

Now just go to the root of port 8080 on your machine ([http://localhost:8080](http://localhost:8080/))

## Controls

Drag the cards around the screen. To flip a card, start dragging it and press the `f` key.

Works on mobile, but there is currently no way to flip a card unless you have a keyboard (untested).
