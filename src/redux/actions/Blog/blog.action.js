import * as actionType from '../../actionTypes';

export const createBlog = (count) => {
    console.log('in action count' , count);
    return {
        type: actionType.CREATE_BlOG,
        data: { title: 'two', description: 'Here is my second blog', counter: count }
    }
}