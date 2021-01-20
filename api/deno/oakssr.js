import { Application, Router, helpers } from 'https://deno.land/x/oak/mod.ts'
import App from 'https://raw.githubusercontent.com/DougAnderson444/svelte/master/example/oakssr/App.svelte.compiled.js'

const HTML = `
<!doctype html>
<html lang=\"en\">
<head>
    <meta charset=\"utf-8\">
    <title>Deno Svelte Server Side App</title>
    <meta name=\"theme-color\" content=\"#1e88e5\">
    <meta name=\"mobile-web-app-capable\" content=\"yes\">
    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">
    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">
    <!-- {{INJECT.HEAD}} -->
</head>
<body>
    <!-- {{INJECT.BODY}} -->
    Hello from Deno v${Deno.version.deno}
</body>

</html>`

const app = new Application()

app.use((ctx) => {
  ctx.response.body = HTML
  console.log(ctx)
})

export default app.handle
