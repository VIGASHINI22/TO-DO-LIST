import React, { Component } from 'react';
import './ToDoList.css';
class ToDoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newItemName: '',
      groceryItems: [
        { name: 'Complete chapter I', id: 'item-1', completed: false },
        { name: 'Reading Books-Shakespeare', id: 'item-2', completed: false },
        { name: 'House Cleaning', id: 'item-3', completed: false }
      ],
      validationErrors: {},
      submitted: 0
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCompletedToggle = this.handleCompletedToggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.validateFields = this.validateFields.bind(this)
  }

  handleOnChange(e) {
    const target = e.target
    console.log(target)
    const name = target.name
    console.log(name)
    const value = target.value
    console.log(value)
    this.setState({
      [name]: value
    })
  }

  handleCompletedToggle(e) {
    const target = e.target
   // console.log(target.checked)
    //console.log(target)
    const itemindexValue = target.attributes.itemindex.value
    //console.log(itemindexValue)
    //console.log(typeof(itemindexValue))
    const index = parseInt(itemindexValue, 10) // access input's custom attribute
    //console.log(typeof(index))
    console.log('toggling: ' + index)

    const newGroceryItemsState = [...this.state.groceryItems]
   // console.log(newGroceryItemsState)
    newGroceryItemsState[index].completed = target.checked


    this.setState({
      groceryItems: newGroceryItemsState
    })
  }

  handleDelete(e) {
    const target = e.target
    const itemindexValue = target.attributes.itemindex.value
    //console.log(typeof(itemindexValue))
    const index = parseInt(itemindexValue, 10) // access button's custom attribute

    console.log('deleting: ' + index)

 const newGroceryItemsState = [...this.state.groceryItems]
    newGroceryItemsState.splice(index, 1)
    this.setState({
      groceryItems: newGroceryItemsState
    }) 
  }

  handleOnSubmit(e) {
    e.preventDefault()

    const isFormValid = this.validateFields()
    console.log(isFormValid)
    if (isFormValid) {
      const newGroceryItemObject = {
        completed: false,
        name: this.state.newItemName
      }
      this.setState((state) => {
        return {
          submitted: state.submitted + 1,
          groceryItems: [...state.groceryItems, newGroceryItemObject],
          newItemName: ''
        }
      })
    }
  }

  validateFields() {
    const {
      newItemName
    } = this.state

    const errors = {}

    if (!newItemName) {
      errors['newItemName'] = 'Please enter To-DO- List'
    }

    this.setState({
      validationErrors: errors
    })
   // console.log(Object.keys(errors).length === 0)
    return Object.keys(errors).length === 0
  }

  render() {
    const {
      newItemName: newItemNameError,
    } = this.state.validationErrors

    const {
      groceryItems
    } = this.state

    return (
      <>
      <section>
        <h3>TO-DO-List</h3>
        { !groceryItems.length && <p>No Lists!</p> }
        <ul>
          {
            groceryItems.map((item, index) => {
              return (
                // <li key={index}>
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={this.handleCompletedToggle}
                    itemindex={index} // lowercase 'itemindex' as per React docs
                  />
                  <span>{item.name}</span>
                  <button
                    itemindex={index}
                    onClick={this.handleDelete}
                  >
                    Delete
                  </button>
                </li>
              )
            })
          }
        </ul>
        <form onSubmit={this.handleOnSubmit}>
          <label>
            <span className="error">{newItemNameError}</span>
            <input
              type="text"
              name="newItemName"
              placeholder="Task Please"
              value={this.state.newItemName}
              onChange={this.handleOnChange}
            />
           
          </label>

          <button type="submit">Submit</button>

          <p>Submitted {this.state.submitted} times!</p>
        </form>
      </section>
      </>
    )
  }
}

export default ToDoList;