# UT BootCamp RPG

### Week 3 Game

### Objectives
* Create a fun and interactive game in the browser.
* Dynamically update the HTML with jQuery.
* Style various HTML elements with CSS.

##### Game design notes:
###### Each character in the game has 3 attributes: `Health Points`, `Attack Power`, and `Counter Attack Power`.
###### Each time the player attacks, their character's Attack Power increases by its base Attack Power. So if the base Attack Power is 6, each attack will increase the Attack Power by 6. (12, 18, 24, 30 etc...)
###### The enemy character only has `Counter Attack Power` and their `Counter Attack Power` never changes.
###### The `Health Points`, `Attack Power`, and `Counter Attack Power` of each character will be different.
###### None of the characters in the game can heal or recover Health Points, so the point of the game is to pick a character and fight an enemy that has low `Counter Attack Power` first and build up your own `Attack Power` before you lose all your `Health Points`.
###### Depending on game play, you can win or lose with any of the characters in the game.
