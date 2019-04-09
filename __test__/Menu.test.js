
import {_addThings} from "../screens/MenuScreen"

// will pass
test('testyTest', () => {
    expect(true).toBeTruthy();
})
console.log(_addThings(1,2))
// will pass
test('test add', () => {
    expect(_addThings(1,2)).toBe(3);
})

