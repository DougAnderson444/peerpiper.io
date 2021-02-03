// https://peerpiper.io/api/deno/oakssr.js
import { Application, helpers } from 'https://deno.land/x/oak/mod.ts'
import App from 'https://raw.githubusercontent.com/DougAnderson444/svelte/master/example/oakssr/App.svelte.compiled.js'

const HTML = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Deno Svelte Server Side App</title>
    <meta name="theme-color" content="#1e88e5">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- {{INJECT.HEAD}} -->
</head>
<body>
    <!-- {{INJECT.BODY}} -->
    Hello from Deno v${Deno.version.deno}
</body>

</html>`

const renderApp = (params) => {
  const ssr = App.render(params)

  let inject_head = ssr.head || ''
  if (ssr.css && ssr.css.code) {
    inject_head += `<style>${ssr.css.code}</style>`
  }

  const output =
    (
      HTML // Inject SSR'd header & body contents
        .replace('<!-- {{INJECT.HEAD}} -->', inject_head)
        .replace('<!-- {{INJECT.BODY}} -->', ssr.html)
    )
  return output
}

const oak = new Application()

oak.use((ctx) => {
  const query = helpers.getQuery(ctx, { mergeParams: true })
  console.log({ query })

  const output = renderApp(query)

  ctx.response.headers.set('content-type', 'text/html;charset=UTF-8')
  ctx.response.body = output
})

export default oak.handle
