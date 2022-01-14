const state = {
    Sign: initObject(),
    SignArr: [],
    NewX: 0,
    NewY: 0,
    SignDefineCheck: false
};

//사용되는 동작들
const mutations = {
    FORMAT_ALL_SIGN_OBJECTS(state) {
        state.SignArr = [];
    },
    FORMAT_SIGN_OBJECT(state) {
        state.SignArr = initObject();
    },
    UPDATE_SIGN_OBJECT(state, getSign) {
        let checkOverlapID = 1;
        while (
            state.SignArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
        ) {
            checkOverlapID++;
        }
        state.SignArr = state
            .SignArr
            .filter(e => e.id !== getSign.id);
        getSign.id = checkOverlapID;
        getSign = makeObject(getSign);
        state
            .SignArr
            .push(getSign);
        state.Sign = initObject();
    },
    //이벤트를 추가하는 과정.
    ADD_SIGN_OBJECT(state, getSign) {
        getSign = makeObject(state, getSign);
        state
            .SignArr
            .push(getSign);
        state.Sign = initObject();
        state.SignDefineCheck = true;
    },
    SET_SIGN_X(state, x){
        state.NewX = x;
    },
    SET_SIGN_Y(state, y){
        state.NewY = y;
    },
    FIND_AND_SETTING_X_Y_SIGN_OBJECT(state, ElementID){
        state.SignArr.find(object => object.htmlID === ElementID).x = state.NewX;
        state.SignArr.find(object => object.htmlID === ElementID).y = state.NewY;
    },
    DELETE_SIGN_OBJECT(state, getSignID) {
        state.SignArr = state
            .SignArr
            .filter(e => e.htmlID !== getSignID);
        state.Sign = initObject();
    }
};

//비동기 처리들.
const actions = {};

const makeObject = (state, Object) => {        
    let checkOverlapID = 1;
    while (
        state.SignArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
    ) {
        checkOverlapID++;
    }
    return {
        htmlID: Object.htmlID + checkOverlapID,
        id: checkOverlapID,
        title: Object.title + checkOverlapID,
        width: Object.width,
        height: Object.height,
        x: Object.x,
        y: Object.y,
        page: Object.page,
        push_or_readCheck: Object.push_or_readCheck
    }
};

//이벤트의 형태를 잡아주는 변수.
function initObject() {
    return {
        htmlID: '',
        id: '',
        title: '',
        width: '',
        height: '',
        x: '',
        y: '',
        page: '',
        push_or_readCheck: false
    }
}

export default {mutations, state, actions};