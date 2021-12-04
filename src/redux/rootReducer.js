import { combineReducers } from "redux";
import blogsReducers from './reducers/blog.reducer';
import userReducers from './reducers/user.reducer';
import portfolioReducers from './reducers/portfolio.reducer';
import companyReducers from './reducers/company.reducer';
import daafReducers from './reducers/daaf.reducer';

const rootReducer = combineReducers({
    blogs: blogsReducers,
    users: userReducers,
    portfolio: portfolioReducers,
    company: companyReducers,
    daaf: daafReducers
});

export default rootReducer;