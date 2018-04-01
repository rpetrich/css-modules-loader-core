import postcss from 'postcss'
import localByDefault from 'postcss-modules-local-by-default'
import extractImports from 'postcss-modules-extract-imports'
import scope from 'postcss-modules-scope'
import values from 'postcss-modules-values'

import Parser from './parser'

export default class Core {
  constructor( plugins ) {
    this.plugins = plugins || Core.defaultPlugins
  }

  load( sourceString, sourcePath, trace, pathFetcher ) {
    let parser = new Parser( pathFetcher, trace )

    const result = postcss( this.plugins.concat( [parser.plugin] ) )
      .process( sourceString, { from: "/" + sourcePath, map: { inline: false, annotation: false } } );
    const css = result.css;
    const map = result.map;
    return { injectableSource: css, exportTokens: parser.exportTokens, map: map ? map.toJSON() : undefined };
  }
}

// These four plugins are aliased under this package for simplicity.
Core.values = values
Core.localByDefault = localByDefault
Core.extractImports = extractImports
Core.scope = scope

Core.defaultPlugins = [values, localByDefault, extractImports, scope]
