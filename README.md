# IDE-Haskell Hoogle

***This package is in alpha***

***You need existing local hoogle database for this to work, in addition to hoogle executable***

Show hoogle information for symbol under cursor

![image](https://cloud.githubusercontent.com/assets/7275622/19577453/1bf50acc-9720-11e6-8c02-55cbe812965c.png)

TODO:

* [x] Show documentation for symbol
* [x] Show web documentation
* [ ] Auto-guess module for symbol
* [ ] Typed searches

## Setup

1. Install `hoogle` via cabal, stack or any package manager.

Cabal:

```
cabal install hoogle
```

Stack:

```
stack install hoogle
```

2. Build local hoogle database:

Basic database:

```
hoogle data
```

Extended database **WARNING: this will take a lot of time and memory!**:

```
hoogle data all
```

3. Point this package to `hoogle` executable, if it's not in `PATH`:

Open Atom's settings, Packages, find ide-haskell-hoogle, then set 'Hoogle Path' to path to `hoogle` executable.
