/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";
import {Navigation} from "../../elements/navigation";
import {Constants} from "../../../constants/common_constants";

/**
 * Состояние компонента {@link DeliveryPoint}
 */
interface DeliveryPointState {

    deliveryPoints: Array<DeliveryPoint>;
    showPagination: boolean;
    totalElements: number;
    currentPage: number;

}

/**
 * Компонент, реализующий страницу пунктов отправки / доставки.
 *
 * @author Emil Murzakaev.
 */
export class DeliveryPoint extends React.Component<any, DeliveryPointState> {

    constructor(props: any) {
        super(props);
        this.state = {
            deliveryPoints: [],
            showPagination: false,
            totalElements: 0,
            currentPage: 0
        }
    }

    /**
     * Функция рендеринга компонента.
     */
    render() {
        return (
            <div className="delivery-point-page">
                <Navigation index={Constants.PAGE_PATH.DELIVERY_POINT.ALL.name}/>
            </div>
        );
    }

}
