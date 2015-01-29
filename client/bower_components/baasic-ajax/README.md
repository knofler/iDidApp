# &lt;baasic-ajax&gt;

> [Baasic](http://www.baasic.com) version of the [core-ajax](http://polymer.github.io/core-ajax/) Web Component providing support for application-wide authentication.

## Demo

[Check it live!](http://demo.baasic.com/polymer/)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install baasic-ajax --save
```

Or download the source code and install it manually in your projects.

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="bower_components/platform/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/baasic-ajax/baasic-ajax.html">
    ```

3. Start using it!

    ```html
    <baasic-ajax id="ajax" url="{{baseUrl}}/{{version}}/{{application}}/article/{{slug}}/" params='{"embed":"Authors,Tags"}' handleas="json" contenttype="application/json" response="{{response}}" on-core-error="{{onGetError}}"></baasic-ajax>
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/baasic/baasic-sdk-polymer-core-ajax/releases).
