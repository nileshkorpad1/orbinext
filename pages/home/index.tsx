// #region Global Imports
import * as React from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
// #endregion Global Imports
import { Container } from "react-bootstrap";
// #region Local Imports
import { withTranslation } from "@Server/i18n";

import { HeroSectionItrFour as HomeHeroSection } from "@Components";
import { IHomePage, ReduxNextPageContext } from "@Interfaces";
import { planActions } from "@Actions";
// #endregion Local Imports

// #region Interface Imports
// import { IHomePage, ReduxNextPageContext } from "@Interfaces";
// #endregion Interface Imports

const Home: NextPage<IHomePage.IProps, IHomePage.InitialProps> = ({
    t,
    i18n,
}) => {
    // const home = useSelector((state: IStore) => state.home);
    // const dispatch = useDispatch();
    const isAuthenticated = false;

    return (
        <Container
            className={`px-0 homepage homepage-four ${
                isAuthenticated ? "is-authenticated" : "is-visitor"
            }`}
            fluid
        >
            <React.Fragment>
                <main>
                    {/* Home page demo-1specific components */}
                    <HomeHeroSection />
                    {/* <AIODashboard {...this.props} />
                    <PricingCompact {...this.props} />
                    <HomeKeyFeaturesSection {...this.props} />
                    <Benefits {...this.props} />
                    <BooksInfo {...this.props} />
                    <SalesInfo {...this.props} />
                    <PeopleInfo {...this.props} />
                    <AIOFeatures {...this.props} />
                    <Ratings {...this.props} />
                    <AIOBusinessSoftware {...this.props} />
                    <CompareWithOthers {...this.props} />
                    <SaveMoney {...this.props} />
                    <ProductPipeline {...this.props} />
                    <MobileApps {...this.props} />
                    <BlogPreview {...this.props} />
                    <CTATypeOne {...this.props} /> */}
                </main>
                {/* <StickyFooter {...this.props} /> */}
                {/* <DefaultFooter ref={this.footerRef} {...this.props} /> */}
            </React.Fragment>
        </Container>
    );
};

Home.getInitialProps = async (
    ctx: ReduxNextPageContext
): Promise<IHomePage.InitialProps> => {
    await ctx.store.dispatch(planActions.getProductPlans());
    return { namespacesRequired: ["common"] };
};

const Extended = withTranslation("common")(Home);

export default Extended;
