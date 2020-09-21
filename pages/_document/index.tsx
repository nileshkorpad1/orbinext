// #region Global Imports
import * as React from "react";
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";
import { Helmet } from "react-helmet";
import GoogleFonts from "next-google-fonts";

// // import SEOCommon from 'src/seo/SeoCommon';

// import { ServerStyleSheet } from "styled-components";
// #endregion Global Imports
import { ServerStyleSheet } from "styled-components";

interface Iprops {
    helmet: any;
}
class WebAppDocument extends Document<Iprops> {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        const helmet = Helmet.renderStatic();

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
                helmet,
            };
        } finally {
            sheet.seal();
        }
    }

    // should render on <html>
    get helmetHtmlAttrComponents() {
        return this.props.helmet.htmlAttributes.toComponent();
    }

    // should render on <body>
    get helmetBodyAttrComponents() {
        return this.props.helmet.bodyAttributes.toComponent();
    }

    // should render on <head>
    get helmetHeadComponents() {
        return Object.keys(this.props.helmet)
            .filter(el => el !== "htmlAttributes" && el !== "bodyAttributes")
            .map(el => this.props.helmet[el].toComponent());
    }

    render() {
        return (
            <Html {...this.helmetHtmlAttrComponents}>
                <Head>
                    {this.helmetHeadComponents}
                    <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" />
                    <link
                        rel="stylesheet"
                        href="https://use.typekit.net/zul3dvr.css"
                    />
                </Head>
                <body {...this.helmetBodyAttrComponents}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default WebAppDocument;
