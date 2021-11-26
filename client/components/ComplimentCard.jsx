import React, { Component } from 'react';
import filledstar from '../assets/fav-star.png';
import emptystar from '../assets/empty_star.png';


class ComplimentCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          editMode: false
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleClick = this.handleClick.bind(this)
    }

  // Handle edit 
  handleEdit() {
    this.setState({ editMode: true })
  }

  handleSubmit() {
    const newCategory = document.getElementById('tag').value;
    // send user, id 
    const { user_id, id } = this.props;
    this.props.updateCompliment(user_id, id, newCategory);
    this.setState({ editMode: false });
  }

  // handleClick() {

  // }


  render() {
    const { user_id, id, message, sender, tag, date, deleteCompliment, tagsList, updateFavorite } = this.props;
    const options = [];
  
    for (const currTag of tagsList) {
      if (currTag === tag) {
        options.push(<option value={currTag} key={currTag}>{currTag}</option>)
      } else {
        options.push(<option value={currTag} key={currTag}>{currTag}</option>)
      }
    }
    return (
        <div className='card-container'>
          <div className='secondary-text margin-top-sm'>
            Date: {date.slice(0,10)}
            <button className='favorites-button' onClick = {() => updateFavorite(this.props.id)}><img id = 'star' src = {filledstar}/></button>
          </div>
       
          <div className='primary-text margin-top-sm'>Message: {message}</div>
          <div className='primary-text margin-top-sm'>From: {sender}</div>

            {!this.state.editMode ? <div className='margin-top-sm secondary-text'>Category: {tag}</div> : 
            <form className='margin-top-sm'>
              <select id='tag' name='tag' className='edit-select' defaultValue='Webpack'>
                {options}
              </select>
            </form>
            }

            {!this.state.editMode ? <button className='margin-top-sm primary-button' onClick={this.handleEdit}>Change Category</button> : 
              <button className='margin-top-sm primary-button' onClick={() => this.handleSubmit()}>Submit</button>
            }

            <button className='margin-top-sm secondary-button margin-left-sm' onClick={() => deleteCompliment(user_id, id)}>Delete Compliment</button>

        </div>
    )
  }
}

export default ComplimentCard;

