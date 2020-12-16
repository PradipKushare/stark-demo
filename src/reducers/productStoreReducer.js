const initialState = {
    productList: [],
    storedCartData:[],
    storeAddress:[]
};


export default (state = initialState, {type, payload}) => {
    switch (type) {
        
        case 'SAVE_PRODUCT_DATA':
            return {
                ...state,
                productList: payload
            };

            case 'STORE_CART_DATA':
                return {
                    ...state,
                    storedCartData: payload
                };

                case 'STORE_ADDRESS_REDUCER':
                    return {
                        ...state,
                        storeAddress: payload
                    };

        default:
            return state
    }
}