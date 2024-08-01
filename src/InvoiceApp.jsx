import { getInvoice, calculateTotal } from "./services/getInvoice"
import { ClientView  } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { useEffect, useState } from "react";
import { FormItemsView } from "./components/FormItemsView";


const invoiceInitial = { //ACA ES DONDE PONEMOS LA ESTRUCTURA DE NUESTRO OBJETO PARA UTILIZARLO
    id: 0,
    name: '',
    client: {
        name: '',
        lastName: '',
        address: {
            country: '',
            city: '',
            street: '',
            number: 0
        },
    },
    company: {
        name: '',
        fiscalNumber: 0,
    },
    items: []
}


export const InvoiceApp = () => {

////
    const [activeForm, setActiveForm] = useState(false);
    
    const [total, setTotal] = useState(0);

    const [counter, setCounter] = useState(4);

    const [invoice, setInvoice] = useState(invoiceInitial); //CREAMOS LAS VARIABLES/OBJETOS QUE VAMOS A UTILIZAR

    const [items, setItems] = useState([]);

    const { id, name, client, company } = invoice; 
////

////
    useEffect(() => {
        const data = getInvoice();
        setInvoice(data)
        setItems(data.items);
    }, [])                      
                                    //LOS USEFFECT SE DISPARAN CADA VEZ QUE SE MANIPULE EL DATO QUE ESTA ENTRRE CORCHETES
    useEffect(() => {
        setTotal(calculateTotal(items));
    }, [items])
////

////
    const handlerAddInvoiceItems = ({product, price, quantity}) => {

        setItems([...items,{
            id: counter,
            product: product.trim(),
            price: +price.trim(),
            quantity: parseInt(quantity.trim(), 10)
        }]);

        setCounter(counter+1);
    }
                                                        //ESTOS SERIAN DONDE CREAS LOS PROCESOS.
                                                        //PROCESOS PARA MANIPULAR COSAS DE LA VISTA O DATOS.
    const handlerDeleteInvoiceItem = ({ id }) => {         

        setItems(items.filter(item => item.id !== id))

    }


    const onActiveForm = () => {
        setActiveForm(!activeForm);
    }
////


    return (
        <>
            <div className="container">
                <div className="card my-3">

                    <div className="card-header">
                        ejemplo factura
                    </div>

                    <div className="card-body">
                        <InvoiceView id={id} name={name}/>

                        <div className="row my-3">
                            <div className="col">
                                <ClientView title="Datos del cliente" client={client} /> {/* le estoy pasando mi client al componente hijo ClientView*/}
                            </div>                                                       {/* , donde tambien le estoy indicando que se llamara client */}

                            <div className="col">
                                <CompanyView title="Datos de la empresa" company={company}/>
                            </div>
                        </div>
                                        {/* handlerDeleteItem, le estoy pasando un proceso(el de eliminar) y ademas le estoy pasando el id */}
                        <ListItemsView title="Producto de la factura" items={items} handlerDeleteItem={id=>handlerDeleteInvoiceItem(id)}/>
                        <TotalView total={total}/>
                        <button className="btn btn-secondary"
                            onClick={onActiveForm}>{!activeForm ? 'Agregar item' : 'Ocultar Form'}</button> 
                        {!activeForm || <FormItemsView handler={handlerAddInvoiceItems} />}{/*{!activeForm ? 'Agregar item' : 'Ocultar Form'}:
                                                                                            Usa una expresión condicional (operador ternario) para cambiar el texto del botón en función del valor de activeForm.
                                                                                            Si activeForm es false, el texto del botón será "Agregar item".
                                                                                            Si activeForm es true, el texto del botón será "Ocultar Form".*/}
                        
                    </div>
                </div>
            </div>
        </>
    )
}