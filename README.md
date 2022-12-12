
## Import JS scripts in Webflow

Please use 
```js
<script src="https://cdn.jsdelivr.net/gh/Zefir-Engineering/website@{RELEASE_TAG}/{SCRIPT_NAME.js}"></script>
```

We should **always** use the `latest` release on the HTML pages. For ex.:

```js
<script src="https://cdn.jsdelivr.net/gh/Zefir-Engineering/website@latest/landing.js"></script>
```


## Purge the cache on JSDelivr

If you want to purge the cache on a specific file on JSDeliver, instead of going to the subdomain `cdn` you should go on the following one: `purge`.
Here's an example for `landing.js`: https://purge.jsdelivr.net/gh/zefirfrance/website@main/landing.js
