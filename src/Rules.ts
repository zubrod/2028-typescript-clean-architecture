export default class Rules {


    apply(a: number, b: number) {
        const newValue = this.calculateNewValue(a, b)
        return newValue
    }

    calculateNewValue(a: number, b: number) {
        if (a === b) {
            return a + b
        } else {
            return 0
        }
    }



}