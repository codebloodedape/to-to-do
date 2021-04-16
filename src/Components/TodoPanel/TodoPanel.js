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
            list: this.props.list ?? []
        }
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

    addItem = () => {
        this.state.list.addItem('')
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
        })
    }

    addItemHandler = (e) => {
        // console.log(e.target.nextElementSibling.children[0].innerText)
        this.state.list.addItem(e.target.nextElementSibling.children[0].innerText)
        this.setState({
            list: this.state.list
        })
        // e.target.parentNode.children.filter(child => {
        //     if (child) {
        //         console.log(child)
        //     }
        // })
    }

    onTextChange = (e) => {
        console.log(e)
    }

    clearText = (e) => {
        e.target.previousElementSibling.children[0].innerText = ''
    }

    // onTitleChange = (e) => {
    //     this.state.list.updateTitle(e.target.value)
    //     this.setState({
    //         list: this.state.list
    //     })
    // }

    closeHandler =(e) => {
        // console.log(this.state.list)
        // console.log(e)
        const title = e.target.previousElementSibling.innerText
        this.state.list.updateTitle(title)
        this.setState({
            list: this.state.list
        }, () => {
            this.props.closePanel(this.state.list)
        })
        
    }

    addTextFocus = (e) => {
        // console.log(e.target.parentNode.parentNode.classList.add('itemContainerFocused'))
        e.target.parentNode.parentNode.parentNode.classList.add('itemContainerFocused')
    }

    addTextBlur = (e) => {
        e.target.parentNode.parentNode.parentNode.classList.remove('itemContainerFocused')
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
                    <div onFocus={this.textAreaFocus} onBlur={this.textAreaBlur} className='item'>
                    <img onClick={this.addItemHandler} width="30" height="30" className='icon' src={addIcon} />
                        <p><span onFocus={this.addTextFocus} onBlur={this.addTextBlur} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" className={classnames('textarea', 'textareaUndone')}
                            role="textbox" contentEditable></span></p>
                        <img draggable="false" onClick={this.clearText} width="30" height="30" className='icon' src={removeIcon} />
                    </div>
                </div>
                <div className='itemsContainer'>{items}</div>
                <br />
            </div>
        )
    }
}

export default TodoPanel