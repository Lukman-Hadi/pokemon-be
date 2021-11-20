const isPrime = () => {
    let num = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

const fifteenPobaility = () => {
    let rand = Math.random()
    return rand < 0.5 ? true : false
}

const fibonacci=(num)=>{
    let before = 0;
    let actual = 0;
    let next = 1;
    for (let i = 0; i < num; i++) {
        before = actual + next;
		actual = next
		next = before
    }
    return actual;
}

module.exports = { isPrime,fifteenPobaility,fibonacci }