import React from "react";

import { Text, Image } from "react-native-elements";

export const badgeRender = (grade, longDisplay) => {
    const aBadgeStyle = { backgroundColor: "#317D43" };
    const bBadgeStyle = { backgroundColor: "#93B536" };
    const cBadgeStyle = { backgroundColor: "#E9C40C" };
    const dBadgeStyle = { backgroundColor: "#CF7719" };
    const eBadgeStyle = { backgroundColor: "#BF3119" };
    const xBadgeStyle = { backgroundColor: "#000000" };


    switch (grade) {
        case "a":
            if (longDisplay) {
                return {
                    value: "Excellent",
                    badgeStyle: aBadgeStyle
                }
            }

            return {
                value: "A",
                badgeStyle: aBadgeStyle
            }

        case "b":
            if (longDisplay) {
                return {
                    value: "Bon",
                    badgeStyle: bBadgeStyle
                }
            }

            return {
                value: "B",
                badgeStyle: bBadgeStyle
            }

        case "c":
            if (longDisplay) {
                return {
                    value: "Passable",
                    badgeStyle: cBadgeStyle
                }
            }

            return {
                value: "C",
                badgeStyle: cBadgeStyle
            }

        case "d":
            if (longDisplay) {
                return {
                    value: "Mauvais",
                    badgeStyle: dBadgeStyle
                }
            }

            return {
                value: "D",
                badgeStyle: dBadgeStyle
            }

        case "e":
            if (longDisplay) {
                return {
                    value: "Médiocre",
                    badgeStyle: eBadgeStyle
                }
            }

            return {
                value: "E",
                badgeStyle: eBadgeStyle
            }

        default:
            if (longDisplay) {
                return {
                    value: "Inconnu",
                    badgeStyle: xBadgeStyle
                }
            }

            return {
                value: "X",
                badgeStyle: xBadgeStyle
            }

    }
}

export const NovaRender = (props) => {

    const novaAio = (novaImg, novaText) => {
        return (
            <>
                {novaImg}
                <Text style={{ textAlign: "center", width: "80%" }}>{novaText}</Text>
            </>
        );
    }

    const imgStyle = { width: 75, height: "100%" };

    switch (props.nova) {
        case 1:
            return novaAio(
                <Image source={require("../assets/images/nova-group-1.png")} resizeMode="center" style={imgStyle} />,
                "Aliments non transformés ou transformés minimalement"
            );

        case 2:
            return novaAio(
                <Image source={require("../assets/images/nova-group-2.png")} resizeMode="center" style={imgStyle} />,
                "Ingrédients culinaires transformés"
            );

        case 3:
            return novaAio(
                <Image source={require("../assets/images/nova-group-3.png")} resizeMode="center" style={imgStyle} />,
                "Aliments transformés"
            );

        case 4:
            return novaAio(
                <Image source={require("../assets/images/nova-group-4.png")} resizeMode="center" style={imgStyle} />,
                "Produits alimentaires et boissons ultra-transformés"
            );

        default:

            return novaAio(
                null,
                "Aucun groupe de rattaché"
            );
    }
}