export function saveItemData(data) {
	return dispatch => {
        return dispatch({ type: 'SAVE_PRODUCT_DATA',
                          payload : data });
     };
}

export function storeCartData(data) {
	return dispatch => {
        return dispatch({ type: 'STORE_CART_DATA',
                          payload : data });
         };
    }


    export function storeAddress(data) {
        return dispatch => {
            return dispatch({ type: 'STORE_ADDRESS_REDUCER',
                              payload : data });
             };
        }
