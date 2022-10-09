



const myPromiseTwo = () => {

    return new Promise()
}


const myPromise = () => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hai')
        }, 3000);

        // reject('error')
    })
}



// myPromise().then((value) => { console.log('value', value) })

(async function () {

    try {
        value = await myPromise();
    } catch (error) {
        console.log(error)
    }

    // console.log(value)

})();

console.log('test')     
