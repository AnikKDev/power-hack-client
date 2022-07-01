import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import swal from 'sweetalert';
import useBillingData from '../../Components/useBillingData';
import Spinner from '../../Utilities/Spinner';
import BillingModal from './BillingModal';
import EditModal from './EditModal';

const BillingTable = () => {
    // fetch billing datas
    // const [isLoading, billings, refetch] = useBillingData();
    const [billDetail, setBillDetail] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const { isLoading, data: billings, refetch } = useQuery(['bills', page, size], () =>
        fetch(`https://rocky-gorge-79566.herokuapp.com/billing-list?page=${page}&size=${size}`)
            .then(res => res.json())
    )

    useEffect(() => {
        fetch('https://rocky-gorge-79566.herokuapp.com/productCount')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 10);
                setPageCount(pages);
            })
    }, [])



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

            {/* pagination btn */}
            <div class="btn-group justify-center mt-10">
                {
                    [...Array(pageCount).keys()].map(number =>
                        <button onClick={() => setPage(number)} class={page === number ? 'btn-active btn mx-1' : 'btn mx-1'}>{number + 1}</button>
                    )
                }
            </div>
        </div>
    );
};

export default BillingTable;