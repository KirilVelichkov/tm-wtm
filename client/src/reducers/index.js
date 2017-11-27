import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import imagesReducer from './imagesReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    images: imagesReducer,
    admin: adminReducer
});

export default rootReducer;
