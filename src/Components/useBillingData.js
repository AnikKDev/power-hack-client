import React, { useState } from 'react';
import { useQuery } from 'react-query';

const useBillingData = () => {
    // const [billings, setBillings] = useState([]);

    const { isLoading, data: billings, refetch } = useQuery('bills', () =>
        fetch('http://localhost:5000/billing-list')
            .then(res => res.json())
    )
    return [isLoading, billings, refetch];
};

export default useBillingData;