import React from 'react';
import BillingHeader from './BillingHeader';
import BillingTable from './BillingTable';

const Billing = () => {
    return (
        <div className="w-4/5 mx-auto my-10">
            <BillingHeader />
            <BillingTable />
        </div>
    );
};

export default Billing;