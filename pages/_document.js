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
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
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