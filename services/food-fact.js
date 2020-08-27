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
            image_url: product.image_url,
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
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
}

export const MAX_PRODUCT_RESULT = 10;

export async function fetchFiveRandomProducts(pageSize = MAX_PRODUCT_RESULT) {
    const dataList = [];

    let products;
    let validCase = 0;

    try {
        // boucle infinie jusqu'à que le fetch retourne au moins MAX_PRODUCT_RESULT résultats avec en entrée 2 lettres au hasard
        // et que les MAX_PRODUCT_RESULT premiers résultat n'ai pas un product_name ou image_small_url de null
        // ps: ce fetch nous retourne obligatoirement au moins MAX_PRODUCT_RESULT
        do {
            let response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${getTwoRandomLetters()}&search_simple=1&page_size=${pageSize}&json=true`);
            let responseJson = await response.json();

            for (let i = 0; i < MAX_PRODUCT_RESULT; i++) {
                if (responseJson.products.length < MAX_PRODUCT_RESULT) { break; }

                if (responseJson.products[i].product_name == null || responseJson.products[i].image_url == null ||
                    responseJson.products[i].product_name == undefined || responseJson.products[i].image_url == undefined ||
                    responseJson.products[i].product_name === "" || responseJson.products[i].image_url === "" ||
                    !responseJson.products[i].countries.includes("France")) {

                    validCase = 0;
                    break;
                } else {
                    validCase += 1;
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
            image_url: products[i].image_url,
            grade: products[i].nutrition_grade_fr
        });
    }

    return dataList;
}