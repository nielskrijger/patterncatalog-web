# PatternCatalog Web

**Under development.**

This project is an isomorphic JavaScript project written using [http://facebook.github.io/react/](React.js) and
based on the [Flux](https://github.com/facebook/flux) architecture.

An isomorphic javascript wesite runs the same JavaScript code on both the client and server. This solves some problems
commonly associated with single-page applications such as SEO issues and slow initial page load.

The project is powered by [Fluxible-app](https://github.com/yahoo/fluxible-app), a Yahoo container for isomorphic flux
applications.

## Structure

    /client - Source files bundled for the webbrowser.
    /server - Source files used by the Node server.
    /build - Build artifacts used during development (non-minified). Generated when running `gulp`.
    /dist - Minified static files to be served by a webserver or CDN. Generated when running `gulp deploy`.

## Development

Make sure you have installed Docker (v1.3 or higher) and [Fig](http://www.fig.sh/).

Run the following:

    1. Run `npm install`.
    2. Run `fig up` to start MongoDB and PatternCatalog API docker instances.
    3. Run `gulp` in second CLI window to generate build artifacts (CSS, JS, ...) and watch for file changes.
    4. Run `gulp server` in a third CLI window to start a development server.
