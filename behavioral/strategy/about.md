# Strategy

strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a sperate class, and make their object interchangable.

## Problem

- it appears when software is expanding and becoming more complex
- it appers when you see alot of if/else or switch/case statements, that switch between different variations of the same algorithm
- it appers when class become hude and filled with similar methods that only differ in the way they handle some class data

## Solution

- extract the varying behaior into a separte class hierarchy
- declare a common interface for all algorithms 
- context class delagates the work to a choosen strategy object instead of executing it on its own
- context exposes a setter method for strategy object, so client code can replace the currently used strategy with another one at runtime
- client is choosing the concrete strategy and passes it to the context.