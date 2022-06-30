import React from 'react';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
const EditModal = ({ billDetail }) => {
    const { fullName, email, paidAmount, phone, _id } = billDetail;
    const { register, formState: { errors }, handleSubmit, watch, reset } = useForm();
    const onSubmit = (data) => {
        const updatedData = {
            fullName: data.fullname,
            paidAmount: data.paidamount,
            phone: data.phone,
            email: data.email
        };

        fetch(`http://localhost:5000/update-billing/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    swal("Updated", "Successfully updated", "success");

                }
            })
    };

    return (
        <div>
            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="edit-bill" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box relative">
                    <label for="edit-bill" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3 justify-items-center mt-5">

                        <input
                            {...register("fullname", { required: true })}
                            type="text" defaultValue={fullName} class="input input-bordered w-full max-w-xs" />
                        {errors.fullname && <p className="text-error">Please update Name</p>}

                        <input
                            {...register("email", { required: true })}
                            type="email" defaultValue={email} placeholder="Email" class="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className="text-error">Please update email</p>}

                        <input

                            {...register("phone", {
                                required: true,
                                pattern: /^([0-9]\d{10})?$/
                            })}
                            type="number" defaultValue={phone} placeholder="Phone" class="input input-bordered w-full max-w-xs" />
                        {errors.phone && <p className="text-error">Please update phone number</p>}

                        <input
                            {...register("paidamount", { required: true })}
                            type="number" defaultValue={paidAmount} placeholder="Paid AMount" class="input input-bordered w-full max-w-xs" />
                        {errors.paidamount && <p className="text-error">Please change paid amount</p>}

                        <button type="submit" class="btn w-full max-w-xs">Update</button>

                    </form>


                </div>
            </div>
        </div>
    );
};

export default EditModal;