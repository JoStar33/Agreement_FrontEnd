const state = {
    LongText: initObject(),
    LongTextArr: [],
    NewX: 0,
    NewY: 0
};

//사용되는 동작들
const mutations = {
    FORMAT_ALL_LONGTEXT_OBJECTS(state) {
        state.LongTextArr = [];
    },
    FORMAT_SHORTTEXT_OBJECT(state) {
        state.ShortText = initObject();
    },
    UPDATE_LONGTEXT_OBJECT(state, getLongText) {
        let checkOverlapID = 1;
        while (
            state.LongTextArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
        ) {
            checkOverlapID++;
        }
        state.LongTextArr = state
            .LongTextArr
            .filter(e => e.id !== getLongText.id);
        getLongText.id = checkOverlapID;
        getLongText = makeObject(getLongText);
        state
            .LongTextArr
            .push(getLongText);
        state.LongText = initObject();
    },

    //이벤트를 추가하는 과정.
    ADD_LONGTEXT_OBJECT(state, getLongText) {
        getLongText = makeObject(state, getLongText);
        state
            .LongTextArr
            .push(getLongText);
        state.LongText = initObject();
    },
    SET_LONGTEXT_X(state, x){
        state.NewX = x;
    },
    SET_LONGTEXT_Y(state, y){
        state.NewY = y;
    },
    FIND_AND_SETTING_X_Y_LONGTEXT_OBJECT(state, ElementID){
        state.LongTextArr.find(object => object.htmlID === ElementID).x = state.NewX;
        state.LongTextArr.find(object => object.htmlID === ElementID).y = state.NewY;
    },
    DELETE_LONGTEXT_OBJECT(state, getLongTextID) {
        state.LongTextArr = state
            .LongTextArr
            .filter(e => e.htmlID !== getLongTextID);
        state.LongText = initObject();
    }
};

//비동기 처리들.
const actions = {};

const makeObject = (state, Object) => {        
    let checkOverlapID = 1;
    if(state.LongTextArr.length !== 0){
    while (
        state.LongTextArr.map(e => e.id).includes(parseInt(checkOverlapID)) === true
    ) {
        checkOverlapID++;
    }
}
    return {
        htmlID: Object.htmlID,
        id: checkOverlapID,
        title: Object.title,
        width: Object.width,
        height: Object.height,
        x: Object.x,
        y: Object.y
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
        y: ''
    }
}

export default {mutations, state, actions};