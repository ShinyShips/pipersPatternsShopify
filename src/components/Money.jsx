import { useState, useEffect } from 'react';

export default function PriceDisplay({ price, showCurrency = false }) {
    const [formatPrice, setFormatPrice] = useState('');
    console.log(formatPrice)

    useEffect(() => {
        const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currencyCode,
        currencyDisplay: showCurrency ? 'symbol' : 'narrowSymbol',
        }).format(parseFloat(price.amount));

        setFormatPrice(formattedPrice);
    }, [price, showCurrency]);

    return <span>${price.amount || formatPrice}</span>;
}
