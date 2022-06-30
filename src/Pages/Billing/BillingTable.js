import React, { useState } from 'react';
import swal from 'sweetalert';
import useBillingData from '../../Components/useBillingData';
import Spinner from '../../Utilities/Spinner';
import BillingModal from './BillingModal';
import EditModal from './EditModal';

const BillingTable = () => {
    // fetch billing datas
    const [isLoading, billings, refetch] = useBillingData();
    const [billDetail, setBillDetail] = useState({});

    // console.log(billings);
    // const numberValidation = /^([0-9]\d{9})?$/


    /* 
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        fetch(`https://rocky-gorge-79566.herokuapp.com/delete-billing/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
    */


    const deleteBill = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Billing Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://rocky-gorge-79566.herokuapp.com/delete-billing/${id}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                swal("Poof! Your Bill has been deleted!", {
                                    icon: "success",
                                });
                            }
                        })

                } else {
                    swal("Your Bill is safe!");
                }
            });
    };
    refetch();

    if (isLoading) {
        return <Spinner />
    };
    return (
        <div class="overflow-x-auto my-6">
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
                                <td><label onClick={() => setBillDetail(billing)} for="edit-bill" class="btn modal-button btn-sm btn-ghost">Edit</label> | <button onClick={() => deleteBill(billing._id)} className="btn btn-ghost btn-sm">Delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <EditModal billDetail={billDetail} />
        </div>
    );
};

export default BillingTable;