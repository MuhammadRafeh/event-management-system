export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const UPDATEWEDDING = 'UPDATEWEDDING';
export const UPDATEBIRTHDAY = 'UPDATEBIRTHDAY';
export const UPDATECORPORATE = 'UPDATECORPORATE';

export const authenticate = (uid, email, isAdmin, isAuth) => { // It will take credentials
    return {
        type: AUTHENTICATE,
        payload: {
            uid,
            email,
            isAdmin,
            isAuth
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
        payload: {
            uid: '',
            email: '',
            isAdmin: true,
            isAuth: true
        }
    }
}

export const updateWedding = (objRes) => { //in objRes key is a firebase key and value is a package
    return {
        type: UPDATEWEDDING,
        payload: objRes
    }
}

export const updateBirthday = (objRes) => { //in objRes key is a firebase key and value is a package
    return {
        type: UPDATEBIRTHDAY,
        payload: objRes
    }
}

export const updateCorporate = (objRes) => { //in objRes key is a firebase key and value is a package
    return {
        type: UPDATECORPORATE,
        payload: objRes
    }
}