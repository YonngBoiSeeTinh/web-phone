import React, { useState } from 'react';
import axios from 'axios';
import ProductOptions from './ProductOptions'; // Nhập component ProductOptions

function ProductUpdateForm({ product, imageLink, setProduct }) {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedProductCopy = { ...updatedProduct };
        if (imageLink) {
            updatedProductCopy.image = imageLink;
        }
        delete updatedProductCopy._id;

        try {
            await axios.put(`http://localhost:3001/api/product/update/${product._id}`, updatedProductCopy);
            alert("Product updated successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const promoOptions = ['moi', 'giamgia', 'tragop'];

    return (
        <form className="product-update-form" onSubmit={handleUpdate}>
            <div className="product-update-form_item">
                <div>Tên sản phẩm</div>
                <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Công ty</div>
                <input
                    type="text"
                    name="company"
                    value={updatedProduct.company}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="product-update-form_item">
                <div>Giá</div>
                <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>Màu</div>
            <ProductOptions colors={product.colors} setProduct={setProduct} />
            <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <ul className="info">
                    <li>
                        <p>Khuyến mãi:</p>
                        <select
                            name="name"
                            style={{ width: '300px' }}
                            value={updatedProduct.promo.name}
                            onChange={handleChange}
                        >
                            {promoOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </li>
                    <li>
                        <p>Giá trị:</p>
                        <input
                            type="text"
                            name="value"
                            style={{ width: '300px' }}
                            value={updatedProduct.promo.value}
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <p>Giá gốc:</p>
                        <input
                            type="text"
                            name="oldPrice"
                            style={{ width: '300px' }}
                            value={updatedProduct.promo.oldPrice}
                            onChange={handleChange}
                        />
                    </li>
                </ul>
            </div>
            <button className="btnSubmit" type="submit">Cập nhật sản phẩm</button>
        </form>
    );
}

export default ProductUpdateForm;
