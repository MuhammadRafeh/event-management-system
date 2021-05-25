import { combineReducers } from "redux";
import transformIntoItems from "../barriers/transformIntoItems";
import transformIntoPackage from "../barriers/transformIntoPackages";
import transformIntoPendingInvoices from "../barriers/transformIntoPendingInvoices";
import Item from "../models/item";
import Package from "../models/package";
import PendingInvoices from "../models/pendingInvoices";
import {
    AUTHENTICATE,
    DELETEPENDINGINVOICE,
    LOGOUT,
    SETITEMS,
    SETPENDINGINVOICES,
    UPDATEBIRTHDAY,
    UPDATECORPORATE,
    ADDPENDINGINVOICE,
    UPDATEWEDDING,
    UPDATEPENDINGINVOICE,
    SETWEDDINGITEMS,
    SETBIRTHDAYITEMS,
    SETCORPORATEITEMS,
    DELETEPACKAGE,
    ADDPACKAGE,
    DELETEITEM,
    ADDITEM
} from "./actions";

const initialAuthState = {
    uid: '',
    email: 'Rafeh@gmail.com',
    isAdmin: true,
    isAuth: false
}

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                // ...state,
                uid: action.payload.uid,
                email: action.payload.email,
                isAdmin: action.payload.isAdmin,
                isAuth: action.payload.isAuth,
            }
        case LOGOUT:
            return {
                // ...state,
                uid: action.payload.uid,
                email: action.payload.email,
                isAdmin: action.payload.isAdmin,
                isAuth: action.payload.isAuth,
            }
        default:
            return state;
    }
}

const initialPackageState = {
    wedding: [],
    birthday: [],
    corporate: []
}

const packageReducer = (state = initialPackageState, action) => {
    switch (action.type) {
        case UPDATEBIRTHDAY:
            return {
                ...state,
                birthday: transformIntoPackage(action.payload)
            }
        case UPDATECORPORATE:
            return {
                ...state,
                corporate: transformIntoPackage(action.payload)
            }
        case UPDATEWEDDING:
            return {
                ...state,
                wedding: transformIntoPackage(action.payload)
            }
        case DELETEPACKAGE:
            return {
                ...state,
                [action.payload.type]: state[action.payload.type].filter(item => item.id != action.payload.id)
            }
        case ADDPACKAGE:
            // const { package } = action.payload;
            return {
                ...state,
                [action.payload.type]: [...state[action.payload.type],
                new Package(
                    action.payload.package.id,
                    action.payload.package.name,
                    action.payload.package.price,
                    action.payload.package.theme,
                    action.payload.package.menu,
                    action.payload.package.venu,
                    action.payload.package.occuredDate,
                    action.payload.package.noOfPeople,
                )]
            }
        default:
            return state;
    }
}

const initialInvoiceState = {
    pendingInvoices: []
}

const invoiceReducer = (state = initialInvoiceState, action) => {
    const { payload } = action;
    switch (action.type) {
        case ADDPENDINGINVOICE:
            return {
                pendingInvoices: [
                    ...state.pendingInvoices,
                    new PendingInvoices(
                        payload.id,
                        payload.price,
                        payload.theme,
                        payload.menu,
                        payload.venu,
                        payload.eventName,
                        payload.isPackage,
                        payload.serPackName,
                        payload.serPackId,
                        payload.userEmail,
                        payload.bookDate,
                        payload.occuredDate,
                        payload.designerName,
                        payload.noOfPeople,
                        payload.status
                    )
                ]
            }
        case SETPENDINGINVOICES:
            return {
                pendingInvoices: transformIntoPendingInvoices(payload)
            }
        case DELETEPENDINGINVOICE:
            return {
                pendingInvoices: state.pendingInvoices.filter(item => item.id != payload)
            }
        case UPDATEPENDINGINVOICE:
            return {
                pendingInvoices: state.pendingInvoices.map(item => {
                    if (item.id == payload.id) {
                        return (
                            new PendingInvoices(
                                item.id,
                                item.price,
                                item.theme,
                                item.menu,
                                item.venu,
                                item.eventName,
                                item.isPackage,
                                item.serPackName,
                                item.serPackId,
                                item.userEmail,
                                item.bookDate,
                                item.occuredDate,
                                item.designerName,
                                item.noOfPeople,
                                payload.update.status
                            )
                        )
                        // item['status'] = payload.update.status
                        // return item;
                    } return item;
                })
            }
        default:
            return state;
    }
}

const initialItemState = {
    weddingItems: [],
    birthdayItems: [],
    corporateItems: []
}

const itemReducer = (state = initialItemState, action) => {
    switch (action.type) {
        case SETITEMS:
            return {
                weddingItems: transformIntoItems(action.payload.wed),
                birthdayItems: transformIntoItems(action.payload.birth),
                corporateItems: transformIntoItems(action.payload.corp)
            }
        case SETWEDDINGITEMS:
            return {
                ...state,
                weddingItems: transformIntoItems(action.payload)
            }
        case SETBIRTHDAYITEMS:
            return {
                ...state,
                birthdayItems: transformIntoItems(action.payload)
            }
        case SETCORPORATEITEMS:
            return {
                ...state,
                corporateItems: transformIntoItems(action.payload)
            }
        case DELETEITEM:
            return {
                ...state,
                [action.payload.type]: state[action.payload.type].map(obj => {
                    const itemsArray = obj[action.payload.itemType];
                    if (itemsArray) { // this is what we are searching
                        const modifiedItems = itemsArray.filter(item => item.id != action.payload.id)//[{id, name, price},...]
                        //final return
                        return {
                            [action.payload.itemType]: modifiedItems
                        }
                    } return obj;
                })
            }
        case ADDITEM:
            return {
                ...state,
                [action.payload.type]: state[action.payload.type].map(obj => {
                    const itemsArray = obj[action.payload.itemType];
                    if (itemsArray) { // this is what we are searching
                        // const modifiedItems = itemsArray.filter(item => item.id != action.payload.id)//[{id, name, price},...]
                        //final return
                        return {
                            [action.payload.itemType]: [...itemsArray, new Item(action.payload.item.id, action.payload.item.name, action.payload.item.price)]
                        }
                    } return obj;
                })
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    auth: authReducer,
    packages: packageReducer,
    invoices: invoiceReducer,
    items: itemReducer
})

export default rootReducer
