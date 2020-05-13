import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
/**
 * 解决tslint的错误提示：Type '{ ref: string; class: string; title: string; onClick: () => void; }' is not assignable to type 'ThisTypedComponentOptionsWithArrayProps<Vue, object, object, object, never>'.
      Property 'ref' does not exist on type 'ThisTypedComponentOptionsWithArrayProps<Vue, object, object, object, never>'.
 */
declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    [propName: string]: any;
    ref?: string;
  }
}