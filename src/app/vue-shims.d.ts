declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module "vue-flexboxgrid" {
    const VueFlexboxgrid = require('vue-flexboxgrid');
    export default VueFlexboxgrid;
}

declare module "vue-awesome/components/Icon" {
    const Icon = require('vue-awesome/components/Icon');
    export default Icon;
}

declare module "vue-mouse-parallax" {
    const VueMouseParallax = require('vue-mouse-parallax');
    export default VueMouseParallax;
}
