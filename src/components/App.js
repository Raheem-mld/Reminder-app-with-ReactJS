import React, {Component} from 'react'
import { connect } from 'react-redux'
import {add_Reminder, remove_Reminder, clear_Reminder} from '../actions'
import moment from 'moment'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import logo from '../images/note.png'

class App extends Component {

    state = {
        text: '',
        date: new Date(),
    }

    render_Reminders = () => {
        const {reminders} = this.props;
        return (
            <ul className='list-group'>
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className ='list-group-item'>
                                <div>{reminder.text}</div>
                                <div>{moment( new Date(reminder.date)).fromNow()}</div>
                                <div className='closeIcon btn btn-danger' onClick={() => this.props.remove_Reminder(reminder.id)}>X</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render(){
         return (
            <div className='App'>
                <img src={logo} />
                <div className='reminder-title'>
                    <h2>What Should U Do ?</h2>
                </div>

                <input 
                type="text" 
                className='form-control' 
                placeholder='Enter What U Think ...'
                value={this.state.text}
                onChange={(e) => this.setState({text : e.target.value})}
                />

                <DatePicker
                className='form-control'
                value={this.state.date}
                placeholderText='Enter Date'
                selected={this.state.date}
                onChange={(date) =>{ this.setState({date : date})}}
                showTimeSelect
                timeFormat="HH:mm"
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                />

                <button 
                className='btn btn-primary btn-block form-control'
                onClick={() => {this.props.add_Reminder(this.state.text, this.state.date)
                this.setState({text : '', date:''})
                }} >
                Add Reminder </button>

                {this.render_Reminders()}

                <button 
                className='btn btn-danger btn-block form-control'
                onClick={() => this.props.clear_Reminder()}
                >Clear Reminder </button>
            </div>
        )
    }
 
}

export default connect(state => {
    return {
        reminders : state
    }
}, {
    add_Reminder,
    remove_Reminder,
    clear_Reminder
})(App);
