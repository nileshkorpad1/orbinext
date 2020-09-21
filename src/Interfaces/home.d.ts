import { WithTranslation } from "next-i18next";

declare namespace IHomePage {
    export interface IProps extends WithTranslation {}

    export interface InitialProps {
        namespacesRequired: string[];
    }

    export interface IStateProps {
        home: {
            version: number;
        };
        image: {
            url: string;
        };
    }

    namespace Actions {
        export interface getAuthenticatedStatus {}

        export interface IMapResponse {}
    }
}

export { IHomePage };
