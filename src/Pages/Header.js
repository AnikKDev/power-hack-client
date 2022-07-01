import React from 'react';
import useBillingData from '../Components/useBillingData';

const Header = () => {
    const [isLoading, billings, refetch] = useBillingData();
    const allBills = billings.map(bills => bills.paidAmount);
    let totalAmount = 0;
    for (const bills of allBills) {
        totalAmount = parseFloat(bills) + totalAmount;
    }

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div class="navbar bg-gray-400 px-10">
            <div class="flex-1">
                <a class="btn btn-ghost normal-case text-xl">Power Hack</a>
            </div>
            <div class="flex-none">
                <ul class="menu menu-horizontal p-0">
                    <li className="font-bold">Paid Total: {totalAmount}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;