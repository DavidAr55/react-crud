import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { show_alert } from '../functions'

const ShowProducts = () => {
    const url = 'http://localhost:777'
    const [products, setProducts] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [operation, setOperation] = useState(1)
    const [title, setTitle] = useState('')

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async() => {
        const response = await axios.get(url)
        setProducts(response.data)
    }

    const openModal = (option, id = '', name = '', description = '', price = '') => {
        setId(id)
        setName(name)
        setDescription(description)
        setPrice(price)
    
        const title = option === 1 ? 'Register product' : 'Edit product'
        setTitle(title)
        setOperation(option)

        window.setTimeout(function() {
            document.getElementById('name').focus()
        }, 500)
    }
    
    const validate = () => {
        const trimmedName = name.trim();
        const trimmedDescription = description.trim();
        const trimmedPrice = price.trim();
    
        if (!trimmedName) {
            show_alert('Enter the product name', 'warning');
            return;
        }
    
        if (!trimmedDescription) {
            show_alert('Enter the product description', 'warning');
            return;
        }
    
        if (!trimmedPrice) {
            show_alert('Enter the product price', 'warning');
            return;
        }
    
        const parameters = {
            name: trimmedName,
            description: trimmedDescription,
            price: trimmedPrice,
            ...(operation !== 1 && { id })
        };
    
        const method = operation === 1 ? 'POST' : 'PUT';
        sendRequest(method, parameters);
    }    

    const sendRequest = async(method, parameters) => {
        await axios({method: method, url: url, data: parameters})
        .then(function(request) {
            let type = request.data[0]
            let message = request.data[1]
            show_alert(message, type)
            if(type === 'success') {
                document.getElementById('btn-close').click();
                getProducts();
            }
        })
        .catch(function(error) {
            show_alert('Request error', 'error')
            console.error(error)
        })
    }

    const deleteProduct = (id, name) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure you want to delete ' + name + ' from the products table?',
            icon: 'question',
            text: 'You will not be able to recover the product data if you delete the product.',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel'
        })
        .then((result) => {
            if(result.isConfirmed) {
                setId(id);
                sendRequest('DELETE', {id: id})
            } else [
                show_alert('The product has not been removed', 'info')
            ]
        }); 
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {products.map((product, i) => (
                                        <tr key={product.id}>
                                            <td>{(i + 1)}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>${new Intl.NumberFormat('en-EU').format(product.price)} <span className='h6 '>usd</span></td>
                                            <td>
                                                <button onClick={()=>openModal(2, product.id, product.name, product.description, product.price)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                                    <i className='fa-solid fa-edit'></i>
                                                </button>
                                                &nbsp;
                                                <button onClick={()=>deleteProduct(product.id, product.name)} className='btn btn-danger'>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={()=>openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                <i className='fa-solid fa-circle-plus'></i> Add a product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id='modalProducts' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id'/>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='name' className='form-control' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='text' id='description' className='form-control' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                                <input type='text' id='price' className='form-control' placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={()=>validate()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i>
                                </button>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' id='btn-close' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowProducts
