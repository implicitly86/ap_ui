/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";
import {Link} from 'react-router-dom'
import {Menu} from "antd";
import {ArrowsAltOutlined, LogoutOutlined, ShoppingOutlined, UserOutlined} from "@ant-design/icons";

// import "./nav.css";
import {Constants} from "../../constants/common_constants";
import {history} from "../../utils/history";

/**
 * Свойства компонента {@link Navigation}.
 */
interface NavigationProps {
    index: string;
}

/**
 * Компонент, реализующий навигацию в приложении.
 *
 * @author Emil Murzakaev.
 */
export class Navigation extends React.Component<NavigationProps, any> {

    /**
     * Обработка нажатия.
     */
    private handleClick = (e) => {
        if (e.key === 'logout') {
            localStorage.removeItem(Constants.AUTH.TOKEN_NAME);
            history.push(Constants.PAGE_PATH.LOGIN.path);
        }
    };

    /**
     * Функция рендеринга компонента.
     */
    render() {
        return (
            <Menu selectedKeys={[this.props.index]} mode="horizontal" onClick={this.handleClick} className="navigation">
                <Menu.Item key={Constants.PAGE_PATH.DELIVERY_POINT.ALL.name}>
                    <Link to={Constants.PAGE_PATH.DELIVERY_POINT.ALL.path}>
                        <ArrowsAltOutlined/>
                        Пункты отправки / доставки
                    </Link>
                </Menu.Item>
                <Menu.Item key={Constants.PAGE_PATH.CUSTOMER.ALL.name}>
                    <Link to={Constants.PAGE_PATH.CUSTOMER.ALL.path}>
                        <UserOutlined/>
                        Клиенты
                    </Link>
                </Menu.Item>
                <Menu.Item key={Constants.PAGE_PATH.ORDER.ALL.name}>
                    <Link to={Constants.PAGE_PATH.ORDER.ALL.path}>
                        <ShoppingOutlined/>
                        Заказы
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout" className="last_item">
                    <LogoutOutlined/>
                    Выход
                </Menu.Item>
            </Menu>
        );
    }

}
