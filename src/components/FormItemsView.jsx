import { useState } from "react";

export const FormItemsView = ({handler}) => {

    const [invoiceItemsState, setinvoiceItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });

    const { product, price, quantity } = invoiceItemsState;


    const onInputChange = ({ target: { name, value } }) => {
        console.log(target.value);
        setinvoiceItemsState({
            ...invoiceItemsState,
            [name]: value
        });
    };

    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();

        if (product.trim().length <= 1) {
            alert('Tiene que ser mayor a 0')
            return
        };;
        if (price.trim().length <= 1) {
            alert('Tiene que ser mayor a 0')
            return
        };;
        if (isNaN(price.trim())) {
            alert('Este campo requiere un numero')
            return
        };;
        if (quantity.trim().length < 1) {
            alert('Este campo es obligatorio')
            return
        };
        if (isNaN(quantity.trim())) {
            alert('Este campo requiere un numero')
            return
        };;

        handler(invoiceItemsState);

        setinvoiceItemsState({
            product: '',
            price: '',
            quantity: '',
        });
    }

    return(
        <>
            <form className="w-50" onSubmit={onInvoiceItemsSubmit}>
                <input
                    type="text"
                    name="product"
                    value={product}
                    placeholder="Producto"
                    className="form-control m-3" onChange={onInputChange} />
                <input
                    type="text"
                    name="price"
                    value={price}
                    placeholder="Precio"
                    className="form-control m-3" onChange={onInputChange} />
                <input
                    type="text"
                    name="quantity"
                    value={quantity}
                    placeholder="Cantidad"
                    className="form-control m-3" onChange={onInputChange} />

                <button
                    type="submit"
                    className="btn btn-primary m-3">Crear</button>
            </form>
        </>
    )
}