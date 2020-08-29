import axios from "axios";

export const MAX_PRODUCT_RESULT = 10;

const propertyExists = (input) => {
    if (input == null || input == undefined || input === "") return false;

    return true;
}

const productIsFromFrance = (input) => {
    return input.includes("France") ? true : false;
}

const getPreferredProductName = (product_name, product_name_fr) => {
    return propertyExists(product_name_fr) ? product_name_fr : propertyExists(product_name) ? product_name : "Pas de nom fourni pour ce produit";
}

export async function fetchDataByBarCode(barCode) {
    try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barCode}.json`, { timeout: 4000 });
        const { data } = response;

        if (data.status == 0) {
            return { status: 0, message: "Produit invalide ou n'existe pas" }
        }

        const { product } = data;

        const arrangedData = {
            id: product.id,
            status: data.status,
            code: data.code,
            product_name: getPreferredProductName(product.product_name, product.product_name_fr),
            image_nutrition_url: product.image_nutrition_url,
            image_url: product.image_url,
            grade: product.nutrition_grade_fr,
            nova: product.nova_group
        }

        return arrangedData;
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

export async function fetchFiveRandomProducts(pageSize = MAX_PRODUCT_RESULT) {
    const dataList = [];

    let validProducts;
    let validCase = 0;

    try {
        // boucle infinie jusqu'à que le fetch retourne au moins MAX_PRODUCT_RESULT résultats avec en entrée 2 lettres au hasard
        // et que les MAX_PRODUCT_RESULT premiers résultat n'ai pas un product_name ou image_small_url de null
        // ps: ce fetch nous retourne obligatoirement au moins MAX_PRODUCT_RESULT
        do {
            const response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${getTwoRandomLetters()}&search_simple=1&page_size=${pageSize}&json=true`, { timeout: 4000 });
            const { products } = response.data;

            for (let i = 0; i < MAX_PRODUCT_RESULT; i++) {
                if (products.length < MAX_PRODUCT_RESULT) { break; }

                if (!propertyExists(products[i].product_name_fr) ||
                    !propertyExists(products[i].image_url) ||
                    !propertyExists(products[i].nova_group) ||
                    !propertyExists(products[i].image_nutrition_url) ||
                    !productIsFromFrance(products[i].countries)) {

                    validCase = 0;
                    break;
                } else {
                    validCase += 1;
                }
            }

            if (validCase == MAX_PRODUCT_RESULT) {
                validProducts = products;
                break;
            }
        } while (true);
    } catch (e) {
        console.log(e);
    }

    for (let i = 0; i < MAX_PRODUCT_RESULT; i++) {
        dataList.push({
            id: validProducts[i].id,
            code: validProducts[i].code,
            product_name: validProducts[i].product_name_fr,
            image_url: validProducts[i].image_url,
            image_nutrition_url: validProducts[i].image_nutrition_url,
            grade: validProducts[i].nutrition_grade_fr,
            nova: validProducts[i].nova_group
        });
    }

    return dataList;
}