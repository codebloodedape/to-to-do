import React from 'react'
import { STATUS } from '../../Models/Enums/Status'
import { TodoItem } from './TodoItem'
import './TodoPanel.css'
import addIcon from '../../img/plus.png'
import removeIcon from '../../img/remove.png'
import closeIcon from '../../img/minus.png'
import classnames from 'classnames'

class TodoPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: this.props.list ?? [],
            addingItem: false
        }
    }

    componentDidMount() {
        this.addTodoItemField.focus()
        this.registerShortcuts()
    }

    registerShortcuts = () => {
        window.addEventListener("keydown", event => {
            // if (event.isComposing || event.keyCode === 229) {
            //     return;
            // }
            switch(event.keyCode) {
                case 13: 
                if (this.state.addingItem) {
                    console.log(event)
                    event.stopPropagation()
                    this.state.list.addItem(event.target.value)
                    this.setState({
                        list: this.state.list
                    }, () => {
                        this.addTodoItemField.value = ''
                        this.addTodoItemField.focus()
                    })
                }
                break;
                case 27:
                    const list = { ...this.state.list }
                    const title = this.state.list.title
                    list.updateTitle(title)
                    this.setState({
                        list
                    }, () => {
                        this.props.closePanel(this.state.list)
                    })
            }
            // do something
        });
    }

    itemToggled = (item) => {
        item.toggle()
        this.setState({
            list: this.state.list
        })
    }

    itemChanged = (item, value) => {
        item.change(value)
        this.setState({
            list: this.state.list
        })
    }

    titleFocus = (e) => {
        console.log(e)
        e.target.classList.add('titleFocused')
    }

    titleBlur = (e) => {
        // e.target.parentNode.parentNode.parentNode.classList.remove('itemContainerFocused')
        e.target.classList.remove('titleFocused')
    }

    removeItem = (id) => {
        this.state.list.removeItem(id)
        this.setState({
            list: this.state.list
        }, () => {
            this.addTodoItemField.focus()
        })
    }

    addItemHandler = (e) => {
        // console.log(e.target.nextElementSibling.children[0].innerText)
        this.state.list.addItem(e.target.nextElementSibling.value)
        this.setState({
            list: this.state.list
        }, () => {
            this.addTodoItemField.innerText = ''
            this.addTodoItemField.focus()
        })
    }

    onTextChange = (e) => {
        console.log(e)
    }

    clearText = (e) => {
        e.target.previousElementSibling.children[0].innerText = ''
        this.addTodoItemField.focus()
    }

    // onTitleChange = (e) => {
    //     this.state.list.updateTitle(e.target.value)
    //     this.setState({
    //         list: this.state.list
    //     })
    // }

    closeHandler = (e) => {
        // console.log(this.state.list)
        // console.log(e)
        const list = {...this.state.list}
        const title = e.target.previousElementSibling.innerText
        list.updateTitle(title)
        this.setState({
            list
        }, () => {
            this.props.closePanel(this.state.list)
        })
        
    }

    addTextFocus = (e) => {
        // console.log(e.target.parentNode.parentNode.classList.add('itemContainerFocused'))
        e.target.parentNode.parentNode.parentNode.classList.add('itemContainerFocused')
        this.setState({
            addingItem: true
        })
    }

    addTextBlur = (e) => {
        e.target.parentNode.parentNode.parentNode.classList.remove('itemContainerFocused')
        this.setState({
            addingItem: false
        })
    }

    titleChanged = (e) => {
        const list = {...this.state.list}
        console.log(e.target.value)
        list.title = e.target.value
        this.setState({
            list
        })
    }

    render() {
        // console.log(this.state.list.items)
        let doneItems = [], undoneItems = [], items = []
        if (this.state.list.items.length > 0) {
            this.state.list.items.map(item => {
                items.push(<TodoItem itemToggled={this.itemToggled} itemChanged={this.itemChanged} removeItem={this.removeItem} item={item}></TodoItem>)
                // if (item.status === STATUS.Done) {
                //     doneItems.push(<TodoItem itemToggled={this.itemToggled} itemChanged={this.itemChanged} item={item}></TodoItem>)
                // }
                // else if (item.status === STATUS.Undone) {
                //     undoneItems.push(<TodoItem itemToggled={this.itemToggled} itemChanged={this.itemChanged} item={item}></TodoItem>)
                // }
            })
        }

        return (
            <div className='panelContainer'>
                <br />
                <br />
                <div className='panelHeader'>
                    {/* <span onFocus={this.titleFocus} onBlur={this.titleBlur} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                        className={classnames('textarea title')} role="textbox" contentEditable >{this.state.list.title}</span> */}
                    <input type='text' placeholder='Title' onFocus={this.titleFocus} onBlur={this.titleBlur} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                        className={classnames('title')} onChange={this.titleChanged} value={this.state.list.title}></input>
                    <img onClick={this.closeHandler} width="30" height="30" className={classnames('icon', 'close')} src={closeIcon} />
                </div>
                <br />
                {/* <input type='button' value='Add Item' onClick={this.addItem}></input> */}
                <div className='itemContainer'>
                    {/* <div onFocus={this.textAreaFocus} onBlur={this.textAreaBlur} className='item'> */}
                        <img onClick={this.addItemHandler} width="30" height="30" className='icon' src={addIcon} />
                        
                        <input type='text' placeholder='Start typing...' onFocus={this.addTextFocus} onBlur={this.addTextBlur} autocomplete="off" autocorrect="off" 
                        autocapitalize="off" ref={(input) => { this.addTodoItemField = input; }} spellcheck="false" className='addItemTextField' />
                        
                        {/* <p><span onFocus={this.addTextFocus} onBlur={this.addTextBlur} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" 
                        className={classnames('textarea', 'textareaUndone')}
                            role="textbox" contentEditable ref={(input) => { this.addTodoItemField = input; }} ></span></p> */}
                        
                        <img draggable="false" onClick={this.clearText} width="30" height="30" className='icon' src={removeIcon} />
                    {/* </div> */}
                </div>
                <div className='itemsContainer'>{items}</div>
                <br />
            </div>
        )
    }
}

export default TodoPanel