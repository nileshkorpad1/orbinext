import React from 'react';
// import { ReactComponent as EssentialIcon } from 'assets/images/icon-plan-essential-color.svg';
// import { ReactComponent as IndividualIcon } from 'assets/images/icon-plan-individual-dark.svg';
// import { ReactComponent as ProfessionalIcon } from 'assets/images/icon-plan-professional-color.svg';
// import { ReactComponent as StartupIcon } from 'assets/images/icon-plan-startup-color.svg';

export default function PlanIcon(icon) {
	switch (icon.icon) {
		case 'Startup':
			return <img src="/assets/images/icon-plan-essential-color.svg" className="plan-icon" />;
		case 'Essential':
			return <img src="/assets/images/icon-plan-individual-dark.svg" className="plan-icon" />;
		case 'Professional':
			return <img src="/assets/images/icon-plan-professional-color.svg" className="plan-icon" />;
		default:
			return <img src="/assets/images/icon-plan-startup-color.svg" className="plan-icon" />;
	}
}
