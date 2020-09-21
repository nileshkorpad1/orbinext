import React from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useRouter } from "next/router";

// import { isEmpty } from '@Helpers/';

import { CountryDetection } from "@Components/Common/CountryDetection";
import { StoreState } from "@Interfaces";
import { isEmpty } from "@Helpers/Helpers";
// import planDataJson from '@components/data/plans.json';
// import { StoreState } from '@store/types';

const CTAForm = props => {
    const isAuthenticated = useSelector(
        (state: StoreState) => state.authentication.authenticated
    );
    const [validated, setValidated] = React.useState(false);
    const pricing = useSelector((state: StoreState) => state.Pricing.plans);
    const [allPricing, setAllPricing] = React.useState(null);
    const router = useRouter();
    // const history = useHistory();
    // const location = useLocation();
    // const match = useRouteMatch();
    let countryRoute = "";

    countryRoute = CountryDetection.myCountry();
    React.useEffect(() => {
        if (pricing && !isEmpty(pricing["all"])) {
            let env = process.env.REACT_APP_ENV;
            const AIOYearlyPricing = {
                PlanID: pricing["all"]["YearlyPlans"][2]["PlanID"][env],
                product: "All-in-One",
                Amount: pricing["all"]["YearlyPlans"][2]["Amount"],
                PlanName: pricing["all"]["YearlyPlans"][2]["PlanName"],
                Currency: pricing["all"]["YearlyPlans"][2]["Currency"],
                Interval: pricing["all"]["YearlyPlans"][2]["Interval"],
            };

            setAllPricing(AIOYearlyPricing);
        }
        // setAllPricing()
    }, [pricing]);
    const handleSubmit = event => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            let user = JSON.parse(localStorage.getItem("user_signup_details")||'{}');

            if (user) {
                user.email = form.elements["email"].value;
            } else {
                user = {
                    email: form.elements["email"].value,
                };
            }
            const PlanData = {
                product: "All-in-One",
                duration: "yearly",
                ...allPricing,
            };
            localStorage.removeItem("planData");
            localStorage.removeItem("user_signup_details");
            localStorage.setItem("planData", JSON.stringify(PlanData));
            // PreUserDetails = { PreUserDetails, ...user};
            localStorage.setItem("user_signup_details", JSON.stringify(user));
            const redirectURL = `${countryRoute}/sign-up/?product=${PlanData.product}&planID=${PlanData.PlanID}`;
            router.push(redirectURL);
        }

        setValidated(true);
    };
    return (
        <React.Fragment>
            {isAuthenticated ? (
                <div className="hide-cta-form d-none" />
            ) : (
                <div className="deskera-form cta-form">
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <InputGroup className="col-12 my-3 p-0">
                            <FormControl
                                placeholder="Enter email for free trial"
                                aria-label="Enter email for free trial"
                                aria-describedby="cta-form"
                                required
                                type="email"
                                name="email"
                                size="lg"
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="dark"
                                    type="submit"
                                    className="btn-block"
                                >
                                    Try it first!
                                </Button>
                            </InputGroup.Append>
                            <Form.Control.Feedback type="invalid">
                                Please correct your email address
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form>
                </div>
            )}
        </React.Fragment>
    );
};

export default CTAForm;
