# Frogger Clone Arcade Game Project

## Table of Contents

* [Overview](#overview)
* [How to Play](#how-to-play)
* [Collisions](#collisions)
* [Acknowledgements](#acknowledgements)
* [Project Instructions](#project-instructions)

## Overview
This 'Frogger' Clone Arcade Game is a project associated with Udacity's Front-End Web Development Nanodegree.

The starter project presupplied 2 JavaScript files:
- engine.js
- resources.js

## How to Play
* Use the arrow keys on your keyboard to move the player 'up', 'down', 'left', or 'right'.
* The goal is to reach the blue section of the game board without 'colliding' with the Enemy (bugs).
* Each time the blue section is reached the player starts a new level with an additional Enemy.
* The player has 3 lives to reach as many levels as possible.
* When a collision happens the player loses a life and starts the most recent level over again.
* When all 3 lives are lost the player can choose to quit or start the game over again.

## Collisions
To detect collisions for this game I used the Axis-Aligned Bounding Box technique as present by Mozilla MDN Web Docs:

```
    var rect1 = {x: 5, y: 5, width: 50, height: 50}
    var rect2 = {x: 20, y: 10, width: 10, height: 10}

    if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {
        // collision detected!
    }


```
## Acknowledgements

* Udacity Support Team - for timely advice when I find myself stuck.
* W3Schools Modal Tutorial
* Mozilla MDN Web Docs


## Project Instructions
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).
