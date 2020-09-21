export interface Plan {
    MonthlyPlans: {
        PlanName: string;
        PlanID: string;
        ProductLimits: [
            {
                Code: string;
                FreeUserCount: number;
                AddonCharge: number;
            }
        ];
        Features: [
            {
                Product: string;
                DisplayHeader: string;
                DisplayFeatures: [
                    {
                        Name: string;
                        IsGroup: boolean;
                        Items: string[];
                    }
                ];
            }
        ];
        Addons: [
            {
                Description: string;
                Code: string;
                Items: [
                    {
                        Name: string;
                        Values: any;
                        Code: string;
                    }
                ];
            }
        ];
        Amount: number;
        Currency: string;
        Active: boolean;
        TrialDays: number;
        Interval: string;
    };
    YearlyPlans: {
        PlanName: string;
        PlanID: string;
        ProductLimits: [
            {
                Code: string;
                FreeUserCount: number;
                AddonCharge: number;
            }
        ];
        Features: [
            {
                Product: string;
                DisplayHeader: string;
                DisplayFeatures: [
                    {
                        Name: string;
                        IsGroup: boolean;
                        Items: string[];
                    }
                ];
            }
        ];
        Addons: [
            {
                Description: string;
                Code: string;
                Items: [
                    {
                        Name: string;
                        Values: any;
                        Code: string;
                    }
                ];
            }
        ];
        Amount: number;
        Currency: string;
        Active: boolean;
        TrialDays: number;
        Interval: string;
    };
}

export interface User {
    currency: string;
    email: string;
    name: string;
}

export interface PlanPricing extends Plan {
    Pricing: {
        plans: {
            all: Plan;
            erp: Plan;
            crm: Plan;
            people: Plan;
        };
    };
    product: string;
    getAuthenticatedStatus: Function;
    getUserSubscription: Function;
    resendVerificationEmail: Function;
    ShowLogin: Function;
    HideLogin: Function;

    Users: {
        user: User;
    };
    isAuthenticated: boolean;
    emailVerified: boolean;
    emailVerifying: boolean;
    Duration: string;
    subscription: any;
    payment_method: any;
}
