import Document, { Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <script defer src='https://use.fontawesome.com/releases/v5.3.1/js/all.js' />
          <script type='text/javascript' src='https://unpkg.com/react-vis/dist/dist.min.js' />
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css' />
          <link rel='stylesheet' href='https://unpkg.com/react-vis/dist/style.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
