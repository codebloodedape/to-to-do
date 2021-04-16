import React from 'react'
import PropTypes from 'prop-types'
import { STATUS } from '../../Models/Enums/Status'
import './TodoItem.css'
import classnames from 'classnames'
import doneLogo from '../../img/done_new1.png'
import undoneLogo from '../../img/undone_new.png'
import removeIcon from '../../img/remove.png'

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.item
        }
    }

    clickHandler = () => {
        this.props.itemToggled(this.props.item)
    }

    valueChanged = (e) => {
        // console.log(e.target.value)
        this.props.itemChanged(this.props.item, e.target.value)
    }

    textAreaFocus = (e) => {
        e.target.parentNode.parentNode.parentNode.classList.add('itemContainerFocused')
    }

    textAreaBlur = (e) => {
        e.target.parentNode.parentNode.parentNode.classList.remove('itemContainerFocused')
    }

    removeHandler = () => {
        this.props.removeItem(this.props.item.id)
    }

    onDragStart(e) {
        // this.style.opacity = '0.4';
        // console.log(e)

        // dragSrcEl = e.target;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target);
    }

    onDragEnd(e) {
        // this.style.opacity = '1';
        // console.log(this)
        // console.log(e)
        console.log(e.dataTransfer)
    }

    onDrop(e) {
        // console.log(e.dataTransfer.getData('text/html'))
        console.log(e)
        // e.stopPropagation(); // stops the browser from redirecting.
        // return false;
    }

    render() {
        const item = this.props.item.status === STATUS.Done ? (
            <div droppable='true' draggable="true" onDropOver={this.onDrop} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onFocus={this.textAreaFocus} onBlur={this.textAreaBlur}  className='item'>
                <img draggable="false" onClick={this.clickHandler} width="30" height="30" className='icon' src={doneLogo} />
                {/* <div onClick={this.clickHandler} className={classnames('icon done')}><div className='doneInner'></div></div> */}
                <p><span  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" className={classnames('textarea', 'textareaDone')} role="textbox" contentEditable>{this.props.item.value}</span></p>
                <img draggable="false" onClick={this.removeHandler} width="30" height="30" className='icon' src={removeIcon} />
                {/* <div onClick={this.removeHandler} className='remove'>x</div> */}
                {/* <input type='text' className='textFieldDone' onChange={this.valueChanged} value={this.props.item.value}></input> */}
            </div>
        ) : <div droppable='true' draggable="true" onDropOver={this.onDrop} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onFocus={this.textAreaFocus} onBlur={this.textAreaBlur} className='item'>
                <img draggable="false" onClick={this.clickHandler} width="30" height="30" className='icon' src={undoneLogo} />
                {/* <div onClick={this.clickHandler} className={classnames('icon undone')}><div className='undoneInner'></div></div> */}
                <p><span  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" className={classnames('textarea', 'textFieldUndone')} role="textbox" contentEditable>{this.props.item.value}</span></p>
                <img draggable="false" onClick={this.removeHandler} width="30" height="30" className='icon' src={removeIcon} />
                {/* <div onClick={this.removeHandler} className='remove'>x</div> */}
                {/* <input type='text' className='textFieldUndone' onChange={this.valueChanged} value={this.props.item.value}></input> */}
            </div>
        return (
            <div className='itemContainer'>
                {item}
                {/* <input type='button' value='Select' onClick={this.clickHandler}></input> */}
                {/* {statusIcon}
                <input type='text' className='textField' onChange={this.valueChanged} value={this.props.item.value}></input> */}
            </div>
        )
    }
}

export { TodoItem }