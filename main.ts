enum ActionKind {
    Walking,
    Idle,
    Jumping,
    walk_right,
    walk_left,
    walk_up,
    walk_down
}
namespace SpriteKind {
    export const life = SpriteKind.create()
    export const power_up = SpriteKind.create()
    export const spikes = SpriteKind.create()
    export const robocop = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const projectile2 = SpriteKind.create()
    export const projectile1 = SpriteKind.create()
    export const Scenery = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.spikes, SpriteKind.Player, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.zapped.play()
    current_level = 1
    levels()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss, function (sprite, otherSprite) {
    sprite.destroy()
    music.buzzer.play()
    current_level += 2
    levels()
})
sprites.onOverlap(SpriteKind.robocop, SpriteKind.Player, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.buzzer.play()
    current_level = 0
    levels()
})
function animateHero () {
    character.loopFrames(
    hero,
    assets.animation`heroWalkRight`,
    100,
    character.rule(Predicate.MovingRight)
    )
    character.loopFrames(
    hero,
    assets.animation`heroWalkLeft`,
    100,
    character.rule(Predicate.MovingLeft)
    )
    character.loopFrames(
    hero,
    assets.animation`heroStandRight`,
    350,
    character.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    character.loopFrames(
    hero,
    assets.animation`heroStandLeft`,
    350,
    character.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
    character.loopFrames(
    hero,
    assets.animation`heroWalkDown`,
    100,
    character.rule(Predicate.MovingDown)
    )
    character.loopFrames(
    hero,
    assets.animation`heroWalkUp`,
    100,
    character.rule(Predicate.MovingUp)
    )
    character.loopFrames(
    hero,
    assets.animation`heroStandFront`,
    350,
    character.rule(Predicate.NotMoving, Predicate.FacingDown)
    )
    character.loopFrames(
    hero,
    assets.animation`heroStandBack`,
    450,
    character.rule(Predicate.NotMoving, Predicate.FacingUp)
    )
}
function animateScene3Hero () {
    character.loopFrames(
    SCENE3HERO,
    assets.animation`heroWalkRight`,
    100,
    character.rule(Predicate.Moving)
    )
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    story.clearAllText()
})
function animateScene4Boss () {
    character.loopFrames(
    SCENE4ROBOBOSS,
    assets.animation`Scene4BossStand`,
    200,
    character.rule(Predicate.NotMoving)
    )
}
function start_game () {
    SCENE1LOGO = sprites.create(assets.image`Logo`, SpriteKind.Scenery)
    effects.blizzard.startScreenEffect()
    SCENE1LOGO.setPosition(14, 45)
    story.spriteMoveToLocation(SCENE1LOGO, 83, 45, 150)
    music.setVolume(15)
    effects.blizzard.endScreenEffect()
    pause(1000)
    tiles.destroySpritesOfKind(SpriteKind.Scenery)
    SCENE2BED = sprites.create(assets.image`bed`, SpriteKind.Scenery)
    SCENE2BED.setPosition(90, 55)
    SCENE2HERO = sprites.create(assets.image`hero`, SpriteKind.Scenery)
    SCENE2HERO.setPosition(19, 45)
    animateScene2Hero()
    story.printDialog("Hmmm...", 100, 40, 50, 100, 4, 8)
    story.printDialog("Looks like the guard forgot to close the door ...", 100, 40, 50, 100, 4, 8)
    story.printDialog("This is my chance...!", 100, 40, 50, 100, 4, 8)
    SCENE2HERO.destroy()
    SCENE3HERO = sprites.create(assets.image`hero_right_1`, SpriteKind.Scenery)
    animateScene3Hero()
    SCENE3HERO.setPosition(19, 45)
    story.spriteMoveToLocation(SCENE3HERO, 145, 45, 80)
    story.spriteMoveToLocation(SCENE2BED, 71, 55, 40)
    tiles.destroySpritesOfKind(SpriteKind.Scenery)
    levels()
    current_level = 0
}
function animateBoss () {
    character.loopFrames(
    RoboBoss,
    assets.animation`theBossStand`,
    200,
    character.rule(Predicate.NotMoving)
    )
}
controller.combos.attachCombo("lB", function () {
    heroProjectile = sprites.createProjectileFromSprite(assets.image`normal projectile`, hero, -150, 0)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.projectile1, SpriteKind.boss, function (sprite, otherSprite) {
    music.zapped.play()
    otherSprite.destroy()
    otherSprite.startEffect(effects.disintegrate)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`pillarTop`, function (sprite, location) {
    tiles.destroySpritesOfKind(SpriteKind.Player)
    nextLevelSound()
    current_level += 1
    levels()
})
controller.combos.attachCombo("uB", function () {
    heroProjectile = sprites.createProjectileFromSprite(assets.image`normal projectile`, hero, 0, -150)
    music.pewPew.play()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`gate top`, function (sprite, location) {
    tiles.destroySpritesOfKind(SpriteKind.Player)
    nextLevelSound()
    if (info.score() == 10) {
        current_level += 2
        levels()
    } else {
        current_level += 1
        levels()
    }
})
sprites.onOverlap(SpriteKind.projectile1, SpriteKind.projectile2, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.zapped.play()
})
controller.combos.attachCombo("dB", function () {
    heroProjectile = sprites.createProjectileFromSprite(assets.image`normal projectile`, hero, 0, 150)
    music.pewPew.play()
})
function gameOver () {
    SCENE4HERO = sprites.create(assets.image`hero`, SpriteKind.Scenery)
    tiles.placeOnTile(SCENE4HERO, tiles.getTileLocation(3, 6))
    animateScene4Hero()
    SCENE4ROBOBOSS = sprites.create(assets.image`SCENE4BOSS`, SpriteKind.Scenery)
    tiles.placeOnTile(SCENE4ROBOBOSS, tiles.getTileLocation(7, 6))
    animateScene4Boss()
    SCENE4ROBOCOP1 = sprites.create(assets.image`robocop`, SpriteKind.Scenery)
    tiles.placeOnTile(SCENE4ROBOCOP1, tiles.getTileLocation(8, 6))
    story.spriteMoveToLocation(SCENE4ROBOCOP1, 73, 110, 30)
    SCENE4ROBOCOP2 = sprites.create(assets.image`Scene4Robocop2`, SpriteKind.Scenery)
    tiles.placeOnTile(SCENE4ROBOCOP2, tiles.getTileLocation(0, 6))
    story.spriteMoveToLocation(SCENE4ROBOCOP2, 41, 110, 20)
    story.spriteSayText(SCENE4HERO, ":(", 4, 8)
    pause(500)
    game.over(false)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`winFlag`, function (sprite, location) {
    nextLevelSound()
    current_level += 4
    levels()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.robocop, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy()
    music.zapped.play()
    otherSprite.startEffect(effects.fire)
    info.changeScoreBy(1)
})
function animateScene4Hero () {
    character.loopFrames(
    SCENE4HERO,
    assets.animation`heroStandFront`,
    350,
    character.rule(Predicate.NotMoving)
    )
}
controller.combos.attachCombo("rB", function () {
    heroProjectile = sprites.createProjectileFromSprite(assets.image`normal projectile`, hero, 150, 0)
    music.pewPew.play()
})
function nextLevelSound () {
    music.setVolume(30)
    music.playTone(466, music.beat(BeatFraction.Quarter))
    music.playTone(622, music.beat(BeatFraction.Quarter))
    music.playTone(587, music.beat(BeatFraction.Quarter))
    music.playTone(523, music.beat(BeatFraction.Quarter))
    music.playTone(466, music.beat(BeatFraction.Quarter))
}
function animateScene2Hero () {
    character.loopFrames(
    SCENE2HERO,
    assets.animation`heroStandFront`,
    350,
    character.rule(Predicate.NotMoving)
    )
}
function levels () {
    if (current_level == 0) {
        music.stopAllSounds()
        heroics()
        scene.setBackgroundColor(15)
        tiles.setTilemap(tilemap`level 1 tilemap`)
        info.setScore(0)
    } else if (current_level == 1) {
        music.stopAllSounds()
        heroics()
        scene.setBackgroundImage(assets.image`background level 2`)
        tiles.setTilemap(tilemap`level 2 tilemap`)
    } else if (current_level == 2) {
        music.stopAllSounds()
        heroics()
        scene.setBackgroundImage(assets.image`background level 3`)
        tiles.setTilemap(tilemap`level 3 tilemap`)
        RoboBoss = sprites.create(assets.image`theBoss`, SpriteKind.boss)
        animateBoss()
    } else if (current_level == 3) {
        heroics()
        scene.setBackgroundImage(assets.image`Cutscene background end`)
        tiles.setTilemap(tilemap`goodEnd`)
        hero.startEffect(effects.hearts)
    } else if (current_level == 4) {
        scene.setBackgroundImage(assets.image`background level 3`)
        tiles.loadMap(tiles.createMap(tilemap`badEnd`))
        gameOver()
    } else if (current_level == 5) {
        scene.setBackgroundImage(assets.image`background level 2`)
        tiles.loadMap(tiles.createMap(tilemap`badEndCity`))
        gameOver()
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(RoboBoss, assets.tile`boss_summon`)
    for (let value of tiles.getTilesByType(assets.tile`boss_summon`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    tiles.placeOnRandomTile(hero, assets.tile`start or summon`)
    for (let value of tiles.getTilesByType(assets.tile`start or summon`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of sprites.allOfKind(SpriteKind.spikes)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.robocop)) {
        value.destroy()
    }
    for (let value of tiles.getTilesByType(assets.tile`spike`)) {
        spike = sprites.create(assets.image`spiky`, SpriteKind.spikes)
        tiles.placeOnTile(spike, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`danger`)) {
        RoboCops = sprites.create(assets.image`robocop`, SpriteKind.robocop)
        tiles.placeOnTile(RoboCops, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        RoboCops.follow(hero, 35)
    }
}
sprites.onOverlap(SpriteKind.projectile2, SpriteKind.Player, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.buzzer.play()
    current_level += 2
    levels()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`pillarBottom`, function (sprite, location) {
    tiles.destroySpritesOfKind(SpriteKind.Player)
    nextLevelSound()
    current_level += 1
    levels()
})
function heroics () {
    hero = sprites.create(assets.image`hero`, SpriteKind.Player)
    hero.setStayInScreen(true)
    scene.cameraFollowSprite(hero)
    animateHero()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`gate bottom`, function (sprite, location) {
    tiles.destroySpritesOfKind(SpriteKind.Player)
    nextLevelSound()
    if (info.score() == 10) {
        current_level += 2
        levels()
    } else {
        current_level += 1
        levels()
    }
})
let enemyProjectile: Sprite = null
let list: Sprite[] = []
let RoboCops: Sprite = null
let spike: Sprite = null
let SCENE4ROBOCOP2: Sprite = null
let SCENE4ROBOCOP1: Sprite = null
let SCENE4HERO: Sprite = null
let heroProjectile: Sprite = null
let RoboBoss: Sprite = null
let SCENE2HERO: Sprite = null
let SCENE2BED: Sprite = null
let SCENE1LOGO: Sprite = null
let SCENE4ROBOBOSS: Sprite = null
let SCENE3HERO: Sprite = null
let hero: Sprite = null
let current_level = 0
start_game()
game.onUpdate(function () {
    if (hero.tileKindAt(TileDirection.Center, assets.tile`ladder`)) {
        controller.moveSprite(hero, 80, 80)
        if (character.matchesRule(hero, character.rule(Predicate.Moving))) {
            timer.throttle("animate_going_up_ladder", 400, function () {
                character.setCharacterAnimationsEnabled(hero, false)
                animation.runImageAnimation(
                hero,
                assets.animation`heroClimbUp`,
                100,
                false
                )
                timer.after(400, function () {
                    character.setCharacterAnimationsEnabled(hero, true)
                })
            })
        }
    } else if (current_level == 0) {
        controller.moveSprite(hero, 100, 100)
    } else {
        controller.moveSprite(hero, 100, 0)
        hero.ay = 350
    }
    if (current_level == 1) {
        if (hero.bottom > 310) {
            music.bigCrash.play()
            pause(500)
            hero.destroy()
            current_level = 1
            levels()
        }
    }
    if (current_level == 1 && controller.A.isPressed()) {
        if (hero.vy == 0) {
            hero.vy = -120
        }
    }
    if (current_level > 1 && controller.A.isPressed()) {
        if (hero.vy == 0) {
            hero.vy = -150
        }
    }
    if (controller.right.isPressed() && (hero.vy != 0 && hero.ay != 0)) {
        hero.setImage(assets.image`hero_jumping_right`)
    }
    if (controller.left.isPressed() && (hero.vy != 0 && hero.ay != 0)) {
        hero.setImage(assets.image`hero_jumping_left`)
    }
    if (current_level == 2) {
        heroProjectile.setKind(SpriteKind.projectile1)
    }
})
game.onUpdateInterval(2500, function () {
    if (current_level == 2) {
        list = sprites.allOfKind(SpriteKind.boss)
        for (let value of list) {
            enemyProjectile = sprites.createProjectileFromSprite(assets.image`rocket2`, RoboBoss, -50, 0)
            music.pewPew.play()
            enemyProjectile.startEffect(effects.fire)
        }
        enemyProjectile.setKind(SpriteKind.projectile2)
    }
})
forever(function () {
    if (current_level == 0) {
        music.playMelody("C5 B G B G B G B ", 300)
    } else if (current_level == 1) {
        music.playTone(466, music.beat(BeatFraction.Whole))
        music.playTone(784, music.beat(BeatFraction.Whole))
        music.playTone(698, music.beat(BeatFraction.Whole))
        music.playTone(698, music.beat(BeatFraction.Whole))
        music.playTone(784, music.beat(BeatFraction.Half))
        music.playTone(880, music.beat(BeatFraction.Half))
        music.playTone(932, music.beat(BeatFraction.Whole))
        music.playTone(698, music.beat(BeatFraction.Whole))
        music.playTone(784, music.beat(BeatFraction.Half))
        music.playTone(880, music.beat(BeatFraction.Half))
        music.playTone(932, music.beat(BeatFraction.Half))
        music.playTone(880, music.beat(BeatFraction.Half))
        music.playTone(784, music.beat(BeatFraction.Half))
        music.playTone(698, music.beat(BeatFraction.Half))
        music.playTone(784, music.beat(BeatFraction.Whole))
        music.playTone(698, music.beat(BeatFraction.Half))
        music.playTone(622, music.beat(BeatFraction.Half))
        music.playTone(587, music.beat(BeatFraction.Whole))
    } else if (current_level == 2) {
        music.playTone(262, music.beat(BeatFraction.Eighth))
        music.playTone(523, music.beat(BeatFraction.Quarter))
        music.playTone(392, music.beat(BeatFraction.Eighth))
        music.playTone(784, music.beat(BeatFraction.Quarter))
        music.playTone(330, music.beat(BeatFraction.Quarter))
        music.playTone(659, music.beat(BeatFraction.Quarter))
        music.playTone(392, music.beat(BeatFraction.Eighth))
        music.playTone(784, music.beat(BeatFraction.Quarter))
    } else if (current_level == 3) {
        music.playTone(415, music.beat(BeatFraction.Half))
        music.playTone(494, music.beat(BeatFraction.Half))
        music.playTone(554, music.beat(BeatFraction.Half))
        music.playTone(622, music.beat(BeatFraction.Half))
        music.playTone(554, music.beat(BeatFraction.Double))
        music.playTone(740, music.beat(BeatFraction.Half))
        music.playTone(831, music.beat(BeatFraction.Half))
        music.playTone(740, music.beat(BeatFraction.Half))
        music.playTone(554, music.beat(BeatFraction.Half))
        music.playTone(622, music.beat(BeatFraction.Half))
        music.playTone(622, music.beat(BeatFraction.Half))
        music.playTone(622, music.beat(BeatFraction.Whole))
    } else if (current_level == 4) {
        music.setVolume(40)
        music.playMelody("C - - - C - - - ", 500)
    }
})
