import React, { useState } from 'react';
import BillingModal from './BillingModal';

const BillingHeader = () => {
    return (
        <div class="navbar bg-gray-400">
            <div class="flex-1">
                <a class="btn btn-ghost normal-case text-xl">Billings</a>
                <div class="form-control">
                    <input type="text" placeholder="Search" class="input input-bordered" />
                </div>
            </div>
            <div class="flex-none gap-2">
                {/* <button className="btn bg-black text-white modal-button" for="add-billing">Add new bill</button> */}
                <label for="add-billing" class="btn modal-button bg-black text-white">Add new bill</label>
            </div>
            <BillingModal />
        </div>
    );
};

export default BillingHeader;