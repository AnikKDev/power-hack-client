import React from 'react';
import { useForm } from "react-hook-form";
import useBillingData from '../../Components/useBillingData';
import Spinner from '../../Utilities/Spinner';
const BillingModal = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const billingDetail = {
            fullName: data.fullname,
            email: data.email,
            phone: data.phone,
            paidAmount: data.paidamount
        };
        console.log(billingDetail);
        fetch('http://localhost:5000/add-billing', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(billingDetail)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    };

    return (
        <div>
            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="add-billing" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box relative">
                    <label for="add-billing" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3 justify-items-center mt-5">

                        <input
                            {...register("fullname", { required: true })}
                            type="text" placeholder="Full Name" class="input input-bordered w-full max-w-xs" />
                        {errors.fullname && <p className="text-error">Full name is required</p>}

                        <input
                            {...register("email", { required: true })}
                            type="email" placeholder="Email" class="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className="text-error">Email is required</p>}

                        <input

                            {...register("phone", {
                                required: true,
                                pattern: /^([0-9]\d{10})?$/
                            })}
                            type="number" placeholder="Phone" class="input input-bordered w-full max-w-xs" />
                        {errors.phone && <p className="text-error">Invalid Phone Number</p>}

                        <input
                            {...register("paidamount", { required: true })}
                            type="number" placeholder="Paid AMount" class="input input-bordered w-full max-w-xs" />
                        {errors.paidamount && <p className="text-error">Paid Amount is required</p>}

                        <button type="submit" class="btn w-full max-w-xs">Add</button>

                    </form>


                </div>
            </div>
        </div>
    );
};

export default BillingModal;