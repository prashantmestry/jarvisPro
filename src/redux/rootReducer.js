import { combineReducers } from "redux";
import blogsReducers from './reducers/Blog/blog.reducer';

const rootReducer = combineReducers({
    blogs: blogsReducers
});

export default rootReducer;
