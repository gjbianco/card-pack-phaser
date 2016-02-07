var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload, create: create, update: update
});

var deck,
    selectedCard,
    cardImgPrefix = 'card',
    suits = [ 'Spades', 'Hearts', 'Diamonds', 'Clubs' ],
    values = [ 'Q', 'K', 'J', 'A', '10', '9', '8', '7', '6', '5', '4', '3', '2' ];

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#093';

  game.load.image('cardBackBlue', 'res/img/cardBack_blue2.png');
  for(var val = 0; val < values.length; val++) {
    for(var suit = 0; suit < suits.length; suit++) {
      var imgName = cardImgPrefix + suits[suit] + values[val];
      game.load.image(imgName, 'res/img/Cards/' + imgName + '.png');
    }
  }
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  initDeck();

  // prevent normal right click behavior (i.e. context menu)
  game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

  // release selected card
  game.input.onUp.add(function() {
    selectedCard = undefined;
  });

  // flip cards
  this.game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(function() {
    if(!selectedCard) { return; }
    selectedCard.faceUp = !selectedCard.faceUp;
    if(selectedCard.faceUp) {
      selectedCard.loadTexture(selectedCard.imgName);
    } else {
      selectedCard.loadTexture('cardBackBlue');
    }
  });
}

function update() {
  if(selectedCard) {
    selectedCard.x = game.input.x;
    selectedCard.y = game.input.y;
  }
}

function initDeck() {
  var cardX = 0,
      cardY = 0;
  deck = game.add.group();
  for(var val = 0; val < values.length; val++) {
    for(var suit = 0; suit < suits.length; suit++) {
      deck.add(createCard(suit, val, cardX, cardY));
      cardX += 20;
    }
  }
}

function createCard(suitIndex, valueIndex, cardX, cardY) {
  var imgName = cardImgPrefix + suits[suitIndex] + values[valueIndex],
      newCard = game.add.sprite(cardX, cardY, imgName),
      num = valueIndex*(suitIndex+1);

  // card attributes
  newCard.faceUp = true;
  newCard.imgName = imgName;

  // card physical properties
  newCard.scale.setTo(0.5);
  newCard.anchor.set(0.5);
  game.physics.enable(newCard, Phaser.Physics.ARCADE);
  newCard.body.immovable = true;
  newCard.body.collideWorldBounds = true;

  // handle card inputs
  newCard.inputEnabled = true;
  newCard.events.onInputDown.add(function() {
    deck.bringToTop(newCard);
    selectedCard = newCard;
  }, this);

  return newCard;
}
