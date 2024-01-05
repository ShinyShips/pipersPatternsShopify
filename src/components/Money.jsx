import { useState, useEffect } from 'react';

export default function PriceDisplay({ price, showCurrency = false }) {
    let formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currencyCode,
        currencyDisplay: showCurrency ? 'symbol' : 'narrowSymbol',
        }).format(parseFloat(price.amount));

    const [formatPrice, setFormatPrice] = useState(formattedPrice);

    useEffect(() => {
        formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currencyCode,
        currencyDisplay: showCurrency ? 'symbol' : 'narrowSymbol',
        }).format(parseFloat(price.amount));

        setFormatPrice(formattedPrice);
    }, [price, showCurrency]);

    return <span>{formatPrice}</span>;
}
