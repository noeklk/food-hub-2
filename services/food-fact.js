export async function fetchDataByBarCode(barCode) {
    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barCode}.json`);
        const responseJson = await response.json();

        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
}

function getTwoRandomLetters() {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (var i = 0; i < 2; i++) {
        result += chars[Math.floor(Math.random() * 26)];
    }

    return result;
}

export async function fetchFiveRandomProducts() {
    var dataList = [];

    try {
        var response;
        var responseJson;
        var validCase = 0;

        // boucle infinie jusqu'à que le fetch retourne au moins 5 résultats avec en entrée 2 lettres au hasard
        // et que les 5 premiers résultat n'ai pas un product_name ou image_small_url de null
        do {
            response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${getTwoRandomLetters()}&search_simple=1&page_size=20&json=true`);
            responseJson = await response.json();

            for (let i = 0; i < 5; i++) {
                if (responseJson.products.length < 5) { break; }

                if (responseJson.products[i].product_name != null && responseJson.products[i].image_small_url != null) {
                    validCase += 1;
                } else {
                    validCase = 0;
                    break;
                }
            }

            if (validCase == 5) {
                break;
            } else {
                continue;
            }
        } while (true);

        for (let i = 0; i < 5; i++) {
            dataList.push({
                id: responseJson.products[i].id,
                product_name: responseJson.products[i].product_name,
                image_small_url: responseJson.products[i].image_small_url
            });
        }
    } catch (e) {
        console.log(e);
    }

    return dataList;
}