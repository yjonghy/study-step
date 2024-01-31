
export const numberWithSymbolFormat = (number) => {
    // { value: 1e9, symbol: 'G' }, // 10의 9제곱
    // { value: 1e12, symbol: 'T' },
    // { value: 1e15, symbol: 'P' },
    // { value: 1e18, symbol: 'E' }

    if (number < 1000) {
        return  number
    }

    const symbol = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'K' }, // 1e3 라는 것은 1 * 10^3 을 의미
        { value: 1e6, symbol: 'M' }, // 1e6 라는 것은 1 * 10^6 을 의미
    ]
    // eN = 10의 N제곱


    // (들어온 parameter number 에 맞는 심벌찾기)
    let resultIndex = 0
    for (let i = symbol.length - 1; i > 0; i--) {
        // ex)
        // 1.symbol.length =3 / i = 2
        // 2.1000 >= symbol[2].value (10의 6제곱, 1000000) -> false
        // 3.i = 1
        // 4.i > 0 true
        // 5.1000 >= symbol[1].value (10의 3제곱, 1000)
        // 6.true, break i = 1
        // 7.resultIndex = i
        if (number >= symbol[i].value) {
            resultIndex = i
            break
        }
    }


    const regex = /\.0+$|(\.[0-9]*[1-9])0+$/
    //toFixed(1) = 소수점 1자리까지 반올림
    //1000 / 1000
    //1.0 => replace
    //.replace(regex, '$1') => 뒤에 소수점 자리가 .0****0 으로 끝날경우 (현재는 .0 으로 끝날경우의 앞에 정규식만)

    const roundNumber = Math.round(number / 100) * 100
    return (roundNumber / symbol[resultIndex].value).toFixed(1).replace(regex, '$1') + symbol[resultIndex].symbol
}
