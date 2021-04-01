import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'Stores/connect';
import { Button } from '@deriv/components';
import { redirectToSignUp } from '@deriv/shared';
import { localize } from '@deriv/translations';

const SignupButton = ({ className, is_dashboard, pushDataLayer }) => (
    <Button
        id='dt_signup_button'
        className={className}
        has_effect
        text={localize('Sign up')}
        onClick={() => {
            // console.log(localStorage);
            const gtm_data = {
                event: 'signup',
                element_id: 'dt_signup_button',
                action: 'click',
                system_language: window.navigator.language,
                user_agent: window.navigator.userAgent,
            };
            pushDataLayer(gtm_data);
            redirectToSignUp({ is_dashboard });
        }}
        primary
    />
);

SignupButton.propTypes = {
    className: PropTypes.string,
    is_dashboard: PropTypes.bool,
};

export default connect(({ gtm }) => ({
    pushDataLayer: gtm.pushDataLayer,
}))(SignupButton);
