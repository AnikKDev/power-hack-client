import React from 'react';
import useBillingData from '../../Components/useBillingData';
import Spinner from '../../Utilities/Spinner';

const BillingTable = () => {
    // fetch billing datas
    const [isLoading, billings, refetch] = useBillingData();
    // console.log(billings);
    // const numberValidation = /^([0-9]\d{9})?$/
    if (isLoading) {
        return <Spinner />
    };
    return (
        <div class="overflow-x-auto">
            <table class="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>Billing ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Paid Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        billings.map(billing =>
                            <tr>
                                <th>{billing._id}</th>
                                <td>{billing.fullName}</td>
                                <td>{billing.email}</td>
                                <td>{billing.phone}</td>
                                <td>{billing.paidAmount}</td>
                                <td><button className="btn btn-ghost btn-sm">Update</button> | <button className="btn btn-ghost btn-sm">Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default BillingTable;