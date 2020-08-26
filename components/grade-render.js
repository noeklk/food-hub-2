import React from "react";
import { View } from 'react-native';
import { Icon } from "react-native-elements";

export function GradeRender(props) {

    GradeRender.defaultProps = {
        size: 14
    }

    const { grade } = props;
    const { size } = props;

    const ViewWithIcon = (color) => {
        return (
            <View>
                <Icon name="circle" size={size} color={color} type="font-awesome" />
            </View >
        )
    }

    switch (grade) {
        case "a":
            return (
                ViewWithIcon("#317D43")
            )

        case "b":
            return (
                ViewWithIcon("#93B536")
            )

        case "c":
            return (
                ViewWithIcon("#E9C40C")
            )

        case "d":
            return (
                ViewWithIcon("#CF7719")
            )

        case "e":
            return (
                ViewWithIcon("#BF3119")
            )

        default:
            return (
                ViewWithIcon("purple")
            )
    }
}

export default GradeRender;