/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";
import {Route, Router} from 'react-router-dom'

import {history} from '../utils/history';
import {Constants} from "../constants/common_constants";
import {Login} from "./pages/login/login";
import {DeliveryPoint} from "./pages/delivery_point/delivery_point";
import {Customer} from "./pages/customer/customer";
import {Order} from "./pages/order/order";

/**
 * Компонент приложения.
 *
 * @author Emil Murzakaev.
 */
export class App extends React.Component<any, any> {

    /**
     * Функция рендеринга компонента.
     */
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path={Constants.PAGE_PATH.BASE.path} component={DeliveryPoint}/>
                    <Route path={Constants.PAGE_PATH.LOGIN.path} component={Login}/>
                    <Route path={Constants.PAGE_PATH.DELIVERY_POINT.ALL.path} component={DeliveryPoint}/>
                    <Route path={Constants.PAGE_PATH.CUSTOMER.ALL.path} component={Customer}/>
                    <Route path={Constants.PAGE_PATH.ORDER.ALL.path} component={Order}/>
                </div>
            </Router>
        );
    }

}
