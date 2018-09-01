/*
 * ©  Implicitly86 All Rights Reserved
 */

import { Loading as LoadingService } from "element-ui";
import { ElLoadingComponent } from "element-ui/types/loading";

/**
 * Компонент, отвечающий за показ иконки загрузки.
 *
 * @author Emil Murzakaev.
 */
export class Loading {

    /**
     * Статичный экземпляр ElLoadingComponent.
     */
    private static loading: ElLoadingComponent | undefined = undefined;

    /**
     * Показать иконку загрузки.
     */
    public static show(): void {
        this.loading = LoadingService.service({
            lock: true,
            text: 'Загрузка',
            fullscreen: true
        });
    }

    /**
     * Скрыть иконку загрузки.
     */
    public static close(): void {
        if (this.loading != undefined) {
            this.loading.close();
        }
    }

}
