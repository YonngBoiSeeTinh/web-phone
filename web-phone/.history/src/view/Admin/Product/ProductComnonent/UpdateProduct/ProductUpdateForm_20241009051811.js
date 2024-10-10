import React, { useState } from 'react';
import axios from 'axios';
import ProductOptions from './ProductOptions'; // Nhập component ProductOptions

function ProductUpdateForm({ product, imageLink, setProduct }) {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });

    // Hàm xử lý thay đổi của input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Hàm xử lý cập nhật sản phẩm
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedProductCopy = { ...updatedProduct };
        if (imageLink) {
            updatedProductCopy.image = imageLink; // Cập nhật link hình ảnh nếu có thay đổi
        }

        delete updatedProductCopy._id;  // Xóa trường _id
        
        try {
            const response = await axios.put(`http://localhost:3001/api/product/update/${product._id}`, updatedProductCopy);
            console.log('update product copy',updatedProductCopy);
          
           
            alert("Product updated successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    const promoOptions = ['moi', 'giamgia', 'tragop'];
    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        
        setUpdatedProduct((prev) => ({
            ...prev,
            detail: {
                ...prev.detail,
                [name]: value // Cập nhật thông tin chi tiết
            }
        }));
    };
    const handlePromoChange = (e) => {
        const { name, value } = e.target;

        setUpdatedProduct((prev) => ({
            ...prev,
            promo: {
                ...prev.promo,
                [name]: value // Cập nhật thông tin khuyến mãi
            }
        }));
    };

    const details = [
        { key: "Màn hình", name: "screen",value: updatedProduct.detail?.screen || "Không có thông tin" },
        { key: "Hệ điều hành",  name: "os",value: updatedProduct.detail?.os || "Không có thông tin" },
        { key: "Camera sau", name: "camera", value: updatedProduct.detail?.camera || "Không có thông tin" },
        { key: "Camera trước",  name: "cameraFront",value: updatedProduct.detail?.cameraFront || "Không có thông tin" },
        { key: "CPU",name: "cpu", value: updatedProduct.detail?.cpu || "Không có thông tin" },
        { key: "RAM",name: "ram", value: updatedProduct.detail?.ram || "Không có thông tin" },
        { key: "ROM", name: "rom", value: updatedProduct.detail?.rom || "Không có thông tin" },
        { key: "MicroSD", name: "microUSB",value: updatedProduct.detail?.microUSB || "Không có thông tin" },
        { key: "Pin", name: "battery", value: updatedProduct.detail?.battery || "Không có thông tin" },
    ];

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
            <ProductOptions colors={product.colors} setUpdatedProduct = {setUpdatedProduct}></ProductOptions>
            <div className="info_product promo">
                <h2>Khuyến mãi</h2>
                <ul className="info">
                    <li>
                    <p>Tên Khuyến mãi</p>
                        <select
                            name="name"
                            onChange={handlePromoChange}
                        >
                            {promoOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </li>
                    <li>
                        <p>Giá trị:</p>
                        <input
                            type="text"
                            name="value"
                            style={{ width: '300px' }}
                            defaultValue={updatedProduct.promo.value}
                            onChange={handlePromoChange}
                        />
                    </li>
                    <li>
                        <p>Giá gốc:</p>
                        <input
                            type="text"
                            name="oldPrice"
                            style={{ width: '300px' }}
                            defaultValue={updatedProduct.promo.oldPrice}
                            onChange={handlePromoChange}
                        />
                    </li>
                </ul>
            </div>
            <div className="info_product">
                <h2>Thông số kỹ thuật</h2>
                <ul className="info">
                    {details.map((item, index) => (
                        <li key={index}>
                            <p>{item.key}:</p>
                            <input
                                type="text"
                                name={item.name}    
                                style={{ width: '300px' }}
                                defaultValue={item.value}
                                onChange={handleDetailChange}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button className="btnSubmit" type="submit">Cập nhật sản phẩm</button>
        </form>
    );
}

export default ProductUpdateForm;
