/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";
import {Navigation} from "../../elements/navigation";
import {Constants} from "../../../constants/common_constants";
import {Customer as CustomerDto} from "../../../models/customer";

/**
 * Состояние компонента {@link Customer}
 */
interface CustomerState {

    customers: Array<CustomerDto>;
    showPagination: boolean;
    totalElements: number;
    currentPage: number;

}

/**
 * Компонент, реализующий страницу пунктов отправки / доставки.
 *
 * @author Emil Murzakaev.
 */
export class Customer extends React.Component<any, CustomerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            customers: [],
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
            <div className="customer-page">
                <Navigation index={Constants.PAGE_PATH.CUSTOMER.ALL.name}/>
            </div>
        );
    }

}
