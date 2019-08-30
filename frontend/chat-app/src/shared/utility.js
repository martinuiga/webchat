import _ from 'lodash';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const pushLog = (arr, elem) => {
    let newArr = [...arr];
    if (newArr.length >= 100) {
        newArr.shift();
    }
    newArr.push(elem);
    return newArr;
};


export const pushTyper = (arr, elem) => {
    let newArr = [...arr];
    let userExists = false;

    _.forEach(newArr, typer => {
        if (typer.typingId === elem.typingId) {
            typer.typing = elem.typing;
            userExists = true;
            return newArr;
        }
    });

    if (!userExists) {
        newArr.push(elem);
    }
    return newArr;
};
