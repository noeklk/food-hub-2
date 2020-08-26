
export const MAX_PRODUCT_RESULT = 13;

export async function fetchDataByBarCode(barCode) {
    try {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barCode}.json`);
        const responseJson = await response.json();

        if (responseJson.status == 0) {
            return { status: 0, message: "Produit invalide ou n'existe pas" }
        }

        const { product } = responseJson;

        const data = {
            id: product.id,
            status: responseJson.status,
            code: responseJson.code,
            product_name: product.product_name,
            image_small_url: product.image_small_url,
            grade: product.nutrition_grade_fr
        }

        return data;
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
    const dataList = [];

    let products;
    let validCase = 0;

    try {
        // boucle infinie jusqu'à que le fetch retourne au moins 5 résultats avec en entrée 2 lettres au hasard
        // et que les 5 premiers résultat n'ai pas un product_name ou image_small_url de null
        // ps: ce fetch nous retourne obligatoirement 20 résultats
        do {
            let response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${getTwoRandomLetters()}&search_simple=1&page_size=20&json=true`);
            let responseJson = await response.json();

            for (let i = 0; i < MAX_PRODUCT_RESULT; i++) {
                if (responseJson.products.length < MAX_PRODUCT_RESULT) { break; }

                if (responseJson.products[i].product_name != null && responseJson.products[i].image_small_url != null) {
                    validCase += 1;
                } else {
                    validCase = 0;
                    break;
                }
            }

            if (validCase == MAX_PRODUCT_RESULT) {
                products = responseJson.products;
                break;
            }
        } while (true);
    } catch (e) {
        console.log(e);
    }

    for (let i = 0; i < MAX_PRODUCT_RESULT; i++) {
        dataList.push({
            id: products[i].id,
            code: products[i].code,
            product_name: products[i].product_name,
            image_small_url: products[i].image_small_url,
            grade: products[i].nutrition_grade_fr
        });
    }

    return dataList;
}