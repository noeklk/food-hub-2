import React from "react";

import { Text, Image } from "react-native-elements";

export const badgeRender = (grade, display) => {
    switch (grade) {
        case "a":
            return {
                value: "A",
                badgeStyle: { backgroundColor: "#317D43" }
            }

        case "b":
            return {
                value: "B",
                badgeStyle: { backgroundColor: "#93B536" }
            }

        case "c":
            return {
                value: "C",
                badgeStyle: { backgroundColor: "#E9C40C" }
            }

        case "d":
            return {
                value: "D",
                badgeStyle: { backgroundColor: "#CF7719" }
            }

        case "e":
            return {
                value: "E",
                badgeStyle: { backgroundColor: "#BF3119" }
            }

        default:
            if (display === "long") {
                return {
                    value: "Pas de nutriscore",
                    badgeStyle: { backgroundColor: "#000000" }
                }
            }

            return {
                value: "X",
                badgeStyle: { backgroundColor: "#000000" }
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