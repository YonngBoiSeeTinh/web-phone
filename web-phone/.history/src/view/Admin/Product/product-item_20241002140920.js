import React from 'react';
import './adminProduct.css';
import { Link } from 'react-router-dom';


const ProductItem = ({ product, onDelete }) => {
    return (
        <div className="admin-product-item">
            <img src={product.image} className='product-img' alt={product.name} />
            <h4 className="pro-name">{product.name}</h4>
            <div className="pro-price">{product.price}</div>
            <div>{product.rateCount} đánh giá</div>
            <div className='product-action'>
                <Link to={`/admin/adminProductDetail/${product.name}`}>
                    <div className='produt-action_item'>Cập nhật</div>
                </Link>
                <div className='produt-action_item delete' onClick={() => onDelete(product._id)}>
                    Xóa
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
