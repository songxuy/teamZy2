import React, { Component } from 'react'
import Comment from './comment'
class CommentList extends Component {
  constructor (props) {
    super(props)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
  }
  static defaultProps = {
    comments: []
  }
  handleDeleteComment (index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }
  render() {
    return (
      <div>
        {this.props.comments.map((item, index) => {
          return <Comment comment={item} key={index} index={index} onDeleteComment={this.handleDeleteComment}/>
        })}
      </div>
    )
  }
}

export default CommentList