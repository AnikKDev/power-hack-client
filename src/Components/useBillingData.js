import React, { useState } from 'react';
import { useQuery } from 'react-query';

const useBillingData = () => {
    // const [billings, setBillings] = useState([]);

    const { isLoading, data: billings, refetch } = useQuery('bills', () =>
        fetch('https://rocky-gorge-79566.herokuapp.com/billing-list')
            .then(res => res.json())
    )
    return [isLoading, billings, refetch];
};

export default useBillingData;