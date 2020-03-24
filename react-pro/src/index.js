import React from 'react'
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CommentApp from './containers/CommentApp'
import commentsReducer from './reducers/comments'
import './index.css'

const store = createStore(commentsReducer)
console.log(store)
ReactDOM.render(
  /* (
    <div className='comment-input'>
    <div className='comment-field'>
      <span className='comment-field-name'>用户名：</span>
      <div className='comment-field-input'>
        <input type="text"/>
      </div>
    </div>
    <div className='comment-field'>
      <span className='comment-field-name'>评论内容：</span>
      <div className='comment-field-input'>
        <textarea type="text"/>
      </div>
    </div>
    <div className='comment-field-button'>
      <button>
        发布
      </button>
    </div>
  </div>
  ) */
  <Provider store={store}>
  <CommentApp />
</Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
