/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";
import {Navigation} from "../../elements/navigation";
import {Constants} from "../../../constants/common_constants";
import {Order as OrderDto} from "../../../models/order";

/**
 * Состояние компонента {@link Order}
 */
interface OrderState {

    orders: Array<OrderDto>;
    showPagination: boolean;
    totalElements: number;
    currentPage: number;

}

/**
 * Компонент, реализующий страницу пунктов отправки / доставки.
 *
 * @author Emil Murzakaev.
 */
export class Order extends React.Component<any, OrderState> {

    constructor(props: any) {
        super(props);
        this.state = {
            orders: [],
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
            <div className="order-page">
                <Navigation index={Constants.PAGE_PATH.ORDER.ALL.name}/>
            </div>
        );
    }

}
