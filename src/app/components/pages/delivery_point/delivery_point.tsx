/*
 * ©  Implicitly86 All Rights Reserved
 */

import * as React from "react";
import {Navigation} from "../../elements/navigation";
import {Constants} from "../../../constants/common_constants";
import {DeliveryPoint as DeliveryPointDto} from "../../../models/delivery_point";
import {Col, Row, Skeleton, Table} from "antd";
import {Page} from "../../../models/page";
import {httpClient} from "../../../utils/http_client";
import {Api} from "../../../constants/api";

/**
 * Состояние компонента {@link DeliveryPoint}
 */
interface DeliveryPointState {

    deliveryPoints: Array<DeliveryPointDto>;
    showPagination: boolean;
    totalElements: number;
    elementsOnPage: number;
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
            elementsOnPage: 0,
            currentPage: 0
        };
        this.loadDeliveryPoints(0, undefined);
    }

    /**
     * Загрузка пунктов отправки / доставки.
     *
     * @param page номер страницы.
     * @param sort сортировка.
     */
    private loadDeliveryPoints(page?: number, sort?: string) {
        let parameters = {size: Constants.PAGE_SIZE, page: page, sort: sort};
        httpClient.get<Page<DeliveryPointDto>>(Api.DELIVERY_POINT.BASE(parameters))
            .then(response => {
                let result = response.data;
                this.setState({
                    deliveryPoints: result.content,
                    totalElements: result.totalElements,
                    currentPage: result.number + 1,
                    elementsOnPage: result.numberOfElements,
                    showPagination: !result.last
                });
                /*
                if (result.totalPages > 1) {
                    this.showPagination = true;
                    this.totalElements = result.totalElements;
                }
                */
            })
            .catch(error => console.error("Произошла ошибка : " + error.toString()));
    }

    /**
     * Функция рендеринга компонента.
     */
    render() {
        const columns = [
            {
                title: 'Идентификатор',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Адрес',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Почтовый индекс',
                dataIndex: 'postcode',
                key: 'postcode',
            },
            {
                title: 'Телефон',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: 'Электронная почта',
                dataIndex: 'email',
                key: 'email',
            }
        ];
        return (
            <div className="delivery-point-page">
                <Navigation index={Constants.PAGE_PATH.DELIVERY_POINT.ALL.name}/>
                <div>
                    <Row>
                        <Col span={16} offset={4}>
                            <Skeleton active title={false} paragraph={{rows: 1, width: "100%"}}/>
                            <Table
                                dataSource={this.state.deliveryPoints}
                                columns={columns}
                                pagination={{
                                    current: this.state.currentPage,
                                    pageSize: this.state.elementsOnPage,
                                    total: this.state.totalElements,
                                    onChange: page => this.loadDeliveryPoints(page - 1),
                                }}
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: event => {
                                            this.props.history.push(Constants.PAGE_PATH.DELIVERY_POINT.ALL.path + "/" + record.id);
                                        }
                                    };
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

}
