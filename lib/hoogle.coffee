CP = require 'child_process'
{EOL} = require 'os'

module.exports =
class Hoogle
  constructor: ->

  runWithArgs: (hcmd, [args..., query]) ->
    new Promise (resolve, reject) ->
      cmd = atom.config.get('ide-haskell-hoogle.hooglePath')
      args = [hcmd, '-vl'].concat(args).concat(['--', query])
      CP.execFile cmd, args, encoding: 'utf-8', maxBuffer: Infinity,
        (error, stdout, stderr) ->
          if error?
            reject error
          if stderr.trim()
            console.warn stderr
          resolve stdout
    .then (response) ->
      response.split(EOL)
    .then (lines) ->
      ans = false
      (for line in lines
        if ans
          line
        else if line is '= ANSWERS ='
          ans = true
          null
      ).filter (line) -> line?

  searchForSymbol: (symbol, exact = false) ->
    args = []
    if exact
      args.push '-e'
    args.push symbol
    @runWithArgs('search', args)
    .then (lines) ->
      lines.map (line, index) ->
        [mod, rest...] = line.split(' ')
        [signature, match, href] = rest.join(' ').split(' -- ')
        if match?
          {index, mod, signature, match, href}
      .filter (line) -> line?

  getDocForSymbol: (symbol, exact = false, index) ->
    args = ['-i']
    if exact
      args.push '-e'
    if index?
      args.push '--start', index + 1
    args.push symbol
    @runWithArgs('search', args)
    .then (lines) ->
      [first, rest..., last, empty] = lines
      [mod, signature...] = first.split(' ')
      [signature, match, href] = signature.join(' ').split(' -- ')
      if mod[0].toUpperCase() is mod[0]
        mod = "> module #{mod} where"
      if match?
        {href, lines: ["#{match} match", mod, "> #{signature}", rest...]}
      else
        {lines}
