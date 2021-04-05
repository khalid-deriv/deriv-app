import PropTypes from 'prop-types';
import React from 'react';
import { FormSubmitButton, Icon, Input, Loading, Text } from '@deriv/components';
import { getDecimalPlaces, getCurrencyDisplayCode, getCurrencyName, validNumber } from '@deriv/shared';
import { Field, Formik, Form } from 'formik';
import { localize } from '@deriv/translations';
import { connect } from 'Stores/connect';

const WithdrawCrypto = ({ selected_from }) => {
    const validateFields = values => {
        const errors = {};
        if (values) return errors;
        return errors;
    };

    const validateAmount = amount => {
        if (!amount) return localize('This field is required.');

        const { is_ok, message } = validNumber(amount, {
            type: 'float',
            decimals: getDecimalPlaces(selected_from.currency),
            // min: transfer_limit.min,
            // max: transfer_limit.max,
        });
        if (!is_ok) return message;

        if (+selected_from.balance < +amount) return localize('Insufficient balance.');

        return undefined;
    };

    const validateWalletAddress = address => {};

    const handleSubmitForm = values => {
        console.log(values);
    };

    return (
        <div className='cashier__wrapper'>
            <div className='withdraw-crypto__wrapper'>
                <Formik
                    initialValues={{
                        wallet_address: '',
                        amount: '',
                    }}
                    onSubmit={() => {
                        console.log('Submitted');
                    }}
                >
                    {({ values, errors, isSubmitting, isValid, touched, setFieldTouched, handleChange }) => (
                        <React.Fragment>
                            {isSubmitting ? (
                                <div className='cashier__loader-wrapper'>
                                    <Loading className='cashier__loader' is_fullscreen={false} />
                                </div>
                            ) : (
                                <Form>
                                    <Text
                                        as='h2'
                                        color='prominent'
                                        weight='bold'
                                        align='center'
                                        className='cashier__header cashier__content-header'
                                    >
                                        {localize('Withdraw to your crypto currency wallet')}
                                    </Text>
                                    <Icon icon='IcCurrencyBtc' className='withdraw-crypto__icon' size={128} />
                                    <Field name='wallet_address' validate={validateWalletAddress}>
                                        {({ field }) => (
                                            <Input
                                                {...field}
                                                className='withdraw-crypto__address'
                                                type='text'
                                                autoComplete='off' // prevent chrome autocomplete
                                                label={localize('Wallet address')}
                                                value={values.wallet_address}
                                                onChange={handleChange}
                                            />
                                        )}
                                    </Field>
                                    <Field name='amount' validate={validateAmount}>
                                        {({ field }) => (
                                            <Input
                                                {...field}
                                                className='withdraw-crypto__amount'
                                                label={localize('Amount')}
                                                type='text'
                                                autoComplete='off' // prevent chrome autocomplete
                                                error={touched.amount && errors.amount ? errors.amount : ''}
                                                required
                                                value={values.amount}
                                                onChange={e => {
                                                    // setErrorMessage('');
                                                    handleChange(e);
                                                    // setAccountTransferAmount(e.target.value);
                                                    setFieldTouched('amount', true, false);
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <FormSubmitButton
                                        className='withdraw__crypto-button'
                                        label={localize('Withdraw')}
                                        primary
                                        large
                                        is_disabled={
                                            !(values.wallet_address && values.amount) || !isValid || isSubmitting
                                        }
                                    />
                                </Form>
                            )}
                        </React.Fragment>
                    )}
                </Formik>
            </div>
        </div>
    );
};

WithdrawCrypto.propTypes = {
    is_email_sent: PropTypes.bool,
    is_resend_clicked: PropTypes.bool,
    resend_timeout: PropTypes.number,
    selected_from: PropTypes.object,
    sendVerificationEmail: PropTypes.func,
};

export default connect(({ modules }) => ({
    is_email_sent: modules.cashier.config.withdraw.verification.is_email_sent,
    is_resend_clicked: modules.cashier.config.withdraw.verification.is_resend_clicked,
    resend_timeout: modules.cashier.config.withdraw.verification.resend_timeout,
    selected_from: modules.cashier.config.account_transfer.selected_from,
    sendVerificationEmail: modules.cashier.sendVerificationEmail,
}))(WithdrawCrypto);
