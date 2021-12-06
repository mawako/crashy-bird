input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
    music.playTone(392, music.beat(BeatFraction.Whole))
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
    music.playTone(330, music.beat(BeatFraction.Whole))
})
let emptyObstacleY = 0
let ticks = 0
let bird: game.LedSprite = null
music.playMelody("C D E F G A B C5 ", 303)
basic.showLeds(`
    . . . . #
    . . . . #
    # . . . #
    . . . . #
    . . . . #
    `)
let index = 0
let obstacles: game.LedSprite[] = []
bird = game.createSprite(0, 2)
bird.set(LedSpriteProperty.Blink, 300)
basic.forever(function () {
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles.removeAt(0).delete()
    }
    for (let obstacle2 of obstacles) {
        obstacle2.change(LedSpriteProperty.X, -1)
    }
    if (ticks % 3 == 0) {
        emptyObstacleY = randint(0, 4)
        for (let index2 = 0; index2 <= 4; index2++) {
            if (index2 != emptyObstacleY) {
                obstacles.push(game.createSprite(4, index2))
            }
        }
    }
    for (let obstacle3 of obstacles) {
        if (obstacle3.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle3.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
            game.gameOver()
            music.playMelody("C5 A B G A F G E ", 120)
        }
    }
    ticks += 1
    basic.pause(1000)
})
