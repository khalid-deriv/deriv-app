import PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon, Input, Text } from '@deriv/components';
import { Formik } from 'formik';
import { localize, Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';

const initial_values = {
    wallet_address: '',
    amount: '',
};

const validateFields = values => {
    const errors = {};
    if (values) return errors;
    return errors;
};

const handleSubmitForm = values => {
    console.log(values);
};

const WithdrawCrypto = () => (
    <div className='cashier__wrapper'>
        <div className='withdraw-crypto__wrapper'>
            <Formik initialValues={initial_values} validate={validateFields} onSubmit={handleSubmitForm}>
                {({ values, errors, handleChange }) => (
                    <React.Fragment>
                        <Text weight='bold' as='p' align='center' className='withdraw__header'>
                            <Localize i18n_default_text='Withdraw to your crypto currency wallet' />
                        </Text>
                        <Icon icon='IcCurrencyBtc' className='withdraw-crypto__icon' size={128} />
                        <Input
                            className='withdraw-crypto__address'
                            type='text'
                            name='wallet_address'
                            autoComplete='off' // prevent chrome autocomplete
                            label={localize('Wallet address')}
                            value={values.wallet_address}
                            onChange={handleChange}
                        />
                        <Input
                            className='withdraw-crypto__amount'
                            type='text'
                            name='amount'
                            autoComplete='off' // prevent chrome autocomplete
                            label={localize('Amount')}
                            value={values.amount}
                            onChange={handleChange}
                        />
                        <Button
                            className='withdraw__crypto-button'
                            has_effect
                            text={localize('Withdraw')}
                            primary
                            large
                            is_disabled
                        />
                    </React.Fragment>
                )}
            </Formik>
        </div>
    </div>
);

WithdrawCrypto.propTypes = {
    is_email_sent: PropTypes.bool,
    is_resend_clicked: PropTypes.bool,
    resend_timeout: PropTypes.number,
    sendVerificationEmail: PropTypes.func,
};

export default connect(({ modules }) => ({
    is_email_sent: modules.cashier.config.withdraw.verification.is_email_sent,
    is_resend_clicked: modules.cashier.config.withdraw.verification.is_resend_clicked,
    resend_timeout: modules.cashier.config.withdraw.verification.resend_timeout,
    sendVerificationEmail: modules.cashier.sendVerificationEmail,
}))(WithdrawCrypto);
