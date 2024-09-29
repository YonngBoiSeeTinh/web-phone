import React from "react";
import './home.css';
import ProductItem from "./ProductItem";

function ProductList({ products }) {
    // Kiểm tra nếu products không phải là mảng hoặc là undefined
    if (!products || !Array.isArray(products) || products.length === 0) {
        return (
            <div id="khongCoSanPham">
                <i className="fa fa-times-circle"></i>
                Không có sản phẩm nào
            </div>
        );
    }

    return (
        <>
            <div className="ProductList">
                {products.map((product, index) => (
                    <ProductItem key={index} product={product} />
                ))}
            </div>
            <div className="pagination"></div>
        </>
    );
}

export default ProductList;
