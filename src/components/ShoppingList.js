import List from "./List"
import Button from './Button'
import { useState, useEffect } from 'react'
import axios from "axios"




const ShoppingList = (props) => {

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [groceries, setGroceries] = useState(null)
    let showForm = showAddProduct

    const [grocery, setGrocery] = useState({
      item: '',
      quantity: '',
      id: ''
    })
    
    // Fetch Groceries
    useEffect(() => {
      axios.get('https://goulash-server.herokuapp.com/groceries')
      .then(res => {
        return res.data
      })
      .then(groceries => {
        setGroceries(groceries)
      })
    }, [])


    // Add Product
    const addGrocery = (g) => {
        axios.post('https://goulash-server.herokuapp.com/groceries', {
          item: grocery.item,
          quantity: grocery.quantity,
          id: groceries.length + 1
        }).then((res) => setGroceries([...groceries, res.data])) 
    }

    function handle(e) {
      const newgrocery = {...grocery}
      newgrocery[e.target.id] = e.target.value
      setGrocery(newgrocery)
    }

    const onSubmit = (e) => {
      e.preventDefault()
      if(grocery.item === '') {
        alert('Please add product')
        return
      }
      addGrocery({ grocery })
      setGrocery({
        item: '',
        quantity: '',
        id: ''
      })
      document.getElementById('item').focus();
      console.log(groceries);
    }

    //Clear List
    const clearShoppingList = () => {
    if(groceries.length === 0) {
      alert('Your Shopping List is empty');
    }
    groceries.map((grocery) => axios.delete('http://goulash-server.herokuapp.com/groceries/' + grocery.id)
    .then(setGroceries((prev) => {
      return prev.filter((gro) => gro.id != grocery.id);
    })))
    //setGroceries([]);
    }


    return (
        <div className='shopping-list'>
          
          <h2 className='flex justify-between'>
            Shopping List
              <Button title={showForm ? 'Close form' : 'Add new'} color='orange' size='sm' onClick={() => setShowAddProduct(!showAddProduct)}/> 
          </h2>

          {showAddProduct &&
          <form className='py-5' onSubmit={onSubmit}>
            <div className='flex items-between mb-3'>
              <div className='flex-grow w-8/12 pr-3'>
                <label className='block'>Product</label>
                <input type='text' id='item' className='rounded w-full ' value={grocery.item} onChange={(e) => handle(e)} />
              </div>
              <div className='flex-grow-0 w-4/12'>
                <label className='block'>Quantity</label>
                <input type='text' id='quantity' className='rounded w-full ' value={grocery.quantity} onChange={(e) => handle(e)}/>
              </div>
            </div>
            <Button type='submit' title='Add' color='green' block={true} />
          </form>}

          {groceries ? <><List listItems={groceries}/><Button title='Clear List' color='red' onClick={() => clearShoppingList()}/></> : <p>Your shopping list is empty</p>}
        </div>
    )
}

export default ShoppingList
