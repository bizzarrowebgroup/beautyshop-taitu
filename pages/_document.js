import Document, { Html, Head, Main, NextScript, NextDocument } from 'next/document'

class MyDocument extends Document {
  //static async getInitialProps(ctx) {
  //  const initialProps = await NextDocument.getInitialProps(ctx);

  //  // Determine if class name should be added
  //  return {
  //    ...initialProps,
  //    shouldShow: true
  //  };
  //}

  render() {
    return (
      <Html>
        <Head>
          {/*<meta name="viewport" content="width=device-width, initial-scale=1" />*/}
          {/*<meta name="viewport" content="viewport-fit=cover" />*/}
          <style>
            {
              `#__next {
                  height: 100%
                }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;