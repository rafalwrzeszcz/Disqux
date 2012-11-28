<!---
# @author Rafał Wrzeszcz <rafal.wrzeszcz@wrzasq.pl>
# @copyright 2012 © by Rafał Wrzeszcz - Wrzasq.pl.
# @version 0.0.1
# @since 0.0.1
# @package WrzasqPl\Disqux
-->

# Disqux - XHTML-compilant Disqus embed script

Disqus is a great service that takes all comments-related scripts out of your shoulders, but it doesn't work in *real* XHTML applications (when the one is served with `application/html+xml` content 
type). Disqus team has even stated it clear, that [they WILL NOT care about XHTML support](https://groups.google.com/forum/?fromgroups=#!topic/disqus-dev/kaIyNK1kx8M).

But it's not really a big deal - Disqus is loaded within *&lt;iframe&gt;* so all that needs to be XHTML-compatible is a loading script. **Disqux** is a drop-in replacement for original `embed.js` script that will allow to load Disqus in XHTML application.

The source is just un-minified version of that `embed.js`, so all the methods and variables names are still obfuscated - it is just formated the way it can be easier to debug in case of more XHTML incmpatibilities.

## Usage

Simply replace file URL and you can enjoy Disqus comments in your XHTML application:

```html
<div id="disqus_thread"></div>
<script type="text/javascript">
    var disqus_shortname = 'your-short-name';

    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '/path/to/your/disqus.js'; // THIS IS ALL YOU NEED TO DO
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
```

You can see example on [my blog - http://wrzasq.pl/](http://wrzasq.pl/blog/chilldevviewhelpersbundle-php-templating-helpers-for-symfony-2.html#disqus_thread).

## Minification

You probably have minifying script in your application deploy flow, so the main file is distributed in un-obfuscated way, so you can use it in your development environment. If you don't want to implement own minifying flow however, there is simple `Makefile` in project directory which contains minification tasks.

## What was fixed

If you want to know what's the difference between this script and original `embed.js` the answer is veeeeery short - just one space. That's right! Just one space and this script works perfectly with XHTML applications - can't understand why it's so big deal for Disqus team :/. The fix is located [here](https://github.com/rafalwrzeszcz/Disqux/blob/master/disqus.js#L729) - in original file there is no space between attributes and it causes DOM paring errors when injecting this snippet into `innerHTML` property of container.
