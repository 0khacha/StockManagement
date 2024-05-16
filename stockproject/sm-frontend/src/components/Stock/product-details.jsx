import React from 'react';

function ProductDetails() {
    return (
        <div className='product-details'>
            <h3>Stock details</h3>
            <div>
                <div className='product-details__item'>
                    <ul>
                        <li className={'green-items'}>
                            <span className={'item-name'}>All items</span>
                            <span className={'item-value'}>300</span>
                        </li>
                        <li className={'green-items'}>
                            <span className={'item-name'}>Top-selling items</span>
                            <span className={'item-value'}>120</span>
                        </li>
                        <li className={'green-items'}>
                            <span className={'item-name'}>Fast-moving items</span>
                            <span className={'item-value'}>100</span>
                        </li>
                        <li className={'red-items'}>
                            <span className={'item-name'}>Slow-moving items</span>
                            <span className={'item-value'}>34</span>
                        </li>
                        <li className={'red-items'}>
                            <span className={'item-name'}>Items with upcoming expiration dates</span>
                            <span className={'item-value'}>10</span>
                        </li>
                        <li className={'red-items'}>
                            <span className={'item-name'}>Out of stock items</span>
                            <span className={'item-value'}>4</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
